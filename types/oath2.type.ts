import { OAUTH2_AUTHORIZE_SCHEMA } from "@/constants/oauth2.constants";
import { type z } from "zod";

type OAuth2AuthorizeParams = z.infer<typeof OAUTH2_AUTHORIZE_SCHEMA>;
type OAuth2RedirectSearchParams = {
  applicationId: string;
  redirectParams: string;
};

export type { OAuth2AuthorizeParams, OAuth2RedirectSearchParams };
