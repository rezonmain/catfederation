import { type Metadata } from "next/types";
import { SubmitButton } from "@/ui/submit-button";
import { TextInput } from "flowbite-react";
import { CgMail } from "react-icons/cg";
import { handleSignup } from "./action";

export const metadata: Metadata = {
  title: "catfederation | signup",
  description: "Sign up into catfederation",
};

export default function SignupPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <NewAccountForm />
    </main>
  );
}

const NewAccountForm = () => {
  return (
    <form action={handleSignup} className="flex flex-col gap-4">
      <h1>Sign up to catfederation</h1>
      <TextInput
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        icon={CgMail}
        required
      />
      <SubmitButton>Sign up</SubmitButton>
      <small>
        By pressing the Sign up button you will receive an email to the provided
        address with further instructions
      </small>
    </form>
  );
};
