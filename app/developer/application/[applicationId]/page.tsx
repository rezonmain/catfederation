import { auth } from "@/helpers/session.helpers";
import { getApplicationById } from "@/repositories/applications.repository";

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
    <div>
      <h1 className="uppercase tracking-wider">{application.name}</h1>
      <p>{params.applicationId}</p>
    </div>
  );
}
