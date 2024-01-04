import nodemailer from "nodemailer";
import { type SignupConfirmSearchParams } from "@/app/signup/confirm/page";
import {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_FROM_EMAIL,
} from "@/constants/mail.constants";
import { APP_DOMAIN } from "@/constants/app.constants";
import { ROUTE_SIGNUP_CONFIRM } from "@/constants/route.constants";

type EmailPayload = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

const smtpOptions = {
  host: MAIL_HOST,
  port: MAIL_PORT,
};

const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: MAIL_FROM_EMAIL,
    ...data,
  });
};

const generateSignupConfirmUrl = (params: SignupConfirmSearchParams) => {
  const url = new URL(`${APP_DOMAIN}${ROUTE_SIGNUP_CONFIRM}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
};

export { sendEmail, generateSignupConfirmUrl };
