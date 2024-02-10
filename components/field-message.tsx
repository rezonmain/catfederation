type FieldMessageProps = {
  message?: string[];
};

const FieldMessage: React.FC<FieldMessageProps> = ({ message }) => {
  return <span className="text-sm text-red-500">{message?.join(", ")}</span>;
};

export { FieldMessage };
