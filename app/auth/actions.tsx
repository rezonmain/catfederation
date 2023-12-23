"use server";
import { MIN_PASSWORD_LENGTH } from "@/constants/password.constants";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, "Password must be at least 12 characters long"),
});

async function handleSignIn(_: unknown, fromData: FormData) {
  const fields = signInSchema.safeParse({
    email: fromData.get("email"),
    password: fromData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }
}

export { handleSignIn };
