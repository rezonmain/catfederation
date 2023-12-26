import {
  MAIL_FROM_EMAIL,
  MAIL_HOST,
  MAIL_PORT,
} from "@/constants/mail.constants";
import nodemailer from "nodemailer";

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

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: MAIL_FROM_EMAIL,
    ...data,
  });
};
