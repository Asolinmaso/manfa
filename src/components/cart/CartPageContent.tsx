"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { CartItem } from "@/components/cart/CartItem";
import { PriceSummary } from "@/components/cart/PriceSummary";
import { cartItems as initialCartItems, similarProducts } from "@/data/cartContent";
import type { CartItem as CartItemType } from "@/data/cartContent";
import styles from "./CartPageContent.module.css";

export function CartPageContent() {
  const [items, setItems] = useState<CartItemType[]>(initialCartItems);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setRemovingId(id);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 400);
  };

  const handleBuyNow = () => {
    alert("Proceeding to checkout… (payment integration coming soon)");
  };

  const cartCountLabel = String(items.length).padStart(2, "0");

  return (
    <>
      <div className={styles.layout}>
        <section className={styles.cartPanel}>
          <h1 className={`${styles.title} anim-fade-up`}>My Cart ({cartCountLabel})</h1>
          <hr className={`${styles.divider} anim-fade-in`} style={{ "--anim-delay": "150ms" } as React.CSSProperties} />

          {items.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            <ul className={styles.list}>
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className={`${styles.listItem} ${removingId === item.id ? styles.removing : ""}`}
                  style={{ "--anim-delay": `${200 + index * 100}ms` } as React.CSSProperties}
                >
                  <CartItem item={item} onRemove={handleRemove} />
                  {index < items.length - 1 && <hr className={styles.divider} />}
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className={`${styles.buyNowWrap} anim-fade-up`} style={{ "--anim-delay": "500ms" } as React.CSSProperties}>
              <button type="button" className={styles.buyNow} onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          )}
        </section>

        <Reveal variant="right" delay={150} className={styles.summaryReveal}>
          <PriceSummary itemCount={items.length} />
        </Reveal>
      </div>

      <section className={styles.similarSection}>
        <h2 className={`${styles.similarTitle} anim-fade-up`}>Similar Products</h2>
        <div className={styles.similarGrid}>
          {similarProducts.map((product, index) => (
            <Reveal key={product.id} variant="up" delay={(index % 4) * 90} className={styles.cardSlot}>
              <ShopProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
