import { type Metadata } from "next/types";
import { SubmitButton } from "@/components/submit-button";
import { handleLogin } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { ROUTE_SIGNUP } from "@/constants/route.constants";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/link";
import { params } from "@/helpers/route.helpers";
import { empty } from "@/helpers/utils.helpers";

export const metadata: Metadata = {
  title: "catfederation | login",
  description: "log in into catfederation",
};

type LoginPageSearchParams = {
  redirectTo?: string;
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: LoginPageSearchParams;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
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
        {empty(searchParams.redirectTo) ? null : (
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.redirectTo}
          />
        )}
        <SubmitButton>Log in</SubmitButton>
        <hr />
        <small>
          Don&apos;t have a cat federation account?{" "}
          <Link href={`${ROUTE_SIGNUP}?${params(searchParams)}`}>
            Click here to sign up
          </Link>
        </small>
      </form>
    </main>
  );
}
