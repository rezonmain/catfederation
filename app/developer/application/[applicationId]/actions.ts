"use server";
import {
  APPLICATION_DELETE_REDIRECT_SCHEMA,
  APPLICATION_DESCRIPTION_SCHEMA,
  APPLICATION_NAME_SCHEMA,
  APPLICATION_REDIRECTS_SCHEMA,
} from "@/constants/applications.constants";

async function handleEditApplicationName(data: FormData) {
  const fields = APPLICATION_NAME_SCHEMA.safeParse({
    name: data.get("name"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  console.log(fields.data.name);
}

async function handleEditApplicationDescription(data: FormData) {
  const fields = APPLICATION_DESCRIPTION_SCHEMA.safeParse({
    name: data.get("description"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  console.log(fields.data.description);
}

async function handleCreateApplicationRedirect(
  applicationId: string,
  data: FormData
) {
  const fields = APPLICATION_REDIRECTS_SCHEMA.safeParse({
    redirectUri: data.getAll("redirects"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  console.log(fields.data.redirectUri, applicationId);
}

async function handleDeleteApplicationRedirect(data: FormData) {
  const fields = APPLICATION_DELETE_REDIRECT_SCHEMA.safeParse({
    redirectId: data.get("redirectId"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  console.log(fields.data.redirectId);
}
export {
  handleEditApplicationName,
  handleEditApplicationDescription,
  handleCreateApplicationRedirect,
  handleDeleteApplicationRedirect,
};
