import { db } from "@/db/db";
import { and, eq } from "drizzle-orm";
import { email2FAs, type NewEmail2FA, type Email2FA } from "@/db/schema";

const createEmail2FAEntry = async ({
  cred,
  expiresAt,
  challengeToken,
}: NewEmail2FA) => {
  await db.insert(email2FAs).values({ challengeToken, cred, expiresAt });
};

const getEmail2FAsByCred = async ({ cred }: { cred: Email2FA["cred"] }) => {
  return await db.select().from(email2FAs).where(eq(email2FAs.cred, cred));
};

const getEmail2FAsExpiresAt = async ({
  cred,
  challengeToken,
}: {
  cred: Email2FA["cred"];
  challengeToken: Email2FA["challengeToken"];
}) => {
  return await db
    .select({ expiresAt: email2FAs.expiresAt })
    .from(email2FAs)
    .where(
      and(
        eq(email2FAs.cred, cred),
        eq(email2FAs.challengeToken, challengeToken)
      )
    );
};

const deleteEmail2FAsByCred = async ({ cred }: { cred: Email2FA["cred"] }) => {
  await db.delete(email2FAs).where(eq(email2FAs.cred, cred));
};

export {
  createEmail2FAEntry,
  getEmail2FAsByCred,
  getEmail2FAsExpiresAt,
  deleteEmail2FAsByCred,
};
