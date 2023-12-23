"use client";
import { Button, Spinner } from "flowbite-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} color="dark">
      {pending ? <Spinner /> : children}
    </Button>
  );
};

export { SubmitButton };
