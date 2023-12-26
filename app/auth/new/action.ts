"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { APP_DOMAIN } from "@/constants/app.constants";
import { ROUTE_AUTH_NEW } from "@/constants/route.constants";
import {
  generateCred,
  generateAccountCreationChallengeToken,
} from "@/helpers/crypto.helpers";
import { AccountCreationUrlParams } from "@/types/auth.types";
import { renderAccountCreationTemplate } from "@/templates/account_creation.email";
import { sendEmail } from "@/helpers/mail.helpers";
import { createAccountCreationEntry } from "@/repositories/accountCreation.repository";
import { getAccountCreationExpirationISODate } from "@/helpers/time.helpers";

const signInSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
});

const generateAccountCreationUrl = (params: AccountCreationUrlParams) => {
  const url = new URL(`${APP_DOMAIN}${ROUTE_AUTH_NEW}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
};

async function handleNewAccount(fromData: FormData) {
  const fields = signInSchema.safeParse({
    email: fromData.get("email"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const cred = generateCred(fields.data.email);
  const challengeToken = generateAccountCreationChallengeToken();
  const expiresAt = getAccountCreationExpirationISODate();

  try {
    await createAccountCreationEntry({
      cred,
      challengeToken,
      expiresAt,
    });
  } catch {
    return;
  }

  const url = generateAccountCreationUrl({
    e: fields.data.email,
    ct: challengeToken,
    xat: expiresAt,
  });

  const emailHtml = renderAccountCreationTemplate(url);
  await sendEmail({
    to: fields.data.email,
    subject: "Welcome to the app",
    html: emailHtml,
  });
  redirect("/");
}

export { handleNewAccount };
