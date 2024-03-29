import {
  APPLICATION_DESCRIPTION_LENGTH,
  APPLICATION_ID_LENGTH,
  APPLICATION_NAME_LENGTH,
  APPLICATION_REDIRECT_URL_LENGTH,
} from "@/constants/applications.constants";
import { CODES_CODE_LENGTH } from "@/constants/codes.constants";
import { CRYPTO_FIELDS_LENGTH } from "@/constants/crypto.constants";
import { TIME_FIELDS_LENGTH } from "@/constants/time.constants";
import {
  USERS_ID_LENGTH,
  USERS_USERNAME_MAX_LENGTH,
} from "@/constants/users.constants";
import { generateApplicationId } from "@/helpers/applications.helpers";
import { getCodeExpirationISODate } from "@/helpers/code.helpers";
import { getEmail2FAExpirationISODate } from "@/helpers/email2FA.helpers";
import { ISONow } from "@/helpers/time.helpers";
import {
  generatePlaceholderUsername,
  generateUserId,
} from "@/helpers/users.helpers";
import {
  serial,
  varchar,
  mysqlTable,
  uniqueIndex,
  index,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: USERS_ID_LENGTH })
      .$defaultFn(generateUserId)
      .primaryKey(),
    createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH }).$defaultFn(
      ISONow,
    ),
    updatedAt: varchar("updated_at", { length: TIME_FIELDS_LENGTH }),
    cred: varchar("cred", { length: CRYPTO_FIELDS_LENGTH }).notNull(),
    hash: varchar("hash", { length: CRYPTO_FIELDS_LENGTH }).notNull(),
    username: varchar("username", {
      length: USERS_USERNAME_MAX_LENGTH,
    })
      .notNull()
      .$defaultFn(generatePlaceholderUsername),
  },
  (table) => {
    return {
      credIdx: uniqueIndex("cred_idx").on(table.cred),
      usernameIdx: uniqueIndex("username_idx").on(table.username),
    };
  },
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

export const applications = mysqlTable(
  "applications",
  {
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
    userId: varchar("user_id", { length: USERS_ID_LENGTH })
      // .references(() => users.id, { onDelete: "cascade" }) - planet scale does not support FK constraints yet
      .notNull(),
    hash: varchar("hash", { length: CRYPTO_FIELDS_LENGTH }),
  },
  (table) => {
    return {
      userIdx: index("user_idx").on(table.userId), // Remove when planet scale supports FK constraints
    };
  },
);
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

export const applicationRedirects = mysqlTable(
  "application_redirects",
  {
    id: serial("id").primaryKey(),
    createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH })
      .$defaultFn(ISONow)
      .notNull(),
    uri: varchar("uri", { length: APPLICATION_REDIRECT_URL_LENGTH }).notNull(),
    applicationId: varchar("application_id", {
      length: APPLICATION_ID_LENGTH,
    })
      // .references(() => applications.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      applicationIdx: index("application_idx").on(table.applicationId), // Remove when planet scale supports FK constraints
    };
  },
);
export type ApplicationRedirect = typeof applicationRedirects.$inferSelect;
export type NewApplicationRedirect = typeof applicationRedirects.$inferInsert;

export const codes = mysqlTable(
  "codes",
  {
    id: serial("id").primaryKey(),
    createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH })
      .$defaultFn(ISONow)
      .notNull(),
    expiresAt: varchar("expires_at", { length: TIME_FIELDS_LENGTH })
      .$defaultFn(getCodeExpirationISODate)
      .notNull(),
    code: varchar("code", { length: CODES_CODE_LENGTH }).notNull(),
    redirectUri: varchar("redirect_uri", {
      length: APPLICATION_REDIRECT_URL_LENGTH,
    }).notNull(),
    applicationId: varchar("application_id", { length: APPLICATION_ID_LENGTH })
      // .references(() => applications.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => {
    return {
      applicationIdx: index("application_idx").on(table.applicationId), // Remove when planet scale supports FK constraints
    };
  },
);
export type Code = typeof codes.$inferSelect;
export type NewCode = typeof codes.$inferInsert;
