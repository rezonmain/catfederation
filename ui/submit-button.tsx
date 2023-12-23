"use client";
import { Button, Spinner } from "flowbite-react";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = ComponentProps<typeof Button>;

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <Spinner /> : children}
    </Button>
  );
};

export { SubmitButton };
