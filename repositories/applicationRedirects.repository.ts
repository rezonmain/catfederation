import { db } from "@/db/db";
import {
  type NewApplicationRedirect,
  applicationRedirects,
  ApplicationRedirect,
} from "@/db/schema";
import { eq } from "drizzle-orm";

const createApplicationRedirect = async ({
  uri,
  applicationId,
}: NewApplicationRedirect) => {
  await db.insert(applicationRedirects).values({ uri, applicationId });
};

const getApplicationRedirects = async ({
  applicationId,
}: {
  applicationId: ApplicationRedirect["applicationId"];
}) => {
  return await db
    .select()
    .from(applicationRedirects)
    .where(eq(applicationRedirects.applicationId, applicationId));
};

const deleteApplicationRedirect = async ({
  redirectId,
}: {
  redirectId: ApplicationRedirect["id"];
}) => {
  await db
    .delete(applicationRedirects)
    .where(eq(applicationRedirects.id, redirectId));
};

export {
  createApplicationRedirect,
  getApplicationRedirects,
  deleteApplicationRedirect,
};
