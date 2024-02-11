import { db } from "@/db/db";
import { codes, type NewCode } from "@/db/schema";

const createCode = async ({ code, applicationId, redirectUri }: NewCode) => {
  await db.insert(codes).values({ code, applicationId, redirectUri });
};

export { createCode };
