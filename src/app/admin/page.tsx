import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { requireRole } from "@/lib/auth/rbac";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Admin | Manfa",
  description: "Manfa admin dashboard.",
};

export default async function AdminPage() {
  const result = await requireRole("admin");
  if (result instanceof Response) {
    redirect("/login?redirect=/admin");
  }

  return (
    <>
      <SiteHeader variant="solid" />
      <main className={styles.main}>
        <SectionContainer>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.text}>
            Welcome, {result.user.name}. You have administrator access.
          </p>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
