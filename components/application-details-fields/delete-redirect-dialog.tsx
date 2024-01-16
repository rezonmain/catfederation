import { ApplicationRedirect } from "@/db/schema";
import { ServerAction } from "@/types/common.types";
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

type DeleteRedirectDialogProps = {
  redirect: ApplicationRedirect;
  action: ServerAction;
  children: React.ReactNode;
};

const DeleteRedirectDialog: React.FC<DeleteRedirectDialogProps> = ({
  redirect,
  action,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wider">
            Confirm redirect deletion
          </DialogTitle>
          <DialogDescription className="py-3">
            Are you sure you want to delete the redirect{" "}
            <span className="font-mono">{redirect.uri}</span> ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <form action={action}>
            <input type="hidden" name="redirectId" value={redirect.id}></input>
            <SubmitButton variant="destructive">Delete</SubmitButton>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteRedirectDialog };
