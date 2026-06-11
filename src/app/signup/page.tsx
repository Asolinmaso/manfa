import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { GoogleButton } from "@/components/auth/GoogleButton";
import styles from "@/components/auth/authForm.module.css";

export const metadata: Metadata = {
  title: "Sign Up | Manfa",
  description: "Create your Manfa account.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <form className={styles.form} action="#" method="post">
        <div className={styles.header}>
          <h1 className={styles.title}>Get Started!</h1>
          <p className={styles.subtitle}>
            Already have an account? <Link href="/login">Login here.</Link>
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.fields}>
            <div className={styles.inputStack}>
              <AuthInput id="name" label="Name" type="text" autoComplete="name" />
              <AuthInput
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
              />
              <AuthInput
                id="password"
                label="Password"
                type="password"
                autoComplete="new-password"
              />
              <AuthInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
              />
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                name="terms"
                required
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>
                I agree to the <Link href="#">Terms &amp; Conditions</Link> and{" "}
                <Link href="#">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" className={styles.submitBtn}>
              Create Account
            </button>
          </div>

          <div className={styles.socialSection}>
            <AuthDivider />
            <GoogleButton label="Signup With Google" />
          </div>
        </div>

        <p className={styles.footerText}>
          Already Have An Account? <Link href="/login">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
