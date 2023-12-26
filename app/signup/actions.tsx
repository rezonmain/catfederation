"use server";
import { PASSWORD_MIN_LENGTH } from "@/constants/password.constants";
import { generateHash, generateSecureHash } from "@/helpers/crypto.helpers";
import { sendEmail } from "@/helpers/mail.helpers";
import { empty } from "@/helpers/utils.helpers";
import { createUser, getUsersByCred } from "@/repositories/user.repository";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, "Password must be at least 12 characters long"),
});

async function handleSignUp(_: unknown, fromData: FormData) {
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

  if (!empty(users)) {
    return {
      errors: {
        email: ["Account with this email already exists"],
      },
    };
  }

  const hash = await generateSecureHash(fields.data.password);
  // await createUser({ cred, hash });
  await sendEmail({
    to: fields.data.email,
    subject: "Welcome to the app",
    text: "Welcome to the app",
  });
  redirect("/");
}

export { handleSignUp };
