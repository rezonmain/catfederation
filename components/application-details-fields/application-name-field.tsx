import { z } from "zod";
import {
  APPLICATION_NAME_SCHEMA,
  APPLICATION_NAME_LENGTH,
} from "@/constants/applications.constants";
import { Input } from "@/components/ui/input";
import { type ApplicationDetailsFieldsProps } from "@/components/application-details-fields";
import { SubmitButton } from "@/components/submit-button";

type ApplicationName = z.infer<typeof APPLICATION_NAME_SCHEMA>;

const ApplicationNameField: React.FC<
  ApplicationDetailsFieldsProps<ApplicationName>
> = ({ action, name }) => {
  return (
    <form action={action}>
      <label className="text-base flex flex-row items-center justify-between gap-10 rounded-lg border p-4">
        <p className="uppercase tracking-wider">Name</p>
        <Input
          name="name"
          defaultValue={name}
          type="text"
          maxLength={APPLICATION_NAME_LENGTH}
          required
        />
        <SubmitButton variant="outline">Save name</SubmitButton>
      </label>
    </form>
  );
};

export { ApplicationNameField };
