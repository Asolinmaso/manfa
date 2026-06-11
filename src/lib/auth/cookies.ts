import { cookies } from "next/headers";
import {
  ACCESS_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/lib/auth/jwt";
import { env } from "@/lib/env";

const baseCookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "lax" as const,
  path: "/",
};

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE, accessToken, {
    ...baseCookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  cookieStore.set(REFRESH_COOKIE, refreshToken, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: "/api/auth/refresh",
  });
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE, "", { ...baseCookieOptions, maxAge: 0 });
  cookieStore.set(REFRESH_COOKIE, "", {
    ...baseCookieOptions,
    maxAge: 0,
    path: "/api/auth/refresh",
  });
}

export async function getAccessTokenFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_COOKIE)?.value;
}

export async function getRefreshTokenFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_COOKIE)?.value;
}

export function buildSetCookieHeaders(
  accessToken: string,
  refreshToken: string,
): string[] {
  const secure = env.isProduction ? "; Secure" : "";
  const access = `${ACCESS_COOKIE}=${accessToken}; HttpOnly; Path=/; Max-Age=${ACCESS_TOKEN_MAX_AGE}; SameSite=Lax${secure}`;
  const refresh = `${REFRESH_COOKIE}=${refreshToken}; HttpOnly; Path=/api/auth/refresh; Max-Age=${REFRESH_TOKEN_MAX_AGE}; SameSite=Lax${secure}`;
  return [access, refresh];
}

export function buildClearCookieHeaders(): string[] {
  const secure = env.isProduction ? "; Secure" : "";
  const access = `${ACCESS_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  const refresh = `${REFRESH_COOKIE}=; HttpOnly; Path=/api/auth/refresh; Max-Age=0; SameSite=Lax${secure}`;
  return [access, refresh];
}
