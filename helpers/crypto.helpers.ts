import * as crypto from "crypto";
import * as argon2 from "argon2";
import { init } from "@paralleldrive/cuid2";
import {
  CRYPTO_SECRET,
  CRYPTO_ALGORITHM,
  CRYPTO_HASH_ALGORITHM,
  CRYPTO_USER_ID_LENGTH,
  CRYPTO_ACCOUNT_CREATION_CHALLENGE_BYTES,
} from "@/constants/crypto.constants";
import Encrypted from "@/helpers/Encrypted";

const generateSecureHash = (password: string) => {
  return argon2.hash(password);
};

const generateCred = (email: string) => {
  return generateHash(CRYPTO_SECRET + email);
};

const generateHash = (s: string) => {
  return crypto.createHash(CRYPTO_HASH_ALGORITHM).update(s).digest("hex");
};

const generateUserId = () => {
  return init({
    length: CRYPTO_USER_ID_LENGTH,
  })();
};

const generateAccountCreationChallengeToken = () => {
  return crypto
    .randomBytes(CRYPTO_ACCOUNT_CREATION_CHALLENGE_BYTES)
    .toString("hex");
};

const encrypt = (s: string, secret = CRYPTO_SECRET) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, secret, iv);
  const encrypted = Buffer.concat([cipher.update(s), cipher.final()]);

  return new Encrypted({
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  });
};

const decrypt = (
  { iv, content }: { iv: string; content: string },
  secret = CRYPTO_ALGORITHM
) => {
  const decipher = crypto.createDecipheriv(
    CRYPTO_ALGORITHM,
    secret,
    Buffer.from(iv, "hex")
  );

  const plain = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);

  return plain.toString();
};

const verify = async (hash: string, password: string) => {
  try {
    return argon2.verify(hash, password);
  } catch {
    return false;
  }
};

export {
  generateSecureHash,
  verify,
  encrypt,
  decrypt,
  generateHash,
  generateCred,
  generateUserId,
  generateAccountCreationChallengeToken,
};
