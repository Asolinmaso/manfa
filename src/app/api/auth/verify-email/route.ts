import { connectDB } from "@/lib/db/mongoose";
import { hashToken } from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/email/mailer";
import { welcomeEmail } from "@/lib/email/templates";
import { jsonError, jsonSuccess, zodErrorResponse } from "@/lib/api/response";
import { verifyEmailSchema } from "@/lib/validation/authSchemas";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = verifyEmailSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { token } = parsed.data;
    const tokenHash = hashToken(token);

    await connectDB();
    const user = await User.findOne({
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return jsonError("Invalid or expired verification token", 400);
    }

    user.emailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    const welcome = welcomeEmail(user.name);
    await sendEmail({ to: user.email, ...welcome }).catch(() => undefined);

    return jsonSuccess({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify email error:", error);
    return jsonError("Unable to verify email", 500);
  }
}
