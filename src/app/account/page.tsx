import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileSection } from "@/components/account/ProfileSection";
import { AddressesSection } from "@/components/account/AddressesSection";
import { accountUser, savedAddresses } from "@/data/accountContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "My Account | Manfa",
  description: "Manage your MANFA profile, contact details, and saved addresses.",
};

export default function AccountPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className={styles.main}>
        <ProfileTabs activeTab="account" />
        <SectionContainer className={styles.content}>
          <ProfileSection user={accountUser} />
          <AddressesSection addresses={savedAddresses} />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
