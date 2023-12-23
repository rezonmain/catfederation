"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { TextInput, Card, Modal, Button } from "flowbite-react";
import { CgMail, CgKey } from "react-icons/cg";
import { SubmitButton } from "@/ui/submit-button";
import { useDisclosure } from "@/hooks/use-disclosure.hook";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { handleSignIn } from "./actions";
import { FieldMessage } from "@/ui/field-message";
import { handleSignUp } from "../signup/actions";

export default function SignInPage() {
  const [state, formAction] = useFormState(handleSignIn, { errors: {} });
  const { isOpen, close, open } = useDisclosure();

  useEffect(() => {
    if (state?.errors?.account) {
      open();
    }
  }, [state, open]);

  return (
    <>
      <main className="flex flex-col min-h-screen items-center justify-center w-full">
        <Card>
          <form className="flex flex-col gap-8" action={formAction}>
            <h1 className="tracking-wide text-3xl font-bold pb-6">
              Sign in to cat_federation
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
            </div>
            <SubmitButton color="dark">Submit</SubmitButton>
          </form>
        </Card>
      </main>
      <Modal show={isOpen} onClose={close} size="lg">
        <Modal.Header>New to cat_federation?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              No account found with email <em>{state?.fields?.email}</em>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Create new account?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <form action={handleSignUp}>
            <input
              name="email"
              value={state?.fields?.email}
              className="hidden"
            />
            <input
              name="password"
              value={state?.fields?.password}
              className="hidden"
            />
            <SubmitButton>Create new account</SubmitButton>
          </form>
          <Button color="gray" onClick={close}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
