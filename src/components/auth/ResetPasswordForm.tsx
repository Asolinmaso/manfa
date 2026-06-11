"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthAlert } from "@/components/auth/AuthAlert";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/validation/authSchemas";
import styles from "@/components/auth/authForm.module.css";
import alertStyles from "@/components/auth/AuthAlert.module.css";

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  async function onSubmit(data: ResetPasswordInput) {
    setServerError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setServerError(json.message ?? "Unable to reset password");
        return;
      }

      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setServerError("Unable to connect. Please try again.");
    }
  }

  return (
    <AuthLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>Enter your new password below.</p>
        </div>

        {serverError ? <AuthAlert variant="error" message={serverError} /> : null}
        {isSuccess ? (
          <AuthAlert
            variant="success"
            message="Password reset successfully. Redirecting to login..."
          />
        ) : null}

        <input type="hidden" {...register("token")} />

        <div className={styles.fields}>
          <div className={styles.inputStack}>
            <AuthInput
              id="password"
              label="New Password"
              type="password"
              autoComplete="new-password"
              error={errors.password?.message}
              disabled={isSubmitting || isSuccess}
              {...register("password")}
            />
            <AuthInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              disabled={isSubmitting || isSuccess}
              {...register("confirmPassword")}
            />
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} ${alertStyles.submitBtn}`}
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? "Updating..." : "Reset Password"}
          </button>
        </div>

        <p className={styles.footerText}>
          <Link href="/login">Back to Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
