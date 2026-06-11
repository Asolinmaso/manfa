import { connectDB } from "@/lib/db/mongoose";
import { verifyPassword } from "@/lib/auth/password";
import { buildSetCookieHeaders } from "@/lib/auth/cookies";
import { issueSessionTokens } from "@/lib/auth/session";
import { jsonError, zodErrorResponse } from "@/lib/api/response";
import { getClientIp, rateLimit } from "@/lib/api/rateLimit";
import { loginSchema } from "@/lib/validation/authSchemas";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`login:${ip}`, 10, 60_000);
  if (!limit.allowed) {
    return jsonError("Too many login attempts. Try again later.", 429);
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { email, password } = parsed.data;

    await connectDB();
    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return jsonError(
        user?.googleId
          ? "This account uses Google sign-in"
          : "Invalid email or password",
        401,
      );
    }
    if (!(await verifyPassword(password, user.passwordHash))) {
      return jsonError("Invalid email or password", 401);
    }

    if (!user.emailVerified) {
      return jsonError(
        "Please verify your email before logging in",
        403,
      );
    }

    const { accessToken, refreshToken } = await issueSessionTokens(user);

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
        },
      },
    });

    for (const cookie of buildSetCookieHeaders(accessToken, refreshToken)) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return jsonError("Unable to log in", 500);
  }
}
