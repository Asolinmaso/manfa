import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import {
  buildClearCookieHeaders,
  getAccessTokenFromCookies,
} from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { invalidateUserSessions } from "@/lib/auth/session";

export async function POST() {
  try {
    const accessToken = await getAccessTokenFromCookies();
    if (accessToken) {
      const payload = await verifyAccessToken(accessToken);
      if (payload?.sub) {
        await connectDB();
        await invalidateUserSessions(payload.sub);
      }
    }

    const response = NextResponse.json({
      success: true,
      data: { message: "Logged out successfully" },
    });

    for (const cookie of buildClearCookieHeaders()) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    const response = NextResponse.json({
      success: true,
      data: { message: "Logged out" },
    });
    for (const cookie of buildClearCookieHeaders()) {
      response.headers.append("Set-Cookie", cookie);
    }
    return response;
  }
}
