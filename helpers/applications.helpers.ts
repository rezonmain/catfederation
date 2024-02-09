import { init } from "@paralleldrive/cuid2";
import {
  APPLICATION_ID_LENGTH,
  APPLICATION_SECRET_LENGTH,
} from "@/constants/applications.constants";
import { getRandomBytes } from "./crypto.helpers";
import { getBoundedActions } from "./route.helpers";
import {
  handleCreateApplicationRedirect,
  handleDeleteApplication,
  handleEditApplicationDescription,
  handleEditApplicationName,
  handleUpdateApplicationSecret,
} from "@/app/developer/application/[applicationId]/actions";
import { type Application } from "@/db/schema";
import { type ServerAction } from "@/types/common.types";

const generateApplicationId = () => {
  return init({
    length: APPLICATION_ID_LENGTH,
  })();
};

const generateApplicationSecret = () => {
  return getRandomBytes(APPLICATION_SECRET_LENGTH, "base64");
};

export { generateApplicationId, generateApplicationSecret };
