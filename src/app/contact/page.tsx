import type { Metadata } from "next";
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
