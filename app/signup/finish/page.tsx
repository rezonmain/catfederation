import { type Metadata } from "next";
import { auth } from "@/helpers/session.helpers";
import { UsersUpdateUsernameForm } from "@/components/users-update-username-form";

export const metadata: Metadata = {
  title: "catfederation | finish signup",
  description: "finish setting up your catfederation account",
};

export default function SignupFinishPage() {
  const user = auth();

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4">
      <h1 className="text-xl font-bold">Just one more thing...</h1>
      <UsersUpdateUsernameForm userId={user.id} />
    </main>
  );
}
