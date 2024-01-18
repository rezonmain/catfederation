"use server";
import {
  APPLICATION_DELETE_REDIRECT_SCHEMA,
  APPLICATION_DELETE_SCHEMA,
  APPLICATION_DESCRIPTION_SCHEMA,
  APPLICATION_NAME_SCHEMA,
  APPLICATION_REDIRECTS_SCHEMA,
} from "@/constants/applications.constants";
import { ROUTE_DEVELOPER } from "@/constants/route.constants";
import { Application } from "@/db/schema";
import { generateApplicationSecret } from "@/helpers/applications.helpers";
import { generateSecureHash } from "@/helpers/crypto.helpers";
import { getServerActionPathname } from "@/helpers/route.helpers";
import {
  createApplicationRedirect,
  deleteApplicationRedirect,
} from "@/repositories/applicationRedirects.repository";
import {
  deleteApplicationById,
  updateApplicationDescription,
  updateApplicationHash,
  updateApplicationName,
} from "@/repositories/applications.repository";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

async function handleDeleteApplication(applicationId: Application["id"]) {
  await deleteApplicationById({ applicationId });
  redirect(ROUTE_DEVELOPER);
}

async function handleUpdateApplicationSecret(applicationId: Application["id"]) {
  const secret = generateApplicationSecret();
  const hash = await generateSecureHash(secret);
  await updateApplicationHash({ applicationId, hash });

  return secret;
}

export {
  handleEditApplicationName,
  handleEditApplicationDescription,
  handleCreateApplicationRedirect,
  handleDeleteApplicationRedirect,
  handleDeleteApplication,
  handleUpdateApplicationSecret,
};
