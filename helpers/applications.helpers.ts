import {
  APPLICATION_ID_LENGTH,
  APPLICATION_SECRET_LENGTH,
} from "@/constants/applications.constants";
import { init } from "@paralleldrive/cuid2";
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

const generateApplicationId = () => {
  return init({
    length: APPLICATION_ID_LENGTH,
  })();
};

const generateApplicationSecret = () => {
  return getRandomBytes(APPLICATION_SECRET_LENGTH);
};

const getApplicationPageActions = (applicationId: Application["id"]) => {
  const [
    editName,
    editDescription,
    createRedirect,
    deleteApplication,
    updateSecret,
  ] = getBoundedActions(
    applicationId,
    handleEditApplicationName,
    handleEditApplicationDescription,
    handleCreateApplicationRedirect,
    handleDeleteApplication,
    handleUpdateApplicationSecret
  );

  return {
    editName,
    editDescription,
    createRedirect,
    deleteApplication,
    updateSecret,
  };
};

export {
  generateApplicationId,
  generateApplicationSecret,
  getApplicationPageActions,
};
