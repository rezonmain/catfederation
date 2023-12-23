type FieldMessageProps = {
  message?: string[];
};

const FieldMessage: React.FC<FieldMessageProps> = ({ message }) => {
  return <span className="text-red-500 text-sm">{message?.join(",")}</span>;
};

export { FieldMessage };
