"use client";
import { useFormState } from "react-dom";
import Link from "next/link";
import { TextInput, Card } from "flowbite-react";
import { CgMail, CgKey } from "react-icons/cg";
import { SubmitButton } from "@/ui/submit-button";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { handleSignUp } from "./actions";
import { FieldMessage } from "@/ui/field-message";

export default function SignUpPage() {
  const [state, formAction] = useFormState(handleSignUp, { errors: {} });

  return (
    <main className="flex flex-col min-h-screen items-center justify-center w-full">
      <Card>
        <form className="flex flex-col gap-8" action={formAction}>
          <h1 className="tracking-wide text-3xl font-bold pb-6">
            Create a new account for cat_federation
          </h1>
          <div className="flex flex-col gap-2">
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              icon={CgMail}
              required
            />
            <FieldMessage message={state?.errors?.email} />
          </div>
          <div className="flex flex-col gap-2">
            <TextInput
              className="flex-grow"
              icon={CgKey}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              minLength={PASSWORD_MIN_LENGTH}
              required
            />
            <FieldMessage message={state?.errors?.password} />
            <small className="text-gray-400">
              We strongly recommend using a password manager
            </small>
            <Link href="/signin">Sign in</Link>
          </div>
          <SubmitButton>Submit</SubmitButton>
        </form>
      </Card>
    </main>
  );
}