import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import {
  SESSION_FGP_COOKIE_NAME,
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
import { empty } from "./utils.helpers";

const generateSessionUserFingerprint = (): string =>
  crypto.randomBytes(25).toString("hex");

const verifyJWT = ({ jwt: _jwt, fgp }: Session): boolean => {
  const hashedFingerprint = generateHash(fgp);
  try {
    const decoded = jwt.verify(_jwt, SESSION_JWT_SECRET, {
      issuer: SESSION_JWT_ISSUER,
    });
    if (typeof decoded !== "object") {
      throw new Error("JWT has no body");
    }
    if (decoded.fgp !== hashedFingerprint) {
      throw new Error("JWT fingerprint doesn't match");
    }
    return true;
  } catch (error) {
    console.error(`➡️ [session][verifyJWT()] ${JSON.stringify(error)})`);
    return false;
  }
};

const decodeJWT = (_jwt: Session["jwt"]): { cuid: string } | null => {
  try {
    const decoded = jwt.verify(_jwt, SESSION_JWT_SECRET, {
      issuer: SESSION_JWT_ISSUER,
    });
    if (typeof decoded !== "object") throw "JWT has no body";
    return decoded as { cuid: string };
  } catch (error) {
    console.error(`➡️ [🔒Auth][decodeJWT()] ${JSON.stringify(error)})`);
    return null;
  }
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
    }
  );

  return {
    fgp,
    jwt: _jwt,
  };
};

const revokeSession = ({ jwt }: { jwt: Session["jwt"] }): void => {
  const jwtHash = generateHash(jwt);
  createSessionRevocation({ jwtHash });
};

const isSessionRevoked = ({ jwt }: { jwt: Session["jwt"] }): boolean => {
  const jwtHash = generateHash(jwt);
  const revocations = getSessionRevocations({ jwtHash });
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

export {
  verifyJWT,
  decodeJWT,
  revokeSession,
  isSessionRevoked,
  generateNewSessionCookies,
};
