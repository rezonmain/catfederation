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
import { ApplicationRedirect, type Application } from "@/db/schema";
import { type ServerAction } from "@/types/common.types";
import { APP_DOMAIN } from "@/constants/app.constants";

const generateApplicationId = () => {
  return init({
    length: APPLICATION_ID_LENGTH,
  })();
};

const generateApplicationSecret = () => {
  return getRandomBytes(APPLICATION_SECRET_LENGTH, "base64");
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
    handleUpdateApplicationSecret,
  );

  return {
    editName,
    editDescription,
    createRedirect,
    deleteApplication,
    updateSecret: updateSecret as ServerAction<
      ReturnType<typeof handleUpdateApplicationSecret>
    >,
  };
};

const generateExampleAuthorizationUrl = (
  applicationId: Application["id"],
  redirects: ApplicationRedirect[],
) => {
  applicationId = encodeURIComponent(applicationId);
  const redirectUri = encodeURIComponent(redirects[0].uri);
  const responseType = encodeURIComponent("code");
  return `${APP_DOMAIN}/oauth2/authorize?responseType=${responseType}&applicationId=${applicationId}&redirectUri=${redirectUri}`;
};

export {
  generateApplicationId,
  generateApplicationSecret,
  getApplicationPageActions,
  generateExampleAuthorizationUrl,
};
