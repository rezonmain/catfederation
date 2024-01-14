import { type Application } from "@/db/schema";
import { Input } from "./ui/input";
import { ClipboardButton } from "./clipboard-button";

type ApplicationDetailsFormProps = {
  application: Application;
  action: (data: FormData) => Promise<unknown>;
};

const ApplicationDetailsForm: React.FC<ApplicationDetailsFormProps> = ({
  application,
  action,
}) => {
  return (
    <form action={action} className="flex flex-col gap-6">
      <label>
        <p className="uppercase tracking-wider">Name</p>
        <Input name="name" defaultValue={application.name} />
      </label>
      <label>
        <p className="uppercase tracking-wider">Description</p>
        <Input
          name="description"
          defaultValue={application.description ?? ""}
        />
      </label>
      <label className="cursor-pointer">
        <p className="uppercase tracking-wider">Application ID</p>
        <div className="flex flex-row gap-4 items-center">
          <span className="font-mono">{application.id}</span>
          <ClipboardButton
            text={application.id}
            toastMessage="Application ID copied to clipboard!"
          />
        </div>
      </label>
    </form>
  );
};

export { ApplicationDetailsForm };
