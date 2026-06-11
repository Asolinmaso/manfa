import type { Metadata } from "next";
import { VerifyEmailTokenForm } from "@/components/auth/VerifyEmailTokenForm";

export const metadata: Metadata = {
  title: "Verify Email | Manfa",
  description: "Confirm your Manfa account email address.",
};

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function VerifyEmailTokenPage({ params }: PageProps) {
  const { token } = await params;
  return <VerifyEmailTokenForm token={token} />;
}
