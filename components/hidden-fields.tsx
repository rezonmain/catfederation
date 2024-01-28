type HiddenFieldProps<T extends Record<string, string>> = {
  fields: T;
};

const HiddenFields = <T extends Record<string, string>>({
  fields,
}: HiddenFieldProps<T>) => {
  return (
    <>
      {Object.entries(fields).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
    </>
  );
};

export { HiddenFields };
