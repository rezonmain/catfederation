import { APP_DOMAIN } from "@/constants/app.constants";
import {
  OAUTH2_SUPPORTED_RESPONSE_TYPES,
  OAUTH2_SUPPORTED_SCOPES,
} from "@/constants/oauth2.constants";
import {
  ROUTE_LOGIN,
  ROUTE_OAUTH2_AUTHORIZE,
} from "@/constants/route.constants";
import { Application, ApplicationRedirect } from "@/db/schema";
import { OAuth2AuthorizeParams } from "@/types/oath2.type";
import { pwq } from "@/helpers/route.helpers";

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

const getOAuth2LoginRedirectURL = (oAuth2Params: OAuth2AuthorizeParams) => {
  return pwq(ROUTE_LOGIN, {
    redirectTo: pwq(ROUTE_OAUTH2_AUTHORIZE, oAuth2Params),
  });
};

export { getAuthorizationUrl, getOAuth2LoginRedirectURL };
