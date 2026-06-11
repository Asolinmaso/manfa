import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Manfa",
  description: "Set a new password for your Manfa account.",
};

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function ResetPasswordPage({ params }: PageProps) {
  const { token } = await params;
  return <ResetPasswordForm token={token} />;
}
