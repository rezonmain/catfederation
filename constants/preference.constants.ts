import { UserPreferences } from "@/types/preference.types";
import { z } from "zod";

const PREFERENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 100; // 100 years
const PREFERENCE_COOKIE_NAME = "cf-up";
const PREFERENCE_ALIAS_MAX_LENGTH = 32;
const PREFERENCE_ALIAS_MIN_LENGTH = 3;

const PREFERENCES_SCHEMA = z.object({
  isDeveloper: z.coerce.boolean(),
  alias: z
    .string()
    .max(
      PREFERENCE_ALIAS_MAX_LENGTH,
      "Alias must be at most 32 characters long"
    ),
});

const PREFERENCE_DEFAULT_VALUES: UserPreferences = {
  isDeveloper: false,
  alias: "",
};

export {
  PREFERENCE_COOKIE_MAX_AGE,
  PREFERENCE_COOKIE_NAME,
  PREFERENCE_DEFAULT_VALUES,
  PREFERENCES_SCHEMA,
  PREFERENCE_ALIAS_MAX_LENGTH,
  PREFERENCE_ALIAS_MIN_LENGTH,
};
