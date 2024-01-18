import {
  ApplicationDescriptionField,
  ApplicationNameField,
  ApplicationRedirectField,
} from "@/components/application-details-fields";
import { auth } from "@/helpers/session.helpers";
import { getApplicationById } from "@/repositories/applications.repository";
import { handleDeleteApplicationRedirect } from "./actions";
import { ClipboardButton } from "@/components/clipboard-button";
import { getApplicationRedirects } from "@/repositories/applicationRedirects.repository";
import { DeleteApplicationDialog } from "@/components/delete-application-dialog";
import { getApplicationPageActions } from "@/helpers/applications.helpers";

export default async function ApplicationPage({
  params,
}: {
  params: { applicationId: string };
}) {
  auth();

  const [application, redirects] = await Promise.all([
    getApplicationById({ applicationId: params.applicationId }),
    getApplicationRedirects({ applicationId: params.applicationId }),
  ]);

  const actions = getApplicationPageActions(application.id);

  return (
    <main className="flex flex-col gap-6 p-24">
      <h1 className="uppercase tracking-wider text-xl">{application.name}</h1>
      <h2>OAuth information</h2>
      <ApplicationNameField
        action={actions.editName}
        name={application.name ?? ""}
      />
      <ApplicationDescriptionField
        action={actions.editDescription}
        description={application.description ?? ""}
      />
      <label className="cursor-pointer rounded-lg border p-4">
        <div className="flex flex-row gap-4 items-center">
          <p className="uppercase tracking-wider">Application ID</p>
          <span className="font-mono">{application.id}</span>
          <div className="flex-grow text-right">
            <ClipboardButton
              text={application.id}
              toastMessage="Application ID copied to clipboard!"
            />
          </div>
        </div>
      </label>
      <ApplicationRedirectField
        createAction={actions.createRedirect}
        deleteAction={handleDeleteApplicationRedirect}
        applicationName={application.name}
        redirects={redirects}
      />
      <DeleteApplicationDialog
        action={actions.deleteApplication}
        applicationName={application.name}
        className="self-start"
      >
        Delete application
      </DeleteApplicationDialog>
    </main>
  );
}
