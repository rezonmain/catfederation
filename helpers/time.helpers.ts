const getExpirationISODate = ({ minutes }: { minutes: number }): string => {
  const now = new Date();
  const date = new Date(now.getTime() + minutes * 60000);
  return date.toISOString();
};

const ISONow = (): string => {
  return new Date().toISOString();
};

const expired = (date: string): boolean => {
  return new Date(date) < new Date();
};

export { getExpirationISODate, ISONow, expired };
