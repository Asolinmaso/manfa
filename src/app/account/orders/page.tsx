import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { AccountTabs } from "@/components/account/AccountTabs";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "My Orders | Manfa",
  description: "View your MANFA order history.",
};

export default function AccountOrdersPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className={styles.main}>
        <AccountTabs activeTab="orders" />
        <SectionContainer className={styles.content}>
          <p className={styles.placeholder}>Your orders will appear here.</p>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
