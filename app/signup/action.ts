"use server";
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
import { returnWithSearchParams } from "@/helpers/route.helpers";
import { type SignupPageSearchParams } from "./page";

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
  const signupAttempts = await getSignupAttemptsByCred({ cred });

  if (!empty(signupAttempts)) {
    if (expired(signupAttempts[0].expiresAt)) {
      throw new Error("Expired sign up attempt token");
    } else {
      throw new Error("A valid sign up attempt already exists");
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

  returnWithSearchParams<SignupPageSearchParams>({ es: "true" });
}

export { handleSignup };
