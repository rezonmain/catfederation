import { type Metadata } from "next";
import { auth } from "@/helpers/session.helpers";
import { generateRandomUsername } from "@/helpers/users.helpers";
import { handleUpdateRandomUsername } from "./action";
import { UsersUpdateUsernameForm } from "@/components/users-update-username-form";
import { SubmitButton } from "@/components/submit-button";

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
      <form
        action={handleUpdateRandomUsername.bind(null, user.id)}
        className="py-4"
      >
        <input name="uname" type="hidden" value={generateRandomUsername()} />
        <SubmitButton variant="link" className="pl-0">
          Skip, choose a random one
        </SubmitButton>
      </form>
    </main>
  );
}
