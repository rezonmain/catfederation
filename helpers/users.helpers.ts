import {
  USERS_ID_LENGTH,
  USERS_PLACEHOLDER_USERNAME_KEY,
  USERS_PLACEHOLDER_USERNAME_LENGTH,
} from "@/constants/users.constants";
import { init } from "@paralleldrive/cuid2";

const generateUserId = () => {
  return init({
    length: USERS_ID_LENGTH,
  })();
};

const generatePlaceholderUsername = () => {
  const uname = init({ length: USERS_PLACEHOLDER_USERNAME_LENGTH })();
  return `${USERS_PLACEHOLDER_USERNAME_KEY}${uname}`;
};

const isPlaceholderUsername = (username: string) => {
  return username.startsWith(USERS_PLACEHOLDER_USERNAME_KEY);
};

export { generateUserId, generatePlaceholderUsername, isPlaceholderUsername };
