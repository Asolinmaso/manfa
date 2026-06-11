import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { env } from "@/lib/env";
import type { UserRole } from "@/models/User";

export const ACCESS_COOKIE = "manfa_access";
export const REFRESH_COOKIE = "manfa_refresh";

export const ACCESS_TOKEN_TTL = "15m";
export const REFRESH_TOKEN_TTL = "7d";
export const ACCESS_TOKEN_MAX_AGE = 15 * 60;
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export interface AccessTokenPayload extends JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
}

export interface RefreshTokenPayload extends JWTPayload {
  sub: string;
  jti: string;
}

function getAccessSecret() {
  return new TextEncoder().encode(env.jwtAccessSecret);
}

function getRefreshSecret() {
  return new TextEncoder().encode(env.jwtRefreshSecret);
}

export async function signAccessToken(payload: {
  userId: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
}): Promise<string> {
  return new SignJWT({
    email: payload.email,
    role: payload.role,
    emailVerified: payload.emailVerified,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_TTL)
    .sign(getAccessSecret());
}

export async function signRefreshToken(payload: {
  userId: string;
  jti: string;
}): Promise<string> {
  return new SignJWT({ jti: payload.jti })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_TTL)
    .sign(getRefreshSecret());
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    if (!payload.sub) return null;
    return payload as AccessTokenPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string,
): Promise<RefreshTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getRefreshSecret());
    if (!payload.sub || !payload.jti) return null;
    return payload as RefreshTokenPayload;
  } catch {
    return null;
  }
}
