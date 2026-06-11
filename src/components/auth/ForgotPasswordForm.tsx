"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthAlert } from "@/components/auth/AuthAlert";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validation/authSchemas";
import styles from "@/components/auth/authForm.module.css";
import alertStyles from "@/components/auth/AuthAlert.module.css";

export function ForgotPasswordForm() {
  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setServerMessage("");
    setIsSuccess(false);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setServerMessage(json.data?.message ?? json.message);
      setIsSuccess(res.ok);
    } catch {
      setServerMessage("Unable to connect. Please try again.");
    }
  }

  return (
    <AuthLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.header}>
          <h1 className={styles.title}>Forgot Password</h1>
          <p className={styles.subtitle}>
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        {serverMessage ? (
          <AuthAlert
            variant={isSuccess ? "success" : "error"}
            message={serverMessage}
          />
        ) : null}

        <div className={styles.fields}>
          <AuthInput
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register("email")}
          />

          <button
            type="submit"
            className={`${styles.submitBtn} ${alertStyles.submitBtn}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </div>

        <p className={styles.footerText}>
          Remember your password? <Link href="/login">Back to Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
