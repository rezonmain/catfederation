import { db } from "@/db/db";
import { and, eq } from "drizzle-orm";
import {
  AccountCreation,
  NewAccountCreation,
  accountCreations,
} from "@/db/schema";

const createAccountCreationEntry = async ({
  challengeToken,
  cred,
  expiresAt,
}: NewAccountCreation) => {
  await db.insert(accountCreations).values({ challengeToken, cred, expiresAt });
};

const getAccountCreationsByCred = async ({
  cred,
}: {
  cred: AccountCreation["cred"];
}) => {
  return await db
    .select()
    .from(accountCreations)
    .where(eq(accountCreations.cred, cred));
};

const getAccountCreationExpiresAt = async ({
  cred,
  challengeToken,
}: {
  cred: AccountCreation["cred"];
  challengeToken: AccountCreation["challengeToken"];
}) => {
  return await db
    .select({ expiresAt: accountCreations.expiresAt })
    .from(accountCreations)
    .where(
      and(
        eq(accountCreations.cred, cred),
        eq(accountCreations.challengeToken, challengeToken)
      )
    );
};

const deleteAccountCreationsByCred = async ({
  cred,
}: {
  cred: AccountCreation["cred"];
}) => {
  await db.delete(accountCreations).where(eq(accountCreations.cred, cred));
};

export {
  createAccountCreationEntry,
  getAccountCreationExpiresAt,
  deleteAccountCreationsByCred,
  getAccountCreationsByCred,
};
