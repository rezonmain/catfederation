import { validateEnvironmentVariable } from "@/helpers/env.helpers";

const CRYPTO_FIELDS_LENGTH = 256;
const CRYPTO_HASH_ALGORITHM = "sha256";
const CRYPTO_ALGORITHM = "aes-256-ctr";
const CRYPTO_SECRET = validateEnvironmentVariable("CRYPTO_SECRET");

export {
  CRYPTO_SECRET,
  CRYPTO_ALGORITHM,
  CRYPTO_FIELDS_LENGTH,
  CRYPTO_HASH_ALGORITHM,
};
