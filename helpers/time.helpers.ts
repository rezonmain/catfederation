import { TIME_ACCOUNT_CREATION_TOKEN_EXPIRATION_MINUTES } from "@/constants/time.constants";

const getExpirationISODate = ({ minutes }: { minutes: number }): string => {
  const now = new Date();
  const date = new Date(now.getTime() + minutes * 60000);
  return date.toISOString();
};

const getAccountCreationExpirationISODate = (): string => {
  return getExpirationISODate({
    minutes: TIME_ACCOUNT_CREATION_TOKEN_EXPIRATION_MINUTES,
  });
};

const ISONow = (): string => {
  return new Date().toISOString();
};

export { getAccountCreationExpirationISODate, ISONow };
