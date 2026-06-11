import { connectDB } from "@/lib/db/mongoose";
import { generateSecureToken, hashToken } from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/email/mailer";
import { passwordResetEmail } from "@/lib/email/templates";
import { jsonError, jsonSuccess, zodErrorResponse } from "@/lib/api/response";
import { getClientIp, rateLimit } from "@/lib/api/rateLimit";
import { forgotPasswordSchema } from "@/lib/validation/authSchemas";
import { User } from "@/models/User";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`forgot:${ip}`, 5, 60_000);
  if (!limit.allowed) {
    return jsonError("Too many requests. Try again later.", 429);
  }

  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { email } = parsed.data;

    await connectDB();
    const user = await User.findOne({ email });

    if (user?.passwordHash) {
      const resetToken = generateSecureToken();
      user.passwordResetTokenHash = hashToken(resetToken);
      user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();

      const emailContent = passwordResetEmail(user.name, resetToken);
      await sendEmail({ to: email, ...emailContent });
    }

    return jsonSuccess({
      message:
        "If an account exists for that email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return jsonError("Unable to process request", 500);
  }
}
