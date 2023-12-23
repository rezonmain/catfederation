import { db } from "@/db/db";
import { NewUser, users } from "@/db/schema";

const createUser = async ({ cred, hash }: NewUser) => {
  await db.insert(users).values({ cred, hash });
};

export { createUser };
