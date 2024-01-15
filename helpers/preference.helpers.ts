import { cookies } from "next/headers";
import {
  PREFERENCE_COOKIE_MAX_AGE,
  PREFERENCE_COOKIE_NAME,
  PREFERENCE_DEFAULT_VALUES,
} from "@/constants/preference.constants";
import { stringToBoolean, nil } from "@/helpers/utils.helpers";
import { UserPreferences } from "@/types/preference.types";

const getUserPreferenceCookieValue = (userPreferences: UserPreferences) => {
  return Object.values(userPreferences).join("|");
};

const parseUserPreferenceCookieValue = (
  cookieValue: string
): UserPreferences => {
  const values = cookieValue.split("|");
  return {
    isDeveloper: stringToBoolean(values[0]),
    alias: values[1],
  };
};

const generateUserPreferenceCookie = (userPreferences: UserPreferences) => {
  const value = getUserPreferenceCookieValue(userPreferences);
  const options = {
    maxAge: PREFERENCE_COOKIE_MAX_AGE,
    sameSite: "strict" as const,
  };
  return {
    name: PREFERENCE_COOKIE_NAME,
    value,
    options,
  };
};

const setUserPreferenceCookie = (userPreferences: UserPreferences) => {
  const options = generateUserPreferenceCookie(userPreferences);
  cookies().set(options.name, options.value, options.options);
};

const userPreferences = (): UserPreferences => {
  const cookie = cookies().get(PREFERENCE_COOKIE_NAME);
  if (nil(cookie)) {
    return PREFERENCE_DEFAULT_VALUES;
  }
  return parseUserPreferenceCookieValue(cookie.value);
};

const developer = () => {
  const cookie = cookies().get(PREFERENCE_COOKIE_NAME);
  if (nil(cookie)) {
    return false;
  }
  return parseUserPreferenceCookieValue(cookie.value).isDeveloper;
};

export { setUserPreferenceCookie, userPreferences, developer };
