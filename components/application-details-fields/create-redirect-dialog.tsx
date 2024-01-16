"use client";
import { Application } from "@/db/schema";
import { getRedirectUriPlaceholder } from "@/helpers/ui/application-details-fields.helpers";
import { delayCall, empty } from "@/helpers/utils.helpers";
import { ServerAction } from "@/types/common.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../submit-button";
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
import { useState } from "react";

type CreateRedirectDialogProps = {
  action: ServerAction;
  children: React.ReactNode;
  applicationName: Application["name"];
};

const CreateRedirectDialog: React.FC<CreateRedirectDialogProps> = ({
  action,
  children,
  applicationName,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wider">
            Add redirect
          </DialogTitle>
          <DialogDescription className="py-3">
            Add a redirect URI to your application.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-4">
          <Input
            name="redirectUri"
            type="url"
            required
            className="font-mono"
            placeholder={
              empty(applicationName)
                ? "http://localhost:3000"
                : getRedirectUriPlaceholder(applicationName)
            }
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton variant="outline">Add redirect</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateRedirectDialog };
