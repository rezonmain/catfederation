import { db } from "@/db/db";
import { NewAccountCreation, accountCreations } from "@/db/schema";

const createAccountCreationEntry = async ({
  challengeToken,
  cred,
  expiresAt,
}: NewAccountCreation) => {
  await db.insert(accountCreations).values({ challengeToken, cred, expiresAt });
};

export { createAccountCreationEntry };
