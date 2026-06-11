import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Manfa",
  description: "Sign in to your Manfa account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
