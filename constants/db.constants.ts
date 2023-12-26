import { validateEnvironmentVariable } from "@/helpers/env.helpers";

const DB_HOST = validateEnvironmentVariable("DATABASE_HOST");
const DB_NAME = validateEnvironmentVariable("DATABASE_NAME");
const DB_USERNAME = validateEnvironmentVariable("DATABASE_USERNAME");
const DB_PASSWORD = validateEnvironmentVariable("DATABASE_PASSWORD");
const DB_URI = `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`;

export { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_URI };
