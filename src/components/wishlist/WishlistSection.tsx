"use client";

import { useState } from "react";
import { wishlistItems as initialWishlistItems } from "@/data/wishlistContent";
import type { WishlistItem as WishlistItemType } from "@/data/wishlistContent";
import { WishlistItem } from "@/components/wishlist/WishlistItem";
import styles from "./WishlistSection.module.css";

export function WishlistSection() {
  const [items, setItems] = useState<WishlistItemType[]>(initialWishlistItems);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setRemovingId(id);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 400);
  };

  const count = items.length;
  const paddedCount = String(count).padStart(2, "0");

  return (
    <section className={styles.section}>
      <h1 className={`${styles.title} anim-fade-up`}>Wishlist ({paddedCount})</h1>
      <hr className={`${styles.divider} anim-fade-in`} style={{ "--anim-delay": "150ms" } as React.CSSProperties} />

      {items.length === 0 ? (
        <p className={styles.empty}>Your wishlist is empty.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`${styles.listItem} ${removingId === item.id ? styles.removing : ""}`}
              style={{ "--anim-delay": `${200 + index * 100}ms` } as React.CSSProperties}
            >
              <WishlistItem item={item} onRemove={handleRemove} />
              {index < items.length - 1 && <hr className={styles.itemDivider} />}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
