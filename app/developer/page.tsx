import { RegisterApplicationDialog } from "@/components/register-application-dialog";
import { auth } from "@/helpers/session.helpers";
import { handleRegisterApplication } from "./action";

export default async function DeveloperPage() {
  const { userId } = auth();

  return (
    <main className="flex flex-col items-center gap-4 p-24">
      <h1>Developer Page</h1>
      <p>{userId}</p>
      <RegisterApplicationDialog action={handleRegisterApplication}>
        New Application
      </RegisterApplicationDialog>
    </main>
  );
}
