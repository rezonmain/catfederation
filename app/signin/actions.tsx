"use server";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { generateHash, verify } from "@/helpers/crypto.helpers";
import { empty } from "@/helpers/utils.helpers";
import { getHashByCred, getUsersByCred } from "@/repositories/user.repository";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, "Password must be at least 12 characters long"),
});

type SignInErrors = {
  email?: string[];
  password?: string[];
  account?: string[];
};

type SignInState = {
  errors: SignInErrors;
  fields?: {
    email: string;
    password: string;
  };
} | void;

async function handleSignIn(
  _: SignInState,
  fromData: FormData
): Promise<SignInState> {
  const fields = signInSchema.safeParse({
    email: fromData.get("email"),
    password: fromData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const cred = generateHash(fields.data.email);
  const users = await getUsersByCred({ cred });

  if (empty(users)) {
    return {
      errors: {
        account: ["User not found"],
      },
      fields: {
        email: fields.data.email,
        password: fields.data.password,
      },
    };
  }

  const userHash = await getHashByCred({ cred });

  if (await verify(userHash, fields.data.password)) {
    redirect("/");
  }

  return {
    errors: {
      password: ["Unable to login with provided credentials"],
    },
  };
}

export { handleSignIn };
