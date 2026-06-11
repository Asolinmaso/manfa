import { connectDB } from "@/lib/db/mongoose";
import {
  getAccessTokenFromCookies,
  getRefreshTokenFromCookies,
} from "@/lib/auth/cookies";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/auth/jwt";
import { hashToken, generateSecureToken } from "@/lib/auth/tokens";
import { User, type IUser, type UserRole } from "@/models/User";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
};

export async function getSession(): Promise<SessionUser | null> {
  const accessToken = await getAccessTokenFromCookies();
  if (!accessToken) return null;

  const payload = await verifyAccessToken(accessToken);
  if (!payload?.sub) return null;

  return {
    id: payload.sub,
    name: "",
    email: payload.email as string,
    role: payload.role as UserRole,
    emailVerified: Boolean(payload.emailVerified),
  };
}

export async function getSessionWithUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;

  await connectDB();
  const user = await User.findById(session.id).select("name email role emailVerified");
  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
  };
}

export async function issueSessionTokens(user: IUser): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const jti = generateSecureToken();
  const refreshToken = await signRefreshToken({
    userId: user._id.toString(),
    jti,
  });

  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();

  const accessToken = await signAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
  });

  return { accessToken, refreshToken };
}

export async function refreshSessionFromCookie(): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> {
  const refreshToken = await getRefreshTokenFromCookies();
  if (!refreshToken) return null;

  const payload = await verifyRefreshToken(refreshToken);
  if (!payload?.sub) return null;

  await connectDB();
  const user = await User.findById(payload.sub);
  if (!user || !user.refreshTokenHash || !user.refreshTokenExpires) return null;
  if (user.refreshTokenExpires < new Date()) return null;
  if (user.refreshTokenHash !== hashToken(refreshToken)) return null;

  return issueSessionTokens(user);
}

export async function invalidateUserSessions(userId: string): Promise<void> {
  await connectDB();
  await User.findByIdAndUpdate(userId, {
    $unset: { refreshTokenHash: 1, refreshTokenExpires: 1 },
  });
}
