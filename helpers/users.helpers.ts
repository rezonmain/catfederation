import { init } from "@paralleldrive/cuid2";
import { faker } from "@faker-js/faker";
import {
  USERS_ID_LENGTH,
  USERS_PLACEHOLDER_USERNAME_KEY,
  USERS_PLACEHOLDER_USERNAME_LENGTH,
  USERS_USERNAME_MAX_LENGTH,
  USERS_USERNAME_MIN_LENGTH,
} from "@/constants/users.constants";
import { truncate, upperFirst } from "@/helpers/utils.helpers";

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

const generateRandomUsername = () => {
  const color = upperFirst(faker.color.human());
  const adjective = upperFirst(faker.word.noun());
  const animal = upperFirst(faker.animal.type());
  const username = `${color}${adjective}${animal}`
    .padStart(USERS_USERNAME_MIN_LENGTH, "_")
    .replace(/\s/g, "");

  return truncate(username, USERS_USERNAME_MAX_LENGTH);
};

export {
  generateUserId,
  generatePlaceholderUsername,
  isPlaceholderUsername,
  generateRandomUsername,
};
