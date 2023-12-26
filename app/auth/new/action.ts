"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { APP_DOMAIN } from "@/constants/app.constants";
import { ROUTE_AUTH_NEW } from "@/constants/route.constants";
import {
  generateCred,
  generateAccountCreationChallengeToken,
  generateSecureHash,
} from "@/helpers/crypto.helpers";
import { AccountCreationUrlParams } from "@/types/auth.types";
import { renderAccountCreationTemplate } from "@/templates/account_creation.email";
import { sendEmail } from "@/helpers/mail.helpers";
import {
  createAccountCreationEntry,
  deleteAccountCreationsByCred,
  getAccountCreation,
} from "@/repositories/accountCreation.repository";
import {
  ISONow,
  getAccountCreationExpirationISODate,
} from "@/helpers/time.helpers";
import { empty } from "@/helpers/utils.helpers";
import { createUser } from "@/repositories/user.repository";

const signInSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
});

const createAccountSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  challengeToken: z.string(),
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

async function handleAccountCreation(formData: FormData) {
  const fields = createAccountSchema.safeParse({
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
  const accountCreations = await getAccountCreation({
    cred,
    challengeToken: fields.data.challengeToken,
  });

  if (empty(accountCreations)) {
    return; // handle invalid credentials error
  }

  const accountCreation = accountCreations[0];

  if (accountCreation.expiresAt <= ISONow()) {
    return; // handle expiration error
  }

  const hash = await generateSecureHash(fields.data.password);

  await createUser({ cred, hash });
  await deleteAccountCreationsByCred({ cred });
}

export { handleNewAccount, handleAccountCreation };
