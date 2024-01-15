import {
  APPLICATION_DESCRIPTION_LENGTH,
  APPLICATION_DESCRIPTION_SCHEMA,
  APPLICATION_NAME_LENGTH,
  APPLICATION_NAME_SCHEMA,
} from "@/constants/applications.constants";
import { type ServerAction } from "@/types/common.types";
import { z } from "zod";
import { Input } from "./ui/input";
import { SubmitButton } from "./submit-button";
import { ApplicationRedirect } from "@/db/schema";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type ApplicationDetailsFieldsProps<T> = {
  action: ServerAction;
} & {
  [k in keyof T]: T[k];
};

type ApplicationName = z.infer<typeof APPLICATION_NAME_SCHEMA>;

const ApplicationNameField: React.FC<
  ApplicationDetailsFieldsProps<ApplicationName>
> = ({ action, name }) => {
  return (
    <form action={action}>
      <label className="text-base flex flex-row items-center justify-between gap-10 rounded-lg border p-4">
        <p className="uppercase tracking-wider">Name</p>
        <Input
          defaultValue={name}
          type="text"
          maxLength={APPLICATION_NAME_LENGTH}
        />
        <SubmitButton variant="link">Save name</SubmitButton>
      </label>
    </form>
  );
};

type ApplicationDescription = z.infer<typeof APPLICATION_DESCRIPTION_SCHEMA>;

const ApplicationDescriptionField: React.FC<
  ApplicationDetailsFieldsProps<ApplicationDescription>
> = ({ action, description }) => {
  return (
    <form action={action}>
      <label className="text-base flex flex-row items-center justify-between gap-10 rounded-lg border p-4">
        <p className="uppercase tracking-wider">Description</p>
        <Input
          defaultValue={description}
          type="text"
          maxLength={APPLICATION_DESCRIPTION_LENGTH}
        />
        <SubmitButton variant="link">Save description</SubmitButton>
      </label>
    </form>
  );
};

type ApplicationRedirectProps = {
  createAction: ServerAction;
  deleteAction: ServerAction;
  redirects: ApplicationRedirect[];
};

const ApplicationRedirectFields: React.FC<ApplicationRedirectProps> = ({
  createAction,
  deleteAction,
  redirects,
}) => {
  return (
    <div className="rounded-lg border p-4">
      <p className="uppercase tracking-wider">Redirects</p>
      <ol>
        {redirects.map((redirect) => (
          <li key={redirect.id}>
            <div className="flex flex-row gap-4 items-center">
              <span className="font-mono">{redirect.uri}</span>
              <DeleteRedirectDialog redirect={redirect} action={deleteAction}>
                Delete
              </DeleteRedirectDialog>
            </div>
          </li>
        ))}
      </ol>
      <form action={createAction}>
        <Input name="redirectUri" type="url" />
        <SubmitButton variant="link">Save redirect</SubmitButton>
      </form>
    </div>
  );
};

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
        <Button>{children}</Button>
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

export {
  ApplicationNameField,
  ApplicationDescriptionField,
  ApplicationRedirectFields,
};
