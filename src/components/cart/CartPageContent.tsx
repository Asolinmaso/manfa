"use client";

import { useState } from "react";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { CartItem } from "@/components/cart/CartItem";
import { PriceSummary } from "@/components/cart/PriceSummary";
import { cartItems as initialCartItems, similarProducts } from "@/data/cartContent";
import type { CartItem as CartItemType } from "@/data/cartContent";
import styles from "./CartPageContent.module.css";

export function CartPageContent() {
  const [items, setItems] = useState<CartItemType[]>(initialCartItems);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBuyNow = () => {
    alert("Proceeding to checkout… (payment integration coming soon)");
  };

  const cartCountLabel = String(items.length).padStart(2, "0");

  return (
    <>
      <div className={styles.layout}>
        <section className={styles.cartPanel}>
          <h1 className={styles.title}>My Cart ({cartCountLabel})</h1>
          <hr className={styles.divider} />

          {items.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            <ul className={styles.list}>
              {items.map((item, index) => (
                <li key={item.id} className={styles.listItem}>
                  <CartItem item={item} onRemove={handleRemove} />
                  {index < items.length - 1 && <hr className={styles.divider} />}
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className={styles.buyNowWrap}>
              <button type="button" className={styles.buyNow} onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          )}
        </section>

        <PriceSummary itemCount={items.length} />
      </div>

      <section className={styles.similarSection}>
        <h2 className={styles.similarTitle}>Similar Products</h2>
        <div className={styles.similarGrid}>
          {similarProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
