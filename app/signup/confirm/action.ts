"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateCred, generateSecureHash } from "@/helpers/crypto.helpers";
import { expired } from "@/helpers/time.helpers";
import { empty } from "@/helpers/utils.helpers";
import {
  deleteEmail2FAsByCred,
  getEmail2FAsExpiresAt,
} from "@/repositories/email2FA.repository";
import { createUser } from "@/repositories/user.repository";
import { setNewSessionCookies } from "@/helpers/session.helpers";
import { ROUTE_USER } from "@/constants/route.constants";

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

  const email2FAsExpiresAt = await getEmail2FAsExpiresAt({
    cred,
    challengeToken: fields.data.challengeToken,
  });

  if (empty(email2FAsExpiresAt)) {
    throw new Error("Invalid cred or challenge token");
  }

  const { expiresAt } = email2FAsExpiresAt[0];

  if (expired(expiresAt)) {
    throw new Error("Sign up attempt expired");
  }

  const hash = await generateSecureHash(fields.data.password);

  const user = await createUser({ cred, hash });
  deleteEmail2FAsByCred({ cred });

  setNewSessionCookies(user);
  redirect(ROUTE_USER);
}

export { handleSignupConfirm };
