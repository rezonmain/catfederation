import { CRYPTO_SECRET } from "@/constants/crypto.constants";
import { decrypt } from "@/helpers/crypto.helpers";

class Encrypted {
  private plain?: string = undefined;
  private secret = CRYPTO_SECRET;
  iv: string;
  content: string;

  constructor(input: string | { iv: string; content: string }) {
    if (typeof input === "string") {
      const encrypted = Encrypted.parseEncryptedString(input);
      this.iv = encrypted.iv;
      this.content = encrypted.content;
      return;
    }
    this.iv = input.iv;
    this.content = input.content;
  }

  decrypt(secret = this.secret) {
    if (this.plain) return this.plain;
    const plain = decrypt({ iv: this.iv, content: this.content }, secret);
    this.plain = plain;
    return plain;
  }

  toString() {
    return `${this.iv}:${this.content}`;
  }

  static parseEncryptedString(encrypted: string): Encrypted {
    const [iv, content] = encrypted.split(":");
    return new Encrypted({ iv, content });
  }
}

export default Encrypted;
