import { connectDB } from "@/lib/db/mongoose";
import { hashPassword } from "@/lib/auth/password";
import { hashToken } from "@/lib/auth/tokens";
import { invalidateUserSessions } from "@/lib/auth/session";
import { jsonError, jsonSuccess, zodErrorResponse } from "@/lib/api/response";
import { getClientIp, rateLimit } from "@/lib/api/rateLimit";
import { resetPasswordSchema } from "@/lib/validation/authSchemas";
import { User } from "@/models/User";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`reset:${ip}`, 5, 60_000);
  if (!limit.allowed) {
    return jsonError("Too many requests. Try again later.", 429);
  }

  try {
    const body = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { token, password } = parsed.data;
    const tokenHash = hashToken(token);

    await connectDB();
    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return jsonError("Invalid or expired reset token", 400);
    }

    user.passwordHash = await hashPassword(password);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    await invalidateUserSessions(user._id.toString());

    return jsonSuccess({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return jsonError("Unable to reset password", 500);
  }
}
