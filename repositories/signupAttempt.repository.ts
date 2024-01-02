import { db } from "@/db/db";
import { and, eq } from "drizzle-orm";
import {
  signupAttempts,
  type NewSignupAttempt,
  type SignupAttempt,
} from "@/db/schema";

const createSignupAttemptEntry = async ({
  cred,
  expiresAt,
  challengeToken,
}: NewSignupAttempt) => {
  await db.insert(signupAttempts).values({ challengeToken, cred, expiresAt });
};

const getSignupAttemptsByCred = async ({
  cred,
}: {
  cred: SignupAttempt["cred"];
}) => {
  return await db
    .select()
    .from(signupAttempts)
    .where(eq(signupAttempts.cred, cred));
};

const getSignupAttemptsExpiresAt = async ({
  cred,
  challengeToken,
}: {
  cred: SignupAttempt["cred"];
  challengeToken: SignupAttempt["challengeToken"];
}) => {
  return await db
    .select({ expiresAt: signupAttempts.expiresAt })
    .from(signupAttempts)
    .where(
      and(
        eq(signupAttempts.cred, cred),
        eq(signupAttempts.challengeToken, challengeToken)
      )
    );
};

const deleteSignupAttemptsByCred = async ({
  cred,
}: {
  cred: SignupAttempt["cred"];
}) => {
  await db.delete(signupAttempts).where(eq(signupAttempts.cred, cred));
};

export {
  createSignupAttemptEntry,
  getSignupAttemptsByCred,
  getSignupAttemptsExpiresAt,
  deleteSignupAttemptsByCred,
};
