"use server";
import { redirect } from "next/navigation";
import { generateCred, verify } from "@/helpers/crypto.helpers";
import { empty } from "@/helpers/utils.helpers";
import { getUsersByCred } from "@/repositories/user.repository";
import { setNewSessionCookies } from "@/helpers/session.helpers";
import { ROUTE_USER } from "@/constants/route.constants";
import { LOGIN_SCHEMA } from "@/constants/login.constants";
import { getLoginOAuth2RedirectURL } from "@/helpers/oauth2.helpers";

async function handleLogin(formData: FormData) {
  const fields = LOGIN_SCHEMA.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    applicationId: formData.get("applicationId"),
    redirectParams: formData.get("redirectParams"),
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

  const { id } = users[0];
  setNewSessionCookies({ userId: id });

  // No OAuth 2 redirect
  if (empty(fields.data.applicationId)) {
    redirect(ROUTE_USER);
  }

  redirect(
    getLoginOAuth2RedirectURL({
      applicationId: fields.data.applicationId!,
      redirectParams: fields.data.redirectParams!,
    }),
  );
}

export { handleLogin };
