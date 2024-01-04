import { type Metadata } from "next";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { SubmitButton } from "@/components/submit-button";
import { handleSignupConfirm } from "./action";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "catfederation | new account",
  description: "Create a new cat federation account",
};

export type SignupConfirmSearchParams = {
  e: string; // email
  ct: string; // challenge token
  xat: string; // expiration date
};

export default function SignupConfirmPage({
  searchParams,
}: {
  searchParams: SignupConfirmSearchParams;
}) {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center max-w-sm mx-auto">
      <SignupConfirmForm
        email={searchParams.e}
        challengeToken={searchParams.ct}
      />
    </main>
  );
}

type SignupConfirmFormProps = {
  email: string;
  challengeToken: string;
};
const SignupConfirmForm: React.FC<SignupConfirmFormProps> = ({
  email,
  challengeToken,
}) => {
  return (
    <form action={handleSignupConfirm} className="flex flex-col gap-4">
      <h1>New catfederation account</h1>
      <p>
        You are about to create a new account with <b>{email}</b>.
      </p>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="challengeToken" value={challengeToken} />
      <Input
        id="password"
        name="password"
        type="password"
        minLength={PASSWORD_MIN_LENGTH}
        placeholder="New password"
        required
      />
      <small>We recommend using a password manager</small>
      <SubmitButton>Create account</SubmitButton>
    </form>
  );
};
