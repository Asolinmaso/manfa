"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthAlert } from "@/components/auth/AuthAlert";
import styles from "@/components/auth/authForm.module.css";
import alertStyles from "@/components/auth/AuthAlert.module.css";

type VerifyEmailTokenFormProps = {
  token: string;
};

export function VerifyEmailTokenForm({ token }: VerifyEmailTokenFormProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const json = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(json.data?.message ?? "Email verified successfully!");
        } else {
          setStatus("error");
          setMessage(json.message ?? "Verification failed");
        }
      } catch {
        setStatus("error");
        setMessage("Unable to verify email. Please try again.");
      }
    }

    void verify();
  }, [token]);

  return (
    <AuthLayout>
      <div className={styles.form}>
        <div className={styles.header}>
          <h1 className={styles.title}>Email Verification</h1>
        </div>

        {status === "loading" ? (
          <div className={alertStyles.loading}>
            <span className={alertStyles.spinner} aria-hidden />
            <span>{message}</span>
          </div>
        ) : (
          <AuthAlert
            variant={status === "success" ? "success" : "error"}
            message={message}
          />
        )}

        {status === "success" ? (
          <p className={styles.footerText}>
            <Link href="/login">Continue to Login</Link>
          </p>
        ) : status === "error" ? (
          <p className={styles.footerText}>
            <Link href="/verify-email">Request a new verification email</Link>
          </p>
        ) : null}
      </div>
    </AuthLayout>
  );
}
