import { wishlistItems } from "@/data/wishlistContent";
import { WishlistItem } from "@/components/wishlist/WishlistItem";
import styles from "./WishlistSection.module.css";

export function WishlistSection() {
  const count = wishlistItems.length;
  const paddedCount = String(count).padStart(2, "0");

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Wishlist ({paddedCount})</h1>
      <hr className={styles.divider} />

      <ul className={styles.list}>
        {wishlistItems.map((item, index) => (
          <li key={item.id} className={styles.listItem}>
            <WishlistItem item={item} />
            {index < wishlistItems.length - 1 && <hr className={styles.itemDivider} />}
          </li>
        ))}
      </ul>
    </section>
  );
}
