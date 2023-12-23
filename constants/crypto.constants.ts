const CRYPTO_ALGORITHM = "aes-256-ctr";
const CRYPTO_SECRET = validateEnvironmentVariable("CRYPTO_SECRET");

export { CRYPTO_ALGORITHM, CRYPTO_SECRET };
