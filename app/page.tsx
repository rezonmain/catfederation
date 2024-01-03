import { redirect } from "next/navigation";
import { ROUTE_SIGNUP } from "@/constants/route.constants";
import { auth } from "@/helpers/session.helpers";
import { nil } from "@/helpers/utils.helpers";

export default function Home() {
  const { userId } = auth();

  if (nil(userId)) {
    redirect(ROUTE_SIGNUP);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>cat federation</h1>
      <p>{userId}</p>
    </main>
  );
}
