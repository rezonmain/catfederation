import { validateEnvironmentVariable } from "@/helpers/env.helpers";

const SESSION_JWT_SECRET = validateEnvironmentVariable("JWT_SECRET");
const SESSION_JWT_ISSUER = validateEnvironmentVariable("JWT_ISSUER");
const SESSION_JWT_EXPIRES_IN = "3d";

export { SESSION_JWT_SECRET, SESSION_JWT_ISSUER, SESSION_JWT_EXPIRES_IN };
