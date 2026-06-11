import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { Footer } from "@/components/home/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact | Manfa",
  description:
    "Get in touch with MANFA for questions, feedback, or collaboration inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader variant="solid" activeHref="/contact" />
      <main className={styles.main}>
        <ContactHero />
        <SectionContainer className={styles.mainSection}>
          <div className={styles.grid}>
            <ContactInfo />
            <ContactForm />
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
