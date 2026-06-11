import { connectDB } from "@/lib/db/mongoose";
import { generateSecureToken, hashToken } from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/email/mailer";
import { verificationEmail } from "@/lib/email/templates";
import { jsonError, jsonSuccess, zodErrorResponse } from "@/lib/api/response";
import { getClientIp, rateLimit } from "@/lib/api/rateLimit";
import { resendVerificationSchema } from "@/lib/validation/authSchemas";
import { User } from "@/models/User";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`resend:${ip}`, 3, 60_000);
  if (!limit.allowed) {
    return jsonError("Too many requests. Try again later.", 429);
  }

  try {
    const body = await request.json();
    const parsed = resendVerificationSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { email } = parsed.data;

    await connectDB();
    const user = await User.findOne({ email });

    if (user && !user.emailVerified) {
      const verificationToken = generateSecureToken();
      user.emailVerificationTokenHash = hashToken(verificationToken);
      user.emailVerificationExpires = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();

      const emailContent = verificationEmail(user.name, verificationToken);
      await sendEmail({ to: email, ...emailContent });
    }

    return jsonSuccess({
      message:
        "If an unverified account exists, a verification email has been sent.",
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return jsonError("Unable to resend verification email", 500);
  }
}
