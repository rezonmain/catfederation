import { ApplicationRedirect, Application } from "@/db/schema";
import { empty } from "@/helpers/utils.helpers";
import { ServerAction } from "@/types/common.types";
import { CreateRedirectDialog } from "./create-redirect-dialog";
import { DeleteRedirectDialog } from "./delete-redirect-dialog";

type ApplicationRedirectProps = {
  createAction: ServerAction;
  deleteAction: ServerAction;
  redirects: ApplicationRedirect[];
  applicationName?: Application["name"];
};

const ApplicationRedirectField: React.FC<ApplicationRedirectProps> = ({
  createAction,
  deleteAction,
  redirects,
  applicationName = "",
}) => {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border p-4">
      <p className="uppercase tracking-wider">Redirects</p>
      {empty(redirects) ? (
        <p className="text-muted-foreground">
          No redirects URI&apos;s where found for this application
        </p>
      ) : (
        <ol>
          {redirects.map((redirect) => (
            <li key={redirect.id}>
              <div className="flex flex-row items-center gap-4">
                <span className="font-mono">{redirect.uri}</span>
                <DeleteRedirectDialog redirect={redirect} action={deleteAction}>
                  Delete
                </DeleteRedirectDialog>
              </div>
            </li>
          ))}
        </ol>
      )}
      <CreateRedirectDialog
        action={createAction}
        applicationName={applicationName}
      >
        Add redirect
      </CreateRedirectDialog>
    </div>
  );
};

export { ApplicationRedirectField };
