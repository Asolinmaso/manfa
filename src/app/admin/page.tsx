import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { requireRole } from "@/lib/auth/rbac";
import { AdminProductsClient } from "@/components/admin/AdminProductsClient";

export const metadata: Metadata = {
  title: "Admin — Product Management | Manfa",
  description: "Manage products in the Manfa store.",
};

export default async function AdminPage() {
  const result = await requireRole("admin");
  if (result instanceof Response) {
    redirect("/login?redirect=/admin");
  }

  return (
    <>
      <SiteHeader variant="solid" />
      <main>
        <AdminProductsClient adminName={result.user.name} />
      </main>
    </>
  );
}
