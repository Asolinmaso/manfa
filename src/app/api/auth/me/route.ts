import { requireAuth } from "@/lib/auth/rbac";
import { jsonSuccess } from "@/lib/api/response";

export async function GET() {
  const result = await requireAuth();
  if (result instanceof Response) return result;

  return jsonSuccess({
    user: result.user,
  });
}
