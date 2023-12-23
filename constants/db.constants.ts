const DB_HOST = validateEnvironmentVariable("DATABASE_HOST");
const DB_USERNAME = validateEnvironmentVariable("DATABASE_USERNAME");
const DB_PASSWORD = validateEnvironmentVariable("DATABASE_PASSWORD");

export { DB_HOST, DB_USERNAME, DB_PASSWORD };
