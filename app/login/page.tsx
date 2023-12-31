import { type Metadata } from "next/types";
import { SubmitButton } from "@/components/submit-button";
import { handleLogin } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { ROUTE_SIGNUP } from "@/constants/route.constants";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/link";

export const metadata: Metadata = {
  title: "catfederation | login",
  description: "log in into catfederation",
};

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
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <Input
        id="password"
        type="password"
        name="password"
        placeholder="Password"
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
