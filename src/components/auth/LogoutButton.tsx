"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import styles from "./LogoutButton.module.css";

export function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" className={styles.button} onClick={handleLogout}>
      Log Out
    </button>
  );
}
