import type { Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { CartPageContent } from "@/components/cart/CartPageContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cart | Manfa",
  description: "Review items in your Manfa shopping cart.",
};

export default function CartPage() {
  return (
    <>
      <main className={styles.main}>
        <CartPageContent />
      </main>
      <Footer />
    </>
  );
}
