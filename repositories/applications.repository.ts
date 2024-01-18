import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { Application, NewApplication, applications } from "@/db/schema";
import { generateApplicationId } from "@/helpers/applications.helpers";

const createApplication = async ({
  name,
  userId,
}: NewApplication): Promise<string> => {
  const id = generateApplicationId();
  await db.insert(applications).values({ id, name, userId });
  return id;
};

const getApplicationById = async ({
  applicationId,
}: {
  applicationId: Application["id"];
}) => {
  return (
    await db
      .select()
      .from(applications)
      .where(eq(applications.id, applicationId))
  )[0];
};

const getApplicationsByUserId = async ({
  userId,
}: {
  userId: Application["userId"];
}) => {
  return await db
    .select({
      id: applications.id,
      name: applications.name,
      createdAt: applications.createdAt,
    })
    .from(applications)
    .where(eq(applications.userId, userId));
};

const updateApplicationDescription = async ({
  applicationId,
  description,
}: {
  applicationId: Application["id"];
  description: Application["description"];
}) => {
  await db
    .update(applications)
    .set({ description })
    .where(eq(applications.id, applicationId));
};

const updateApplicationName = async ({
  applicationId,
  name,
}: {
  applicationId: Application["id"];
  name: Application["name"];
}) => {
  await db
    .update(applications)
    .set({ name })
    .where(eq(applications.id, applicationId));
};

const deleteApplicationById = async ({
  applicationId,
}: {
  applicationId: Application["id"];
}) => {
  await db.delete(applications).where(eq(applications.id, applicationId));
};

export {
  createApplication,
  getApplicationById,
  getApplicationsByUserId,
  updateApplicationDescription,
  updateApplicationName,
  deleteApplicationById,
};
