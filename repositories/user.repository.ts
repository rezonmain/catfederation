import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { NewUser, User, users } from "@/db/schema";
import {
  generatePlaceholderUsername,
  generateUserId,
} from "@/helpers/users.helpers";

const createUser = async ({
  cred,
  hash,
}: NewUser): Promise<Pick<User, "id" | "username">> => {
  const id = generateUserId();
  const username = generatePlaceholderUsername();
  await db.insert(users).values({ cred, hash, id, username });
  return { id, username };
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

const updateUserUsername = async ({
  username,
  id,
}: Pick<User, "id" | "username">) => {
  return await db.update(users).set({ username }).where(eq(users.id, id));
};

export { createUser, getUsersByCred, getHashByCred, updateUserUsername };
