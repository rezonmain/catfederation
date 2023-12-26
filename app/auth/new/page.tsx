import { type Metadata } from "next/types";
import { empty } from "@/helpers/utils.helpers";
import { SubmitButton } from "@/ui/submit-button";
import { handleAccountCreation, handleNewAccount } from "./action";
import { TextInput } from "flowbite-react";
import { CgMail, CgKey } from "react-icons/cg";
import { AccountCreationUrlParams } from "@/types/auth.types";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";

export const metadata: Metadata = {
  title: "catfederation | new account",
  description: "Create a new cat federation account",
};

export default function NewAccountPage({
  searchParams,
}: {
  searchParams: Partial<AccountCreationUrlParams>;
}) {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      {empty(searchParams) ? (
        <NewAccountForm />
      ) : (
        <ChallengeForm
          email={searchParams.e!}
          challengeToken={searchParams.ct!}
        />
      )}
    </main>
  );
}

const NewAccountForm = () => {
  return (
    <form action={handleNewAccount} className="flex flex-col gap-4">
      <h1>Create new catfederation account</h1>
      <TextInput
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        icon={CgMail}
        required
      />
      <SubmitButton>Create account</SubmitButton>
      <small>
        By pressing the Create account button you will receive an email to the
        provided address with further instructions
      </small>
    </form>
  );
};

type ChallengeFormProps = {
  email: string;
  challengeToken: string;
};
const ChallengeForm: React.FC<ChallengeFormProps> = ({
  email,
  challengeToken,
}) => {
  return (
    <form action={handleAccountCreation} className="flex flex-col gap-4">
      <h1>New catfederation account</h1>
      <p>
        You are about to create a new account with <em>{email}</em>.
      </p>
      <input hidden name="email" value={email} />
      <input hidden name="challengeToken" value={challengeToken} />
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
