import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { AddressesSection } from "@/components/profile/AddressesSection";
import { profileUser, savedAddresses } from "@/data/profileContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "My Account | Manfa",
  description: "Manage your MANFA profile, contact details, and saved addresses.",
};

export default function ProfilePage() {
  return (
    <>
      <SiteHeader variant="solid" activeHref="/profile" />
      <main className={styles.main}>
        <ProfileTabs activeTab="account" />
        <SectionContainer className={styles.content}>
          <ProfileCard user={profileUser} />
          <AddressesSection addresses={savedAddresses} />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
