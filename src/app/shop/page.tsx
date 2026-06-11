import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import { Footer } from "@/components/home/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop | Manfa",
  description: "Explore our collection of timeless essentials crafted for changing every lifestyle.",
};

export default function ShopPage() {
  return (
    <>
      <SiteHeader variant="solid" activeHref="/shop" />
      <main className={styles.main}>
        <ShopPageContent />
      </main>
      <Footer />
    </>
  );
}
