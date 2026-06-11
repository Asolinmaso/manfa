"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthAlert } from "@/components/auth/AuthAlert";
import {
  resendVerificationSchema,
  type ResendVerificationInput,
} from "@/lib/validation/authSchemas";
import styles from "@/components/auth/authForm.module.css";
import alertStyles from "@/components/auth/AuthAlert.module.css";

export function VerifyEmailPendingForm() {
  const searchParams = useSearchParams();
  const defaultEmail = searchParams.get("email") ?? "";
  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendVerificationInput>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: { email: defaultEmail },
  });

  async function onSubmit(data: ResendVerificationInput) {
    setServerMessage("");
    try {
      const res = await fetch("/api/auth/resend-verification", {
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
      <div className={styles.form}>
        <div className={styles.header}>
          <h1 className={styles.title}>Verify Your Email</h1>
          <p className={styles.subtitle}>
            We sent a verification link to your inbox. Please check your email to
            activate your account.
          </p>
        </div>

        {serverMessage ? (
          <AuthAlert
            variant={isSuccess ? "success" : "error"}
            message={serverMessage}
          />
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              {isSubmitting ? "Sending..." : "Resend Verification Email"}
            </button>
          </div>
        </form>

        <p className={styles.footerText}>
          Already verified? <Link href="/login">Login</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
