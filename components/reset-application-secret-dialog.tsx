"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";

type ResetApplicationSecretDialogProps = {
  action: () => void;
  children: React.ReactNode;
  className?: string;
};

const ResetApplicationSecretDialog: React.FC<
  ResetApplicationSecretDialogProps
> = ({ action, children, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wider">
            Reset application secret
          </DialogTitle>
          <DialogDescription className="py-3">
            You&apos;ll need to update your application with the new secret. Are
            you sure you want to reset the secret?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <form action={action}>
            <SubmitButton onSubmitted={() => setOpen(false)}>
              Reset
            </SubmitButton>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ResetApplicationSecretDialog };
