import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  buildGoogleAuthUrl,
  generateOAuthState,
  oauthCookieOptions,
  OAUTH_REDIRECT_COOKIE,
  OAUTH_STATE_COOKIE,
} from "@/lib/auth/google";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirect = searchParams.get("redirect") ?? "/account";
  const safeRedirect =
    redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/account";

  const state = generateOAuthState();
  const cookieStore = await cookies();
  const options = oauthCookieOptions();

  cookieStore.set(OAUTH_STATE_COOKIE, state, options);
  cookieStore.set(OAUTH_REDIRECT_COOKIE, safeRedirect, options);

  return NextResponse.redirect(buildGoogleAuthUrl(state));
}
