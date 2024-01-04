import { handleLogout } from "actions";
import { LogoutButton } from "@/components/logout-button";
import { auth } from "@/helpers/session.helpers";

export default function UserPage() {
  const { userId } = auth();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1>cat federation</h1>
      <p>{userId}</p>
      <LogoutButton action={handleLogout} />
    </main>
  );
}
