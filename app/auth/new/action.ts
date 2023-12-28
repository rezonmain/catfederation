"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateCred, generateSecureHash } from "@/helpers/crypto.helpers";
import { renderAccountCreationTemplate } from "@/templates/account_creation.email";
import { sendEmail } from "@/helpers/mail.helpers";
import {
  getAccountCreationsByCred,
  createAccountCreationEntry,
  getAccountCreationExpiresAt,
  deleteAccountCreationsByCred,
} from "@/repositories/accountCreation.repository";
import { expired } from "@/helpers/time.helpers";
import { empty } from "@/helpers/utils.helpers";
import { createUser } from "@/repositories/user.repository";
import {
  getAccountCreationExpirationISODate,
  generateAccountCreationChallengeToken,
  generateAccountCreationUrl,
} from "@/helpers/accountCreations.helpers";

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

  // TODO handle token expiration
  const accountCreations = await getAccountCreationsByCred({ cred });
  console.log(accountCreations);

  if (!empty(accountCreations)) {
    if (expired(accountCreations[0].expiresAt)) {
      console.log("expired account creation token");
    } else {
      return; // handle accountCreation already exists and not expired error
    }
  }

  const challengeToken = generateAccountCreationChallengeToken();
  const expiresAt = getAccountCreationExpirationISODate();

  await createAccountCreationEntry({
    cred,
    challengeToken,
    expiresAt,
  });

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
  const accountCreations = await getAccountCreationExpiresAt({
    cred,
    challengeToken: fields.data.challengeToken,
  });

  if (empty(accountCreations)) {
    throw new Error("Invalid cred or challenge token");
  }

  const { expiresAt } = accountCreations[0];

  if (expired(expiresAt)) {
    throw new Error("Account creation token expired");
  }

  const hash = await generateSecureHash(fields.data.password);

  await createUser({ cred, hash });
  await deleteAccountCreationsByCred({ cred });
  redirect("/");
}

export { handleNewAccount, handleAccountCreation };
