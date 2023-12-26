import { SubmitButton } from "@/ui/submit-button";
import { handleNewAccount } from "./action";
import { TextInput } from "flowbite-react";
import { CgMail } from "react-icons/cg";
import { AccountCreationUrlParams } from "@/types/auth.types";

export default function NewAccountPage({
  searchParams,
}: {
  searchParams: AccountCreationUrlParams;
}) {
  console.log(searchParams);
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <form action={handleNewAccount} className="flex flex-col gap-4">
        <h1>Create new cat_federation account</h1>
        <TextInput
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          icon={CgMail}
          required
        />
        <SubmitButton>Create account</SubmitButton>
        <small>You will receive an email with further instructions</small>
      </form>
    </main>
  );
}
