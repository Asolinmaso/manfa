import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailPendingForm } from "@/components/auth/VerifyEmailPendingForm";

export const metadata: Metadata = {
  title: "Verify Email | Manfa",
  description: "Verify your Manfa account email address.",
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailPendingForm />
    </Suspense>
  );
}
