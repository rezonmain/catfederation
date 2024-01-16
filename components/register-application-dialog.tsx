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
import { Input } from "./ui/input";
import { SubmitButton } from "./submit-button";
import { Button } from "./ui/button";

type RegisterApplicationDialogProps = {
  children: React.ReactNode;
  action: (formData: FormData) => Promise<unknown>;
};

const RegisterApplicationDialog: React.FC<RegisterApplicationDialogProps> = ({
  children,
  action,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wider">
            Register Application
          </DialogTitle>
          <DialogDescription>
            Register an application to use catfederation as an OAuth2 provider.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            Name
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="My Application"
              required
              className="border border-gray-300 rounded-md"
            />
          </label>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton>Register</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { RegisterApplicationDialog };
