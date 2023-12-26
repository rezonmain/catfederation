import { validateEnvironmentVariable } from "@/helpers/env.helpers";

const MAIL_HOST = validateEnvironmentVariable("SMTP_HOST");
const MAIL_PORT = parseInt(validateEnvironmentVariable("SMTP_PORT"));
const MAIL_USER = validateEnvironmentVariable("SMTP_USER");
const MAIL_PASSWORD = validateEnvironmentVariable("SMTP_PASSWORD");
const MAIL_FROM_EMAIL = validateEnvironmentVariable("SMTP_FROM_EMAIL");

export { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_FROM_EMAIL };
