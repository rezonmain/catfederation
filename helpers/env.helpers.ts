const validateEnvironmentVariable = (key: string) => {
  console.count("[validateEnvironmentVariable] " + key);
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};
