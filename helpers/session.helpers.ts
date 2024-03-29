import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import {
  SESSION_FGP_COOKIE_NAME,
  SESSION_JWT_ALGORITHM,
  SESSION_JWT_COOKIE_NAME,
  SESSION_JWT_EXPIRES_IN,
  SESSION_JWT_ISSUER,
  SESSION_JWT_SECRET,
} from "@/constants/session.constants";
import { Session } from "@/types/session.types";
import { generateHash } from "@/helpers/crypto.helpers";
import { User } from "@/db/schema";
import { nil } from "@/helpers/utils.helpers";
import { ROUTE_LOGIN } from "@/constants/route.constants";

const generateSessionUserFingerprint = (): string =>
  crypto.randomBytes(25).toString("hex");

const verifyJWT = ({
  jwt: _jwt,
  fgp,
}: Session): Pick<User, "id" | "username"> => {
  const hashedFingerprint = generateHash(fgp);
  const decoded = jwt.verify(_jwt, SESSION_JWT_SECRET, {
    issuer: SESSION_JWT_ISSUER,
    algorithms: [SESSION_JWT_ALGORITHM],
  });
  if (typeof decoded !== "object") {
    throw new Error("JWT has no body");
  }
  if (decoded.fgp !== hashedFingerprint) {
    throw new Error("JWT fingerprint doesn't match");
  }
  return { id: decoded.uid, username: decoded.unm };
};

const generateSession = (
  userId: User["id"],
  username: User["username"],
): Session => {
  const fgp = generateSessionUserFingerprint();
  const hashedFgp = generateHash(fgp);

  const _jwt = jwt.sign(
    {
      uid: userId,
      unm: username,
      fgp: hashedFgp,
    },
    SESSION_JWT_SECRET,
    {
      expiresIn: SESSION_JWT_EXPIRES_IN,
      issuer: SESSION_JWT_ISSUER,
      algorithm: SESSION_JWT_ALGORITHM,
    },
  );

  return {
    fgp,
    jwt: _jwt,
  };
};

const generateNewSessionCookies = (user: Pick<User, "id" | "username">) => {
  const { jwt: jwtValue, fgp: fgpValue } = generateSession(
    user.id,
    user.username,
  );

  const jwt = {
    name: SESSION_JWT_COOKIE_NAME,
    value: jwtValue,
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
    },
  };

  const fgp = {
    name: SESSION_FGP_COOKIE_NAME,
    value: fgpValue,
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
    },
  };

  return { jwt, fgp };
};

const generateEmptySessionCookies = () => {
  const jwt = {
    name: SESSION_JWT_COOKIE_NAME,
    value: "",
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      maxAge: 0,
    },
  };

  const fgp = {
    name: SESSION_FGP_COOKIE_NAME,
    value: "",
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      maxAge: 0,
    },
  };

  return { jwt, fgp };
};

const getSessionCookies = () => {
  const jwt = cookies().get(SESSION_JWT_COOKIE_NAME);
  const fgp = cookies().get(SESSION_FGP_COOKIE_NAME);
  if (nil(jwt) || nil(fgp)) {
    throw new Error("No session cookies");
  }
  return { jwt, fgp };
};

const validSession = () => {
  try {
    const { jwt, fgp } = getSessionCookies();
    const userId = verifyJWT({ jwt: jwt.value, fgp: fgp.value });
    if (nil(userId)) {
      throw new Error("Invalid token");
    }
    return true;
  } catch (error) {
    return false;
  }
};

const auth = () => {
  try {
    const { jwt, fgp } = getSessionCookies();
    const user = verifyJWT({ jwt: jwt.value, fgp: fgp.value });
    if (nil(user.id)) {
      throw new Error("Invalid token");
    }
    return user;
  } catch (error) {
    console.error(error);
    redirect(ROUTE_LOGIN);
  }
};
const deleteSessionCookies = () => {
  const { jwt, fgp } = generateEmptySessionCookies();
  cookies().set(jwt.name, jwt.value, jwt.options);
  cookies().set(fgp.name, fgp.value, fgp.options);
};

const setNewSessionCookies = (params: Pick<User, "id" | "username">) => {
  const { jwt, fgp } = generateNewSessionCookies(params);
  cookies().set(jwt.name, jwt.value, jwt.options);
  cookies().set(fgp.name, fgp.value, fgp.options);
};

export {
  auth,
  deleteSessionCookies,
  setNewSessionCookies,
  generateNewSessionCookies,
  validSession,
};
