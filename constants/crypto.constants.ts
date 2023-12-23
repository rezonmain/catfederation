const envSecret = (() => {
  console.count("running envSecret");
  const secret = process.env.CRED_SECRET;
  if (!secret)
    throw new Error("CRED_SECRET missing from environment variables");
  return secret;
})();

const ALGORITHM = "aes-256-ctr";
const SECRET = envSecret;

export { ALGORITHM, SECRET };
