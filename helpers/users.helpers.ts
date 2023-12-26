import { USERS_ID_LENGTH } from "@/constants/users.constants";
import { init } from "@paralleldrive/cuid2";

const generateUserId = () => {
  return init({
    length: USERS_ID_LENGTH,
  })();
};

export { generateUserId };
