import {
  mysqlTable,
  varchar,
  serial,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "user",
  {
    id: serial("id").primaryKey(),
    cred: varchar("cred", { length: 256 }).notNull(),
    hash: varchar("hash", { length: 256 }).notNull(),
  },
  (table) => {
    return {
      credIdx: uniqueIndex("cred_idx").on(table.cred),
    };
  }
);
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
