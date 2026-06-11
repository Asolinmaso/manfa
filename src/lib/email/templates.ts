import { env } from "@/lib/env";

function layout(content: string): string {
  return `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #141414;">
      <h1 style="font-family: 'DM Serif Display', Georgia, serif; color: #47161A; font-size: 28px;">manfa</h1>
      ${content}
      <p style="margin-top: 32px; font-size: 14px; color: #666;">If you did not request this email, you can safely ignore it.</p>
    </div>
  `;
}

export function verificationEmail(name: string, token: string) {
  const url = `${env.appUrl}/verify-email/${token}`;
  return {
    subject: "Verify your Manfa account",
    text: `Hi ${name},\n\nVerify your email: ${url}\n\nThis link expires in 1 hour.`,
    html: layout(`
      <p>Hi ${name},</p>
      <p>Thanks for joining Manfa. Please verify your email address to continue.</p>
      <p><a href="${url}" style="display:inline-block;padding:12px 24px;background:#47161A;color:#F7F1EC;text-decoration:none;">Verify Email</a></p>
      <p style="font-size:14px;">Or copy this link: ${url}</p>
    `),
  };
}

export function passwordResetEmail(name: string, token: string) {
  const url = `${env.appUrl}/reset-password/${token}`;
  return {
    subject: "Reset your Manfa password",
    text: `Hi ${name},\n\nReset your password: ${url}\n\nThis link expires in 1 hour.`,
    html: layout(`
      <p>Hi ${name},</p>
      <p>We received a request to reset your password.</p>
      <p><a href="${url}" style="display:inline-block;padding:12px 24px;background:#47161A;color:#F7F1EC;text-decoration:none;">Reset Password</a></p>
      <p style="font-size:14px;">Or copy this link: ${url}</p>
    `),
  };
}

export function welcomeEmail(name: string) {
  return {
    subject: "Welcome to Manfa",
    text: `Hi ${name},\n\nYour email is verified. Welcome to Manfa!`,
    html: layout(`
      <p>Hi ${name},</p>
      <p>Your email is verified. Welcome to Manfa — wear the change.</p>
      <p><a href="${env.appUrl}/shop" style="display:inline-block;padding:12px 24px;background:#47161A;color:#F7F1EC;text-decoration:none;">Shop Now</a></p>
    `),
  };
}
