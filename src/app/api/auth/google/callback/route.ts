import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db/mongoose";
import { buildSetCookieHeaders } from "@/lib/auth/cookies";
import {
  exchangeGoogleCode,
  fetchGoogleUserInfo,
  OAUTH_REDIRECT_COOKIE,
  OAUTH_STATE_COOKIE,
} from "@/lib/auth/google";
import { issueSessionTokens } from "@/lib/auth/session";
import { User } from "@/models/User";
import { env } from "@/lib/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const cookieStore = await cookies();
  const storedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value;
  const redirectTo = cookieStore.get(OAUTH_REDIRECT_COOKIE)?.value ?? "/account";

  cookieStore.delete(OAUTH_STATE_COOKIE);
  cookieStore.delete(OAUTH_REDIRECT_COOKIE);

  if (error || !code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL("/login?error=google_auth_failed", request.url),
    );
  }

  try {
    const tokenData = await exchangeGoogleCode(code);
    const profile = await fetchGoogleUserInfo(tokenData.access_token);

    if (!profile.email || !profile.verified_email) {
      return NextResponse.redirect(
        new URL("/login?error=google_email_unverified", request.url),
      );
    }

    const email = profile.email.toLowerCase();
    await connectDB();

    let user = await User.findOne({
      $or: [{ googleId: profile.id }, { email }],
    });

    if (user) {
      user.googleId = profile.id;
      user.authProvider = user.passwordHash ? user.authProvider : "google";
      user.emailVerified = true;
      if (profile.name) user.name = profile.name;
      if (env.adminEmail && email === env.adminEmail) {
        user.role = "admin";
      }
      await user.save();
    } else {
      user = await User.create({
        name: profile.name || email.split("@")[0],
        email,
        googleId: profile.id,
        authProvider: "google",
        emailVerified: true,
        role: env.adminEmail && email === env.adminEmail ? "admin" : "user",
      });
    }

    const { accessToken, refreshToken } = await issueSessionTokens(user);

    const response = NextResponse.redirect(new URL(redirectTo, request.url));
    for (const cookie of buildSetCookieHeaders(accessToken, refreshToken)) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(
      new URL("/login?error=google_auth_failed", request.url),
    );
  }
}
