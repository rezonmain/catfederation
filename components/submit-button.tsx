"use client";
import { ComponentProps } from "react";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/loading-spinner";
import { useFormSubmit } from "@/hooks/use-form-submit.hook";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  onSubmitted?: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  onSubmitted,
  ...props
}) => {
  const { pending } = useFormSubmit(onSubmitted);

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <LoadingSpinner /> : children}
    </Button>
  );
};

export { SubmitButton };
