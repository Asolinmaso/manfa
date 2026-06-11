"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { useAuth } from "@/components/auth/AuthProvider";
import { loginSchema, type LoginInput } from "@/lib/validation/authSchemas";
import styles from "@/components/auth/authForm.module.css";
import alertStyles from "@/components/auth/AuthAlert.module.css";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();
  const redirect = searchParams.get("redirect") ?? "/account";
  const googleError = searchParams.get("error");
  const [serverError, setServerError] = useState(() => {
    if (googleError === "google_email_unverified") {
      return "Google account email is not verified.";
    }
    if (googleError === "google_auth_failed") {
      return "Google sign-in failed. Please try again.";
    }
    return "";
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setServerError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setServerError(json.message ?? "Login failed");
        return;
      }

      await refresh();
      router.push(redirect);
      router.refresh();
    } catch {
      setServerError("Unable to connect. Please try again.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome Back!</h1>
        <p className={styles.subtitle}>Enter your credentials to continue.</p>
      </div>

      {serverError ? <AuthAlert variant="error" message={serverError} /> : null}

      <div className={styles.body}>
        <div className={styles.fields}>
          <div className={styles.inputGroup}>
            <div className={styles.inputStack}>
              <AuthInput
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                disabled={isSubmitting}
                {...register("email")}
              />
              <AuthInput
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                error={errors.password?.message}
                disabled={isSubmitting}
                {...register("password")}
              />
            </div>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} ${alertStyles.submitBtn}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={alertStyles.loading}>
                <span className={alertStyles.spinner} aria-hidden />
                Signing in...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </div>

        <div className={styles.socialSection}>
          <AuthDivider />
          <GoogleButton label="Login With Google" redirect={redirect} />
        </div>
      </div>

      <p className={styles.footerText}>
        Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </form>
  );
}
