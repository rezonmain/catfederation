import * as crypto from "crypto";
import {
  EMAIL_2FA_CHALLENGE_BYTES,
  EMAIL_2FA_TOKEN_EXPIRATION_MINUTES,
} from "@/constants/email2FA.constants";
import { getExpirationISODate } from "@/helpers/time.helpers";

const getEmail2FAExpirationISODate = (): string => {
  return getExpirationISODate({
    minutes: EMAIL_2FA_TOKEN_EXPIRATION_MINUTES,
  });
};

const generateEmail2FAChallengeToken = () => {
  return crypto.randomBytes(EMAIL_2FA_CHALLENGE_BYTES).toString("hex");
};

export { getEmail2FAExpirationISODate, generateEmail2FAChallengeToken };
