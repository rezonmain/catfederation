const empty = (
  val: string | unknown[] | object | null | undefined,
): val is null | undefined => {
  if (!val) return true;
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === "object") return Object.keys(val).length === 0;
  return false;
};

const nil = (val: unknown): val is null | undefined => {
  return val === null || val === undefined;
};

/**
 * Used for boolean values in FormData, let zod coerce the boolean value
 * @param val
 * @returns
 */
const booleanString = (val: boolean): "true" | "" => {
  return val ? "true" : "";
};

const stringToBoolean = (val: string) => {
  return val === "true" ? true : false;
};

const noop = () => {};

const delayCall = (fn: () => void, delay: number) => {
  setTimeout(fn, delay);
};

const upperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const truncate = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) : str;
};

export {
  empty,
  nil,
  booleanString,
  stringToBoolean,
  noop,
  delayCall,
  upperFirst,
  truncate,
};
