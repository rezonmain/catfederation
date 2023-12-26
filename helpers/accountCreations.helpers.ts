import * as crypto from "crypto";
import {
  ACCOUNT_CREATIONS_CHALLENGE_BYTES,
  ACCOUNT_CREATIONS_TOKEN_EXPIRATION_MINUTES,
} from "@/constants/accountCreations.constants";
import { getExpirationISODate } from "@/helpers/time.helpers";

const getAccountCreationExpirationISODate = (): string => {
  return getExpirationISODate({
    minutes: ACCOUNT_CREATIONS_TOKEN_EXPIRATION_MINUTES,
  });
};

const generateAccountCreationChallengeToken = () => {
  return crypto.randomBytes(ACCOUNT_CREATIONS_CHALLENGE_BYTES).toString("hex");
};

export {
  getAccountCreationExpirationISODate,
  generateAccountCreationChallengeToken,
};
