"use server";
import { redirect } from "next/navigation";
import { generateCred, verify } from "@/helpers/crypto.helpers";
import { empty } from "@/helpers/utils.helpers";
import { getUsersByCred } from "@/repositories/user.repository";
import { setNewSessionCookies } from "@/helpers/session.helpers";
import { ROUTE_USER } from "@/constants/route.constants";
import { LOGIN_SCHEMA } from "@/constants/login.constants";

async function handleLogin(formData: FormData) {
  const fields = LOGIN_SCHEMA.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: formData.get("redirectTo"),
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
  const user = users[0];
  const hasValidCredentials = verify({
    password: fields.data.password,
    hash: user.hash,
  });

  if (!hasValidCredentials) {
    // invalid password
    throw new Error("Generic authentication error");
  }

  setNewSessionCookies(user);

  if (empty(fields.data.redirectTo)) {
    redirect(ROUTE_USER);
  }

  redirect(fields.data.redirectTo);
}

export { handleLogin };
