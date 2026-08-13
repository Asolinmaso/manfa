import type { Metadata } from "next";
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
      <main className={styles.main}>
        <ShopPageContent />
      </main>
      <Footer />
    </>
  );
}
