import { Application } from "@/db/schema";
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

type DeleteApplicationDialogProps = {
  action: ServerAction;
  applicationName: Application["name"];
  children: React.ReactNode;
  className?: string;
};

const DeleteApplicationDialog: React.FC<DeleteApplicationDialogProps> = ({
  action,
  applicationName,
  children,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className={className}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wider">
            Confirm deletion
          </DialogTitle>
          <DialogDescription className="py-3">
            Are you sure you want to delete{" "}
            <span className="uppercase tracking-wider">{applicationName}</span>{" "}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <form action={action}>
            <SubmitButton variant="destructive">Delete</SubmitButton>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteApplicationDialog };
