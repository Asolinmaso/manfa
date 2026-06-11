import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategorySplit } from "@/components/home/CategorySplit";
import { OffersSection } from "@/components/home/OffersSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { StyleBanner } from "@/components/home/StyleBanner";
import { OccasionSection } from "@/components/home/OccasionSection";
import { Footer } from "@/components/home/Footer";
import { newArrivals, signaturePieces } from "@/data/homeContent";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.heroWrapper}>
        <SiteHeader variant="overlay" activeHref="/" />
        <Hero />
      </div>

      <main className={styles.main}>
        <ValueProps />
        <CategorySplit />
        <OffersSection />
        <ProductGrid
          id="new-arrivals"
          title="New Arrivals"
          products={newArrivals}
          layout="scroll"
        />
        <PhilosophySection />
        <ProductGrid
          id="signature-pieces"
          title="Signature Pieces"
          products={signaturePieces}
          layout="grid"
          titleAlign="center"
        />
        <StyleBanner />
        <OccasionSection />
      </main>

      <Footer />
    </>
  );
}
