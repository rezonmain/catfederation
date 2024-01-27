import { type Metadata } from "next/types";
import { SubmitButton } from "@/components/submit-button";
import { ROUTE_LOGIN } from "@/constants/route.constants";
import { handleSignup } from "./action";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/link";
import { params } from "@/helpers/route.helpers";

export const metadata: Metadata = {
  title: "catfederation | signup",
  description: "Sign up into catfederation",
};

export type SignupPageSearchParams = {
  es: "true";
};

export default function SignupPage({
  searchParams,
}: {
  searchParams: SignupPageSearchParams;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center">
      {searchParams.es ? (
        <SignupEmailConfirmNotice />
      ) : (
        <SignupForm searchParams={searchParams} />
      )}
    </main>
  );
}

const SignupForm = ({
  searchParams,
}: {
  searchParams: SignupPageSearchParams;
}) => {
  return (
    <form action={handleSignup} className="flex flex-col gap-4">
      <h1>Sign up to catfederation</h1>
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <SubmitButton>Sign up</SubmitButton>
      <small>
        By pressing the Sign up button you will receive an email to the provided
        address with further instructions
      </small>
      <hr />
      <small>
        Already have a cat federation account?{" "}
        <Link href={`${ROUTE_LOGIN}?${params(searchParams)}`}>
          Click here to log in
        </Link>
      </small>
    </form>
  );
};

const SignupEmailConfirmNotice = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Check your email</h1>
      <p>
        We sent you an email with a link to confirm your email address. Please
        check your inbox and click on the link provided.
      </p>
    </div>
  );
};
