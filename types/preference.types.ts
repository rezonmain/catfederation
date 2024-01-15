import { type z } from "zod";
import { PREFERENCES_SCHEMA } from "@/constants/preference.constants";

type UserPreferences = z.infer<typeof PREFERENCES_SCHEMA>;

export type { UserPreferences };
