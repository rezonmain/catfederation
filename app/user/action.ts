"use server";
import { PREFERENCES_SCHEMA } from "@/constants/preference.constants";
import { setUserPreferenceCookie } from "@/helpers/preference.helpers";

async function handleUserPreferences(formData: FormData) {
  const fields = PREFERENCES_SCHEMA.safeParse({
    isDeveloper: formData.get("isDeveloper"),
    alias: formData.get("alias"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  setUserPreferenceCookie(fields.data);
}

export { handleUserPreferences };
