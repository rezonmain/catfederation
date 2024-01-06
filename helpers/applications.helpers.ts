import { APPLICATION_ID_LENGTH } from "@/constants/applications.constants";
import { init } from "@paralleldrive/cuid2";

const generateApplicationId = () => {
  return init({
    length: APPLICATION_ID_LENGTH,
  })();
};

export { generateApplicationId };
