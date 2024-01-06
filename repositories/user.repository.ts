import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { NewUser, User, users } from "@/db/schema";
import { generateUserId } from "@/helpers/users.helpers";

const createUser = async ({ cred, hash }: NewUser): Promise<string> => {
  const id = generateUserId();
  await db.insert(users).values({ cred, hash, id });
  return id;
};

const getUsersByCred = async ({ cred }: { cred: User["cred"] }) => {
  return await db.select().from(users).where(eq(users.cred, cred));
};

const getHashByCred = async ({ cred }: { cred: User["cred"] }) => {
  const rows = await db
    .select({ hash: users.hash })
    .from(users)
    .where(eq(users.cred, cred));

  return rows[0]?.hash;
};

export { createUser, getUsersByCred, getHashByCred };
