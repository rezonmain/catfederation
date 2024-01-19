"use client";
import { useFormState } from "react-dom";
import { handleUpdateApplicationSecret } from "@/app/developer/application/[applicationId]/actions";
import { type ServerAction } from "@/types/common.types";
import { ResetApplicationSecretDialog } from "@/components/reset-application-secret-dialog";
import { empty } from "@/helpers/utils.helpers";
import { ClipboardButton } from "../clipboard-button";

type ActionReturnType = ReturnType<typeof handleUpdateApplicationSecret>;

type ApplicationResetFieldProps = {
  action: ServerAction<ActionReturnType>;
};

const ApplicationResetField: React.FC<ApplicationResetFieldProps> = ({
  action,
}) => {
  const [secret, formAction] = useFormState<ActionReturnType>(action, "");

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-col gap-4">
        <p className="uppercase tracking-wider">Application secret</p>
        {empty(secret) ? null : (
          <div className="flex flex-col gap-4">
            <p className="text-small text-muted-foreground">
              Save it somewhere safe, we will not show it again!
            </p>
            <label className="flex cursor-pointer flex-row items-center justify-between rounded-lg border p-2">
              <code className="text-sm">{secret}</code>
              <ClipboardButton
                text={secret}
                toastMessage="Application secret copied to clipboard!"
              />
            </label>
          </div>
        )}
        <ResetApplicationSecretDialog
          action={formAction}
          className="self-start"
        >
          Reset secret
        </ResetApplicationSecretDialog>
      </div>
    </div>
  );
};

export { ApplicationResetField };
