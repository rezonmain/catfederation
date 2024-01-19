import { z } from "zod";
import {
  APPLICATION_DESCRIPTION_LENGTH,
  APPLICATION_DESCRIPTION_SCHEMA,
} from "@/constants/applications.constants";
import { ApplicationDetailsFieldsProps } from "@/components/application-details-fields";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

type ApplicationDescription = z.infer<typeof APPLICATION_DESCRIPTION_SCHEMA>;

const ApplicationDescriptionField: React.FC<
  ApplicationDetailsFieldsProps<ApplicationDescription>
> = ({ action, description }) => {
  return (
    <form action={action}>
      <label className="flex flex-row items-center justify-between gap-10 rounded-lg border p-4 text-base">
        <p className="uppercase tracking-wider">Description</p>
        <Input
          name="description"
          defaultValue={description}
          type="text"
          maxLength={APPLICATION_DESCRIPTION_LENGTH}
        />
        <SubmitButton variant="outline">Save description</SubmitButton>
      </label>
    </form>
  );
};

export { ApplicationDescriptionField };
