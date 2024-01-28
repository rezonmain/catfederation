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
import {
  OAuth2AuthorizeParams,
  OAuth2RedirectSearchParams,
} from "@/types/oath2.type";
import { params } from "./route.helpers";

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

const encodeOAuth2LoginRedirectParams = (
  params: Omit<OAuth2AuthorizeParams, "state">,
) => {
  const responseType = encodeURIComponent(params.responseType);
  const redirectUri = encodeURIComponent(params.redirectUri);
  const scope = encodeURIComponent(params.scope);
  const applicationId = encodeURIComponent(params.applicationId);
  return encodeURIComponent(
    `responseType=${responseType}&redirectUri=${redirectUri}&scope=${scope}&applicationId=${applicationId}`,
  );
};

const getOAuth2LoginRedirectURL = (params: OAuth2AuthorizeParams) => {
  const searchParams: OAuth2RedirectSearchParams = {
    applicationId: params.applicationId,
    redirectParams: encodeOAuth2LoginRedirectParams(params),
  };
  return `${ROUTE_LOGIN}?applicationId=${searchParams.applicationId}&redirectParams=${searchParams.redirectParams}`;
};

const getLoginOAuth2RedirectURL = (
  searchParams: OAuth2RedirectSearchParams,
) => {
  return `${ROUTE_OAUTH2_AUTHORIZE}?${params(searchParams.redirectParams)}`;
};

export {
  getAuthorizationUrl,
  getOAuth2LoginRedirectURL,
  getLoginOAuth2RedirectURL,
};
