import { type OAuth2AuthorizeParams } from "@/types/oath2.type";
import { CODES_CODE_EXPIRATION_MINUTES } from "@/constants/codes.constants";
import { getExpirationISODate } from "@/helpers/time.helpers";
import { encrypt } from "@/helpers/crypto.helpers";

const getCodeExpirationISODate = (): string => {
  return getExpirationISODate({
    minutes: CODES_CODE_EXPIRATION_MINUTES,
  });
};

const generateAuthorizationCode = (params: OAuth2AuthorizeParams): string => {
  const { applicationId, redirectUri } = params;
  return encrypt(`${applicationId}${redirectUri}`).toString();
};

export { getCodeExpirationISODate, generateAuthorizationCode };
