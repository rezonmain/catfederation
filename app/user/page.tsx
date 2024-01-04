import { handleLogout } from "actions";
import { LogoutButton } from "@/components/logout-button";

export default function UserPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1>cat federation</h1>
      <p>user id</p>
      <LogoutButton action={handleLogout} />
    </main>
  );
}
