import { ServerAction } from "@/types/common.types";

type ApplicationDetailsFieldsProps<T> = {
  action: ServerAction;
} & {
  [k in keyof T]: T[k];
};

export { type ApplicationDetailsFieldsProps };
export { ApplicationNameField } from "./application-name-field";
export { ApplicationDescriptionField } from "./application-description-field";
export { ApplicationRedirectField } from "./application-redirect-field";
