import { redirect } from "next/navigation";
import { Link } from "@/components/link";
import { RegisterApplicationDialog } from "@/components/register-application-dialog";
import { auth } from "@/helpers/session.helpers";
import { developer } from "@/helpers/preference.helpers";
import {
  ROUTE_DEVELOPER_APPLICATION,
  ROUTE_USER,
} from "@/constants/route.constants";
import { getApplicationsByUserId } from "@/repositories/applications.repository";
import { fillDynamicPath } from "@/helpers/route.helpers";
import { handleRegisterApplication } from "./action";

export default async function DeveloperPage() {
  const { userId } = auth();
  const isDeveloper = developer();
  if (!isDeveloper) {
    redirect(ROUTE_USER);
  }

  const applications = await getApplicationsByUserId({ userId });

  return (
    <main className="flex flex-col items-center gap-4 p-24">
      <h1>Developer Page</h1>
      <RegisterApplicationDialog action={handleRegisterApplication}>
        New Application
      </RegisterApplicationDialog>
      <div>
        {applications.map((application) => (
          <div key={application.id}>
            <Link
              href={fillDynamicPath(ROUTE_DEVELOPER_APPLICATION, {
                applicationId: application.id,
              })}
            >
              {application.name}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
