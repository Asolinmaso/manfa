import { getSessionWithUser } from "@/lib/auth/session";
import type { AccountUser } from "@/data/accountContent";

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function sessionToAccountUser(user: {
  name: string;
  email: string;
}): AccountUser {
  return {
    name: user.name,
    email: user.email,
    contact: "—",
    defaultAddress: "—",
    initials: getInitials(user.name) || "U",
  };
}

export async function getAccountUserFromSession(): Promise<AccountUser | null> {
  const session = await getSessionWithUser();
  if (!session) return null;
  return sessionToAccountUser(session);
}
