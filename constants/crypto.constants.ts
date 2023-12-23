import { validateEnvironmentVariable } from "@/helpers/env.helpers";

const CRYPTO_ALGORITHM = "aes-256-ctr";
const CRYPTO_HASH_ALGORITHM = "sha256";
const CRYPTO_SECRET = validateEnvironmentVariable("CRYPTO_SECRET");

export { CRYPTO_ALGORITHM, CRYPTO_SECRET, CRYPTO_HASH_ALGORITHM };
