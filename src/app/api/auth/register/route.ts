import { connectDB } from "@/lib/db/mongoose";
import { hashPassword } from "@/lib/auth/password";
import { generateSecureToken, hashToken } from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/email/mailer";
import { verificationEmail } from "@/lib/email/templates";
import { jsonError, jsonSuccess, zodErrorResponse } from "@/lib/api/response";
import { getClientIp, rateLimit } from "@/lib/api/rateLimit";
import { registerSchema } from "@/lib/validation/authSchemas";
import { User } from "@/models/User";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`register:${ip}`, 5, 60_000);
  if (!limit.allowed) {
    return jsonError("Too many requests. Try again later.", 429);
  }

  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { name, email, password } = parsed.data;

    await connectDB();
    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.googleId && !existing.passwordHash) {
        return jsonError(
          "This email is registered with Google. Please sign in with Google.",
          409,
        );
      }
      return jsonError("An account with this email already exists", 409);
    }

    const verificationToken = generateSecureToken();
    const role =
      env.adminEmail && email === env.adminEmail ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      passwordHash: await hashPassword(password),
      authProvider: "email",
      role,
      emailVerified: false,
      emailVerificationTokenHash: hashToken(verificationToken),
      emailVerificationExpires: new Date(Date.now() + 60 * 60 * 1000),
    });

    const emailContent = verificationEmail(name, verificationToken);
    await sendEmail({
      to: email,
      ...emailContent,
    });

    return jsonSuccess(
      {
        message: "Account created. Please verify your email.",
        userId: user._id.toString(),
      },
      201,
    );
  } catch (error) {
    console.error("Register error:", error);
    return jsonError("Unable to create account", 500);
  }
}
