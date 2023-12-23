import * as crypto from "crypto";
import * as argon2 from "argon2";
import { ALGORITHM, SECRET } from "@/constants/crypto.constants";
import Encrypted from "./Encrypted";

const generateSecureHash = (password: string) => {
  return argon2.hash(password);
};

const encrypt = (s: string, secret = SECRET) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, secret, iv);
  const encrypted = Buffer.concat([cipher.update(s), cipher.final()]);

  return new Encrypted({
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  });
};

const decrypt = (
  { iv, content }: { iv: string; content: string },
  secret = SECRET
) => {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
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

export { generateSecureHash, verify, encrypt, decrypt };
