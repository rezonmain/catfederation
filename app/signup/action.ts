"use server";
import { z } from "zod";
import { generateCred } from "@/helpers/crypto.helpers";
import { generateSignupConfirmUrl, sendEmail } from "@/helpers/mail.helpers";
import { expired } from "@/helpers/time.helpers";
import { empty } from "@/helpers/utils.helpers";
import {
  createEmail2FAEntry,
  getEmail2FAsByCred,
} from "@/repositories/email2FA.repository";
import {
  generateEmail2FAChallengeToken,
  getEmail2FAExpirationISODate,
} from "@/helpers/email2FA.helpers";
import { renderSignupConfirmTemplate } from "@/templates/signup-confirm.email";
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
  const email2FAs = await getEmail2FAsByCred({ cred });

  if (!empty(email2FAs)) {
    if (expired(email2FAs[0].expiresAt)) {
      throw new Error("Expired sign up attempt token");
    } else {
      throw new Error("A valid sign up attempt already exists");
    }
  }

  const challengeToken = generateEmail2FAChallengeToken();
  const expiresAt = getEmail2FAExpirationISODate();

  await createEmail2FAEntry({
    cred,
    challengeToken,
    expiresAt,
  });

  const url = generateSignupConfirmUrl({
    ct: challengeToken,
    xat: expiresAt,
    e: fields.data.email,
  });

  const emailHtml = renderSignupConfirmTemplate(url);

  await sendEmail({
    to: fields.data.email,
    subject: "Welcome to the app",
    html: emailHtml,
  });

  returnWithSearchParams<SignupPageSearchParams>({ es: "true" });
}

export { handleSignup };
