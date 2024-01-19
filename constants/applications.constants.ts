import { z } from "zod";

const APPLICATION_ID_LENGTH = 20;
const APPLICATION_NAME_LENGTH = 64;
const APPLICATION_DESCRIPTION_LENGTH = 400;
const APPLICATION_REDIRECT_URL_LENGTH = 256;
const APPLICATION_SECRET_LENGTH = 48;

const APPLICATION_NAME_SCHEMA = z.object({
  name: z
    .string()
    .max(
      APPLICATION_NAME_LENGTH,
      "Application name cannot be longer than 64 characters"
    ),
});
const APPLICATION_DESCRIPTION_SCHEMA = z.object({
  description: z
    .string()
    .max(
      APPLICATION_DESCRIPTION_LENGTH,
      "Application description cannot be longer than 400 characters"
    ),
});
const APPLICATION_REDIRECTS_SCHEMA = z.object({
  redirectUri: z.string().url("Redirect must be a valid URL"),
});
const APPLICATION_DELETE_REDIRECT_SCHEMA = z.object({
  redirectId: z.coerce.number(),
});

export {
  APPLICATION_ID_LENGTH,
  APPLICATION_NAME_LENGTH,
  APPLICATION_DESCRIPTION_LENGTH,
  APPLICATION_REDIRECT_URL_LENGTH,
  APPLICATION_NAME_SCHEMA,
  APPLICATION_DESCRIPTION_SCHEMA,
  APPLICATION_REDIRECTS_SCHEMA,
  APPLICATION_DELETE_REDIRECT_SCHEMA,
  APPLICATION_SECRET_LENGTH,
};
