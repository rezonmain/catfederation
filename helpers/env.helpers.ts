import { nil } from "@/helpers/utils.helpers";

const validateEnvironmentVariable = (key: string) => {
  const value = process.env[key];
  if (nil(value)) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value!;
};

export { validateEnvironmentVariable };
