import { cookies } from "next/headers";
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
import {
  createSessionRevocation,
  getSessionRevocations,
} from "@/repositories/sessionRevocation.respository";
import { empty, nil } from "@/helpers/utils.helpers";

const generateSessionUserFingerprint = (): string =>
  crypto.randomBytes(25).toString("hex");

const verifyJWT = ({ jwt: _jwt, fgp }: Session): string => {
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
  return decoded.uid;
};

const generateSession = (userId: User["id"]): Session => {
  const fgp = generateSessionUserFingerprint();
  const hashedFgp = generateHash(fgp);

  const _jwt = jwt.sign(
    {
      uid: userId,
      fgp: hashedFgp,
    },
    SESSION_JWT_SECRET,
    {
      expiresIn: SESSION_JWT_EXPIRES_IN,
      issuer: SESSION_JWT_ISSUER,
      algorithm: SESSION_JWT_ALGORITHM,
    }
  );

  return {
    fgp,
    jwt: _jwt,
  };
};

const revokeJWT = ({ jwt }: { jwt: Session["jwt"] }): void => {
  const jwtHash = generateHash(jwt);
  createSessionRevocation({ jwtHash });
};

const isJWTRevoked = async ({
  jwt,
}: {
  jwt: Session["jwt"];
}): Promise<boolean> => {
  const jwtHash = generateHash(jwt);
  const revocations = await getSessionRevocations({ jwtHash });
  return !empty(revocations);
};

const generateNewSessionCookies = ({ userId }: { userId: User["id"] }) => {
  const { jwt: jwtValue, fgp: fgpValue } = generateSession(userId);
  const jwt = {
    name: SESSION_JWT_COOKIE_NAME,
    value: jwtValue,
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    },
  };

  const fgp = {
    name: SESSION_FGP_COOKIE_NAME,
    value: fgpValue,
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      maxAge: 1000 * 60 * 60 * 24 * 3,
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

const auth = () => {
  try {
    const { jwt, fgp } = getSessionCookies();

    isJWTRevoked({ jwt: jwt.value }).then((isRevoked) => {
      if (isRevoked) {
        throw new Error("JWT revoked");
      }
    });

    const userId = verifyJWT({ jwt: jwt.value, fgp: fgp.value });
    return { userId };
  } catch (error) {
    console.error(error);
    return { userId: null };
  }
};

const revokeSession = () => {
  try {
    const { jwt } = getSessionCookies();
    revokeJWT({ jwt: jwt.value });
  } catch (error) {
    console.error(error);
  }
};

const deleteSessionCookies = () => {
  cookies().delete(SESSION_JWT_COOKIE_NAME);
  cookies().delete(SESSION_FGP_COOKIE_NAME);
};

const setNewSessionCookies = (params: { userId: User["id"] }) => {
  const { jwt, fgp } = generateNewSessionCookies(params);
  cookies().set(jwt.name, jwt.value, jwt.options);
  cookies().set(fgp.name, fgp.value, fgp.options);
};

export {
  auth,
  revokeSession,
  deleteSessionCookies,
  setNewSessionCookies,
  generateNewSessionCookies,
};
