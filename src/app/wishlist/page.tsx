import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { WishlistSection } from "@/components/wishlist/WishlistSection";
import { SimilarProductsSection } from "@/components/wishlist/SimilarProductsSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Wishlist | Manfa",
  description: "View and manage your saved Manfa favourites.",
};

export default function WishlistPage() {
  return (
    <>
      <SiteHeader variant="solid" activeHref="/wishlist" />
      <main className={styles.main}>
        <WishlistSection />
        <SimilarProductsSection />
      </main>
      <Footer />
    </>
  );
}
