"use server";
import {
  APPLICATION_DELETE_REDIRECT_SCHEMA,
  APPLICATION_DESCRIPTION_SCHEMA,
  APPLICATION_NAME_SCHEMA,
  APPLICATION_REDIRECTS_SCHEMA,
} from "@/constants/applications.constants";
import { Application } from "@/db/schema";
import { getServerActionPathname } from "@/helpers/route.helpers";
import {
  createApplicationRedirect,
  deleteApplicationRedirect,
} from "@/repositories/applicationRedirects.repository";
import {
  updateApplicationDescription,
  updateApplicationName,
} from "@/repositories/applications.repository";
import { revalidatePath } from "next/cache";

async function handleEditApplicationName(
  applicationId: Application["id"],
  data: FormData
) {
  const fields = APPLICATION_NAME_SCHEMA.safeParse({
    name: data.get("name"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  await updateApplicationName({ applicationId, name: fields.data.name });
  revalidatePath(getServerActionPathname());
}

async function handleEditApplicationDescription(
  applicationId: Application["id"],
  data: FormData
) {
  const fields = APPLICATION_DESCRIPTION_SCHEMA.safeParse({
    description: data.get("description"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  await updateApplicationDescription({
    applicationId,
    description: fields.data.description,
  });
  revalidatePath(getServerActionPathname());
}

async function handleCreateApplicationRedirect(
  applicationId: Application["id"],
  data: FormData
) {
  const fields = APPLICATION_REDIRECTS_SCHEMA.safeParse({
    redirectUri: data.get("redirectUri"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }
  await createApplicationRedirect({
    uri: fields.data.redirectUri,
    applicationId,
  });
  revalidatePath(getServerActionPathname());
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

  await deleteApplicationRedirect({ redirectId: fields.data.redirectId });
  revalidatePath(getServerActionPathname());
}

export {
  handleEditApplicationName,
  handleEditApplicationDescription,
  handleCreateApplicationRedirect,
  handleDeleteApplicationRedirect,
};
