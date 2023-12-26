import {
  CRYPTO_FIELDS_LENGTH,
  CRYPTO_USER_ID_LENGTH,
} from "@/constants/crypto.constants";
import { TIME_FIELDS_LENGTH } from "@/constants/time.constants";
import { generateUserId } from "@/helpers/crypto.helpers";
import {
  ISONow,
  getAccountCreationExpirationISODate,
} from "@/helpers/time.helpers";
import {
  serial,
  varchar,
  mysqlTable,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: CRYPTO_USER_ID_LENGTH })
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

export const accountCreations = mysqlTable("account_creations", {
  id: serial("id").primaryKey(),
  createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH })
    .$defaultFn(ISONow)
    .notNull(),
  expiresAt: varchar("expires_at", { length: TIME_FIELDS_LENGTH })
    .$defaultFn(getAccountCreationExpirationISODate)
    .notNull(),
  cred: varchar("cred", { length: CRYPTO_FIELDS_LENGTH }).notNull(),
  challengeToken: varchar("challenge_token", {
    length: CRYPTO_FIELDS_LENGTH,
  }).notNull(),
});
export type AccountCreation = typeof accountCreations.$inferSelect;
export type NewAccountCreation = typeof accountCreations.$inferInsert;
