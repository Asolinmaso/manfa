import { NextResponse } from "next/server";
import { buildSetCookieHeaders } from "@/lib/auth/cookies";
import { refreshSessionFromCookie } from "@/lib/auth/session";
import { jsonError } from "@/lib/api/response";

export async function POST() {
  try {
    const tokens = await refreshSessionFromCookie();
    if (!tokens) {
      return jsonError("Invalid or expired refresh token", 401);
    }

    const response = NextResponse.json({
      success: true,
      data: { message: "Token refreshed" },
    });

    for (const cookie of buildSetCookieHeaders(
      tokens.accessToken,
      tokens.refreshToken,
    )) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Refresh error:", error);
    return jsonError("Unable to refresh session", 500);
  }
}
