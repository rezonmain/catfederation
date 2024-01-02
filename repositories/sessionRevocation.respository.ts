import { db } from "@/db/db";
import { sessionRevocations, type SessionRevocation } from "@/db/schema";
import { eq } from "drizzle-orm";

const createSessionRevocation = ({
  jwtHash,
}: {
  jwtHash: SessionRevocation["jwtHash"];
}) => {
  db.insert(sessionRevocations).values({ jwtHash });
};

const getSessionRevocations = async ({
  jwtHash,
}: {
  jwtHash: SessionRevocation["jwtHash"];
}): Promise<SessionRevocation[]> =>
  await db
    .select()
    .from(sessionRevocations)
    .where(eq(sessionRevocations.jwtHash, jwtHash));

export { createSessionRevocation, getSessionRevocations };
