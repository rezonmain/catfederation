"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateCred, verify } from "@/helpers/crypto.helpers";
import { empty } from "@/helpers/utils.helpers";
import { getUsersByCred } from "@/repositories/user.repository";

const loginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

async function handleLogin(formData: FormData) {
  const fields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const cred = generateCred(fields.data.email);
  const users = await getUsersByCred({ cred });

  if (empty(users)) {
    // user not found
    throw new Error("Generic authentication error");
  }
  const { hash } = users[0];
  const hasValidCredentials = verify({ password: fields.data.password, hash });

  if (!hasValidCredentials) {
    // invalid password
    throw new Error("Generic authentication error");
  }

  redirect("/");
}

export { handleLogin };
