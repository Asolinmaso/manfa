import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileSection } from "@/components/account/ProfileSection";
import { AddressesSection } from "@/components/account/AddressesSection";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getAccountUserFromSession } from "@/lib/auth/accountUser";
import { savedAddresses } from "@/data/accountContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "My Account | Manfa",
  description: "Manage your MANFA profile, contact details, and saved addresses.",
};

export default async function AccountPage() {
  const user = await getAccountUserFromSession();
  if (!user) {
    redirect("/login?redirect=/account");
  }

  return (
    <>
      <SiteHeader variant="solid" />
      <main className={styles.main}>
        <ProfileTabs activeTab="account" />
        <SectionContainer className={styles.content}>
          <ProfileSection user={user} />
          <AddressesSection addresses={savedAddresses} />
          <div className={styles.logoutRow}>
            <LogoutButton />
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
