import { TextInput } from "flowbite-react";
import { CgKey } from "react-icons/cg";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { SignupAttemptUrlParams } from "@/types/auth.types";
import { SubmitButton } from "@/ui/submit-button";
import { handleSignupConfirm } from "./action";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "catfederation | new account",
  description: "Create a new cat federation account",
};

export default function SignupConfirmPage({
  searchParams,
}: {
  searchParams: Partial<SignupAttemptUrlParams>;
}) {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <SignupConfirmForm
        email={searchParams.e!}
        challengeToken={searchParams.ct!}
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
        You are about to create a new account with <em>{email}</em>.
      </p>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="challengeToken" value={challengeToken} />
      <TextInput
        id="password"
        name="password"
        type="password"
        minLength={PASSWORD_MIN_LENGTH}
        placeholder="New password"
        icon={CgKey}
        required
      />
      <small>We recommend using a password manager</small>
      <SubmitButton>Create account</SubmitButton>
    </form>
  );
};
