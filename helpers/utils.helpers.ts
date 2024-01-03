const empty = (val: string | unknown[] | object | null | undefined) => {
  if (!val) return true;
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === "object") return Object.keys(val).length === 0;
  return false;
};

const nil = (val: unknown): val is null | undefined => {
  return val === null || val === undefined;
};

export { empty, nil };
