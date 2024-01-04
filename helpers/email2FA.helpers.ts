import * as crypto from "crypto";
import {
  EMAIL_2FA_CHALLENGE_BYTES,
  EMAIL_2FA_TOKEN_EXPIRATION_MINUTES,
} from "@/constants/email2FA.constants";
import { getExpirationISODate } from "@/helpers/time.helpers";
import { APP_DOMAIN } from "@/constants/app.constants";
import { ROUTE_SIGNUP_CONFIRM } from "@/constants/route.constants";
import { type SignupConfirmSearchParams } from "@/app/signup/confirm/page";

const getEmail2FAExpirationISODate = (): string => {
  return getExpirationISODate({
    minutes: EMAIL_2FA_TOKEN_EXPIRATION_MINUTES,
  });
};

const generateEmail2FAChallengeToken = () => {
  return crypto.randomBytes(EMAIL_2FA_CHALLENGE_BYTES).toString("hex");
};

const generateEmail2FAUrl = (params: SignupConfirmSearchParams) => {
  const url = new URL(`${APP_DOMAIN}${ROUTE_SIGNUP_CONFIRM}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
};

export {
  generateEmail2FAUrl,
  getEmail2FAExpirationISODate,
  generateEmail2FAChallengeToken,
};
