import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { GoogleButton } from "@/components/auth/GoogleButton";
import styles from "@/components/auth/authForm.module.css";

export const metadata: Metadata = {
  title: "Login | Manfa",
  description: "Sign in to your Manfa account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <form className={styles.form} action="#" method="post">
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back Sakshi!</h1>
          <p className={styles.subtitle}>Enter Your Credentials To Continue.</p>
        </div>

        <div className={styles.body}>
          <div className={styles.fields}>
            <div className={styles.inputGroup}>
              <div className={styles.inputStack}>
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
                  autoComplete="current-password"
                />
              </div>
              <Link href="#" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Continue
            </button>
          </div>

          <div className={styles.socialSection}>
            <AuthDivider />
            <GoogleButton label="Login With Google" />
          </div>
        </div>

        <p className={styles.footerText}>
          Dont Have An Account? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
