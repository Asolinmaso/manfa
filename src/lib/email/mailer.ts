import nodemailer from "nodemailer";
import { env } from "@/lib/env";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.emailUser,
        pass: env.emailPass,
      },
    });
  }
  return transporter;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  await getTransporter().sendMail({
    from: env.emailFrom,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}
