import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";
import * as schema from "./schema";
import { DB_URI } from "@/constants/db.constants";

export const db = drizzle(
  new Client({
    url: DB_URI,
  }).connection(),
  { schema }
);
