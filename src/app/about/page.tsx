import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutHero } from "@/components/about/AboutHero";
import { SplitContentSection } from "@/components/about/SplitContentSection";
import { VisionMissionSection } from "@/components/about/VisionMissionSection";
import { Footer } from "@/components/home/Footer";
import {
  aboutImages,
  ourStory,
  ourPurpose,
} from "@/data/aboutContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | Manfa",
  description:
    "Discover MANFA's story, vision, mission, and purpose — timeless essentials designed for changing every lifestyle.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader variant="solid" activeHref="/about" />
      <main className={styles.main}>
        <AboutHero />
        <SplitContentSection
          title={ourStory.title}
          paragraphs={ourStory.paragraphs}
          image={aboutImages.ourStory}
          imageAlt="MANFA design process with fabric swatches and sketches"
          imagePosition="left"
        />
        <VisionMissionSection />
        <SplitContentSection
          title={ourPurpose.title}
          paragraphs={ourPurpose.paragraphs}
          image={aboutImages.purpose}
          imageAlt="MANFA brand tag on quality fabric"
          imagePosition="right"
        />
      </main>
      <Footer />
    </>
  );
}
