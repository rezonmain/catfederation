import * as crypto from "crypto";
import {
  ACCOUNT_CREATIONS_CHALLENGE_BYTES,
  ACCOUNT_CREATIONS_TOKEN_EXPIRATION_MINUTES,
} from "@/constants/accountCreations.constants";
import { getExpirationISODate } from "@/helpers/time.helpers";
import { AccountCreationUrlParams } from "@/types/auth.types";
import { APP_DOMAIN } from "@/constants/app.constants";
import { ROUTE_AUTH_NEW } from "@/constants/route.constants";

const getAccountCreationExpirationISODate = (): string => {
  return getExpirationISODate({
    minutes: ACCOUNT_CREATIONS_TOKEN_EXPIRATION_MINUTES,
  });
};

const generateAccountCreationChallengeToken = () => {
  return crypto.randomBytes(ACCOUNT_CREATIONS_CHALLENGE_BYTES).toString("hex");
};

const generateAccountCreationUrl = (params: AccountCreationUrlParams) => {
  const url = new URL(`${APP_DOMAIN}${ROUTE_AUTH_NEW}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
};

export {
  generateAccountCreationUrl,
  getAccountCreationExpirationISODate,
  generateAccountCreationChallengeToken,
};
