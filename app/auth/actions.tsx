"use server";
import { MIN_PASSWORD_LENGTH } from "@/constants/password.constants";
import { encrypt, generateSecureHash } from "@/helpers/crypto";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, "Password must be at least 12 characters long"),
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
  const cred = encrypt(fields.data.email);
  redirect("/");
}

export { handleSignIn };
