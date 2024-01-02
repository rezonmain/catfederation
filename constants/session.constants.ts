import { validateEnvironmentVariable } from "@/helpers/env.helpers";

const SESSION_JWT_SECRET = validateEnvironmentVariable("JWT_SECRET");
const SESSION_JWT_ISSUER = validateEnvironmentVariable("JWT_ISSUER");
const SESSION_JWT_EXPIRES_IN = "3d";
const SESSION_JWT_COOKIE_NAME = "__Secure-jwt";
const SESSION_FGP_COOKIE_NAME = "__Secure-fgp";

export {
  SESSION_JWT_SECRET,
  SESSION_JWT_ISSUER,
  SESSION_JWT_EXPIRES_IN,
  SESSION_JWT_COOKIE_NAME,
  SESSION_FGP_COOKIE_NAME,
};
