import { auth } from "@/helpers/session.helpers";

export default function UserPage() {
  const { userId } = auth();

  return (
    <main className="flex flex-col items-center gap-4 p-24">
      <h1>cat federation</h1>
      <p>{userId}</p>
    </main>
  );
}
