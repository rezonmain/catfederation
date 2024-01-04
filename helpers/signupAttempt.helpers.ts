import * as crypto from "crypto";
import {
  SIGNUP_ATTEMPT_CHALLENGE_BYTES,
  SIGNUP_ATTEMPT_TOKEN_EXPIRATION_MINUTES,
} from "@/constants/signupAttempt.constants";
import { getExpirationISODate } from "@/helpers/time.helpers";
import { APP_DOMAIN } from "@/constants/app.constants";
import { ROUTE_SIGNUP_CONFIRM } from "@/constants/route.constants";
import { type SignupConfirmSearchParams } from "@/app/signup/confirm/page";

const getSignupAttemptExpirationISODate = (): string => {
  return getExpirationISODate({
    minutes: SIGNUP_ATTEMPT_TOKEN_EXPIRATION_MINUTES,
  });
};

const generateSignupAttemptChallengeToken = () => {
  return crypto.randomBytes(SIGNUP_ATTEMPT_CHALLENGE_BYTES).toString("hex");
};

const generateSignupAttemptUrl = (params: SignupConfirmSearchParams) => {
  const url = new URL(`${APP_DOMAIN}${ROUTE_SIGNUP_CONFIRM}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
};

export {
  generateSignupAttemptUrl,
  getSignupAttemptExpirationISODate,
  generateSignupAttemptChallengeToken,
};
