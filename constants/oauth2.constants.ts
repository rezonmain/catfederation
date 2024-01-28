import { z } from "zod";

enum OAUTH2_SUPPORTED_RESPONSE_TYPES {
  CODE = "code",
}
enum OAUTH2_SUPPORTED_SCOPES {
  IDENTIFY = "identify",
}

const OAUTH2_AUTHORIZE_SCHEMA = z.object({
  responseType: z.nativeEnum(OAUTH2_SUPPORTED_RESPONSE_TYPES),
  applicationId: z.string(),
  redirectUri: z.string().url(),
  scope: z.nativeEnum(OAUTH2_SUPPORTED_SCOPES),
});

export {
  OAUTH2_SUPPORTED_RESPONSE_TYPES,
  OAUTH2_SUPPORTED_SCOPES,
  OAUTH2_AUTHORIZE_SCHEMA,
};
