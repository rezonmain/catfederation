import {
  APPLICATION_DESCRIPTION_LENGTH,
  APPLICATION_ID_LENGTH,
  APPLICATION_NAME_LENGTH,
  APPLICATION_REDIRECT_URL_LENGTH,
} from "@/constants/applications.constants";
import { CRYPTO_FIELDS_LENGTH } from "@/constants/crypto.constants";
import { TIME_FIELDS_LENGTH } from "@/constants/time.constants";
import { USERS_ID_LENGTH } from "@/constants/users.constants";
import { generateApplicationId } from "@/helpers/applications.helpers";
import { getEmail2FAExpirationISODate } from "@/helpers/email2FA.helpers";
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

export const email2FAs = mysqlTable("email_2fas", {
  id: serial("id").primaryKey(),
  createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH })
    .$defaultFn(ISONow)
    .notNull(),
  expiresAt: varchar("expires_at", { length: TIME_FIELDS_LENGTH })
    .$defaultFn(getEmail2FAExpirationISODate)
    .notNull(),
  cred: varchar("cred", { length: CRYPTO_FIELDS_LENGTH }).notNull(),
  challengeToken: varchar("challenge_token", {
    length: CRYPTO_FIELDS_LENGTH,
  }).notNull(),
});
export type Email2FA = typeof email2FAs.$inferSelect;
export type NewEmail2FA = typeof email2FAs.$inferInsert;

export const applications = mysqlTable("applications", {
  id: varchar("id", { length: APPLICATION_ID_LENGTH })
    .$defaultFn(generateApplicationId)
    .primaryKey(),
  createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH })
    .$defaultFn(ISONow)
    .notNull(),
  updatedAt: varchar("updated_at", { length: TIME_FIELDS_LENGTH }),
  name: varchar("name", { length: APPLICATION_NAME_LENGTH }).notNull(),
  description: varchar("description", {
    length: APPLICATION_DESCRIPTION_LENGTH,
  }),
  userId: varchar("user_id", { length: USERS_ID_LENGTH }).notNull(),
});
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

export const application_redirects = mysqlTable(
  "application_redirects",
  {
    id: serial("id").primaryKey(),
    createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH })
      .$defaultFn(ISONow)
      .notNull(),
    updatedAt: varchar("updated_at", { length: TIME_FIELDS_LENGTH }),
    applicationId: varchar("application_id", {
      length: APPLICATION_ID_LENGTH,
    }).notNull(),
    uri: varchar("uri", { length: APPLICATION_REDIRECT_URL_LENGTH }).notNull(),
  },
  (table) => {
    return {
      applicationIdx: uniqueIndex("application_id_idx").on(table.applicationId),
    };
  }
);
export type ApplicationRedirect = typeof application_redirects.$inferSelect;
export type NewApplicationRedirect = typeof application_redirects.$inferInsert;
