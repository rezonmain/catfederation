"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateCred } from "@/helpers/crypto.helpers";
import { sendEmail } from "@/helpers/mail.helpers";
import { expired } from "@/helpers/time.helpers";
import { empty } from "@/helpers/utils.helpers";
import {
  createSignupAttemptEntry,
  getSignupAttemptsByCred,
} from "@/repositories/signupAttempt.repository";
import {
  generateSignupAttemptChallengeToken,
  generateSignupAttemptUrl,
  getSignupAttemptExpirationISODate,
} from "@/helpers/signupAttempt.helpers";
import { renderSignupAttemptTemplate } from "@/templates/signup_attempt.email";

const signupSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
});

async function handleSignup(fromData: FormData) {
  const fields = signupSchema.safeParse({
    email: fromData.get("email"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const cred = generateCred(fields.data.email);

  // TODO handle token expiration
  const accountCreations = await getSignupAttemptsByCred({ cred });

  if (!empty(accountCreations)) {
    if (expired(accountCreations[0].expiresAt)) {
      console.error("expired account creation token");
    } else {
      return; // handle accountCreation already exists and not expired error
    }
  }

  const challengeToken = generateSignupAttemptChallengeToken();
  const expiresAt = getSignupAttemptExpirationISODate();

  await createSignupAttemptEntry({
    cred,
    challengeToken,
    expiresAt,
  });

  const url = generateSignupAttemptUrl({
    ct: challengeToken,
    xat: expiresAt,
    e: fields.data.email,
  });

  const emailHtml = renderSignupAttemptTemplate(url);
  await sendEmail({
    to: fields.data.email,
    subject: "Welcome to the app",
    html: emailHtml,
  });

  // TODO confirm sending of email here
  redirect("/");
}

export { handleSignup };
