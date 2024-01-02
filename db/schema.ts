import { CRYPTO_FIELDS_LENGTH } from "@/constants/crypto.constants";
import { TIME_FIELDS_LENGTH } from "@/constants/time.constants";
import { USERS_ID_LENGTH } from "@/constants/users.constants";
import { getSignupAttemptExpirationISODate } from "@/helpers/signupAttempt.helpers";
import { ISONow } from "@/helpers/time.helpers";
import { generateUserId } from "@/helpers/users.helpers";
import {
  serial,
  varchar,
  mysqlTable,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: USERS_ID_LENGTH })
      .$defaultFn(generateUserId)
      .primaryKey(),
    createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH }).$defaultFn(
      ISONow
    ),
    updatedAt: varchar("updated_at", { length: TIME_FIELDS_LENGTH }),
    cred: varchar("cred", { length: CRYPTO_FIELDS_LENGTH }).notNull(),
    hash: varchar("hash", { length: CRYPTO_FIELDS_LENGTH }).notNull(),
  },
  (table) => {
    return {
      idIdx: uniqueIndex("id_idx").on(table.id),
      credIdx: uniqueIndex("cred_idx").on(table.cred),
    };
  }
);
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const signupAttempts = mysqlTable("signup_attempts", {
  id: serial("id").primaryKey(),
  createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH })
    .$defaultFn(ISONow)
    .notNull(),
  expiresAt: varchar("expires_at", { length: TIME_FIELDS_LENGTH })
    .$defaultFn(getSignupAttemptExpirationISODate)
    .notNull(),
  cred: varchar("cred", { length: CRYPTO_FIELDS_LENGTH }).notNull(),
  challengeToken: varchar("challenge_token", {
    length: CRYPTO_FIELDS_LENGTH,
  }).notNull(),
});
export type SignupAttempt = typeof signupAttempts.$inferSelect;
export type NewSignupAttempt = typeof signupAttempts.$inferInsert;
