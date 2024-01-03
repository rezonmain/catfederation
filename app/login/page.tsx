import { SubmitButton } from "@/ui/submit-button";
import { TextInput } from "flowbite-react";
import { CgMail, CgKey } from "react-icons/cg";
import { handleLogin } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import Link from "next/link";
import { ROUTE_SIGNUP } from "@/constants/route.constants";

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <LoginForm />
    </main>
  );
}

const LoginForm = () => {
  return (
    <form action={handleLogin} className="flex flex-col gap-4">
      <h1>Log in to catfederation</h1>
      <TextInput
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        icon={CgMail}
        required
      />
      <TextInput
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        icon={CgKey}
        minLength={PASSWORD_MIN_LENGTH}
        required
      />
      <SubmitButton>Log in</SubmitButton>
      <small>
        Don&apos;t have a cat federation account?{" "}
        <Link href={ROUTE_SIGNUP}>Click here to sign up</Link>
      </small>
    </form>
  );
};
