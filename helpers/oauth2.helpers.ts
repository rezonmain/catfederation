import { APP_DOMAIN } from "@/constants/app.constants";
import {
  OAUTH2_SUPPORTED_RESPONSE_TYPES,
  OAUTH2_SUPPORTED_SCOPES,
} from "@/constants/oauth2.constants";
import { Application, ApplicationRedirect } from "@/db/schema";

const getAuthorizationUrl = (
  applicationId: Application["id"],
  redirects: ApplicationRedirect[],
) => {
  applicationId = encodeURIComponent(applicationId);
  const redirectUri = encodeURIComponent(redirects[0].uri);
  const responseType = encodeURIComponent(OAUTH2_SUPPORTED_RESPONSE_TYPES.CODE);
  const scope = encodeURIComponent(OAUTH2_SUPPORTED_SCOPES.IDENTIFY);
  return `${APP_DOMAIN}/oauth2/authorize?responseType=${responseType}&applicationId=${applicationId}&redirectUri=${redirectUri}&scope=${scope}`;
};

export { getAuthorizationUrl };
