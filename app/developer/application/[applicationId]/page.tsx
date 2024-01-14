import { ApplicationDetailsForm } from "@/components/application-details-form";
import { auth } from "@/helpers/session.helpers";
import { getApplicationById } from "@/repositories/applications.repository";
import { handleEditApplicationDetails } from "./action";

export default async function ApplicationPage({
  params,
}: {
  params: { applicationId: string };
}) {
  auth();

  const application = await getApplicationById({
    applicationId: params.applicationId,
  });

  return (
    <main className="flex flex-col gap-6 p-24">
      <h1 className="uppercase tracking-wider">{application.name}</h1>
      <h2>General information</h2>
      <ApplicationDetailsForm
        application={application}
        action={handleEditApplicationDetails}
      />
    </main>
  );
}
