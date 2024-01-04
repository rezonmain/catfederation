"use client";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/loading-spinner";

type SubmitButtonProps = ComponentProps<typeof Button>;

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <LoadingSpinner /> : children}
    </Button>
  );
};

export { SubmitButton };
