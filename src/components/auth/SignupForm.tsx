"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { AuthAlert } from "@/components/auth/AuthAlert";
import {
  registerSchema,
  type RegisterInput,
} from "@/lib/validation/authSchemas";
import styles from "@/components/auth/authForm.module.css";
import alertStyles from "@/components/auth/AuthAlert.module.css";

export function SignupForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setServerError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setServerError(json.message ?? "Registration failed");
        return;
      }

      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch {
      setServerError("Unable to connect. Please try again.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.header}>
        <h1 className={styles.title}>Get Started!</h1>
        <p className={styles.subtitle}>
          Already have an account? <Link href="/login">Login here.</Link>
        </p>
      </div>

      {serverError ? <AuthAlert variant="error" message={serverError} /> : null}

      <div className={styles.body}>
        <div className={styles.fields}>
          <div className={styles.inputStack}>
            <AuthInput
              id="name"
              label="Name"
              type="text"
              autoComplete="name"
              error={errors.name?.message}
              disabled={isSubmitting}
              {...register("name")}
            />
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
              autoComplete="new-password"
              error={errors.password?.message}
              disabled={isSubmitting}
              {...register("password")}
            />
            <AuthInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              disabled={isSubmitting}
              {...register("confirmPassword")}
            />
          </div>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              required
              className={styles.checkbox}
              disabled={isSubmitting}
            />
            <span className={styles.checkboxLabel}>
              I agree to the <Link href="#">Terms &amp; Conditions</Link> and{" "}
              <Link href="#">Privacy Policy</Link>
            </span>
          </label>

          <button
            type="submit"
            className={`${styles.submitBtn} ${alertStyles.submitBtn}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={alertStyles.loading}>
                <span className={alertStyles.spinner} aria-hidden />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        <div className={styles.socialSection}>
          <AuthDivider />
            <GoogleButton label="Signup With Google" redirect="/account" />
        </div>
      </div>

      <p className={styles.footerText}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  );
}
