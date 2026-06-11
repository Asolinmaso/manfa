import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { CartPageContent } from "@/components/cart/CartPageContent";
import { cartCount } from "@/data/cartContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cart | Manfa",
  description: "Review items in your Manfa shopping cart.",
};

export default function CartPage() {
  return (
    <>
      <SiteHeader variant="solid" cartCount={cartCount} />
      <main className={styles.main}>
        <CartPageContent />
      </main>
      <Footer />
    </>
  );
}
