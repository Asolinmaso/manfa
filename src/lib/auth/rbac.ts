import { jsonError } from "@/lib/api/response";
import { getSessionWithUser, type SessionUser } from "@/lib/auth/session";

export async function requireAuth(): Promise<
  { user: SessionUser } | Response
> {
  const user = await getSessionWithUser();
  if (!user) {
    return jsonError("Authentication required", 401);
  }
  return { user };
}

export async function requireVerifiedEmail(): Promise<
  { user: SessionUser } | Response
> {
  const result = await requireAuth();
  if (result instanceof Response) return result;
  if (!result.user.emailVerified) {
    return jsonError("Email verification required", 403);
  }
  return result;
}

export async function requireRole(
  role: SessionUser["role"],
): Promise<{ user: SessionUser } | Response> {
  const result = await requireAuth();
  if (result instanceof Response) return result;
  if (result.user.role !== role) {
    return jsonError("Forbidden", 403);
  }
  return result;
}
