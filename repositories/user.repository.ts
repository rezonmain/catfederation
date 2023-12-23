import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { NewUser, User, users } from "@/db/schema";

const createUser = async ({ cred, hash }: NewUser) => {
  await db.insert(users).values({ cred, hash });
};

const getUsersByCred = async ({ cred }: { cred: User["cred"] }) => {
  return db.select().from(users).where(eq(users.cred, cred));
};

const getHashByCred = async ({ cred }: { cred: User["cred"] }) => {
  const rows = await db
    .select({ hash: users.hash })
    .from(users)
    .where(eq(users.cred, cred));

  return rows[0]?.hash;
};

export { createUser, getUsersByCred, getHashByCred };
