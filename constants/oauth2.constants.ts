import { z } from "zod";

const OAUTH2_SUPPORTED_RESPONSE_TYPES = ["code"] as const;

const OAUTH2_AUTHORIZE_SCHEMA = z.object({
  responseType: z.enum(OAUTH2_SUPPORTED_RESPONSE_TYPES),
  applicationId: z.string(),
  redirectUri: z.string().url(),
  scope: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
});

export { OAUTH2_AUTHORIZE_SCHEMA, OAUTH2_SUPPORTED_RESPONSE_TYPES };
