import { db } from "@/db/db";
import { Application, NewApplication, applications } from "@/db/schema";
import { generateApplicationId } from "@/helpers/applications.helpers";
import { eq } from "drizzle-orm";

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

export { createApplication, getApplicationById };
