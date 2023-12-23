import { type Config } from "drizzle-kit";
import { DB_URI } from "@/constants/db.constants";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: DB_URI,
  },
  tablesFilter: ["catfederation_*"],
} satisfies Config;
