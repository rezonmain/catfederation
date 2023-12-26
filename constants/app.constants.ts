import { validateEnvironmentVariable } from "@/helpers/env.helpers";

const APP_DOMAIN = validateEnvironmentVariable("APP_DOMAIN");

export { APP_DOMAIN };
