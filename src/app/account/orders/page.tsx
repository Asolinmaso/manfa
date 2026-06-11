import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { OrdersPageContent } from "@/components/profile/OrdersPageContent";
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
        <ProfileTabs activeTab="orders" />
        <SectionContainer className={styles.content}>
          <OrdersPageContent />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
