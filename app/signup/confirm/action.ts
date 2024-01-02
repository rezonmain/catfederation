"use server";
import { generateCred, generateSecureHash } from "@/helpers/crypto.helpers";
import { expired } from "@/helpers/time.helpers";
import { empty } from "@/helpers/utils.helpers";
import {
  deleteSignupAttemptsByCred,
  getSignupAttemptsExpiresAt,
} from "@/repositories/signupAttempt.repository";
import { createUser } from "@/repositories/user.repository";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupConfirmSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  challengeToken: z.string(),
});

async function handleSignupConfirm(formData: FormData) {
  const fields = signupConfirmSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    challengeToken: formData.get("challengeToken"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const cred = generateCred(fields.data.email);
  const signupAttemptsExpiresAt = await getSignupAttemptsExpiresAt({
    cred,
    challengeToken: fields.data.challengeToken,
  });

  if (empty(signupAttemptsExpiresAt)) {
    throw new Error("Invalid cred or challenge token");
  }

  const { expiresAt } = signupAttemptsExpiresAt[0];

  if (expired(expiresAt)) {
    throw new Error("Account creation token expired");
  }

  const hash = await generateSecureHash(fields.data.password);

  await createUser({ cred, hash });
  await deleteSignupAttemptsByCred({ cred });
  redirect("/");
}

export { handleSignupConfirm };