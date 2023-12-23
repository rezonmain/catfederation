"use server";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { generateHash, generateSecureHash } from "@/helpers/crypto.helpers";
import { createUser } from "@/repositories/user.repository";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, "Password must be at least 12 characters long"),
});

async function handleSignIn(_: { errors: {} }, fromData: FormData) {
  const fields = signInSchema.safeParse({
    email: fromData.get("email"),
    password: fromData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const hash = await generateSecureHash(fields.data.password);
  const cred = generateHash(fields.data.email);
  await createUser({ cred, hash });
  redirect("/");
}

export { handleSignIn };
