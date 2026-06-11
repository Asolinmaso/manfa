import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { CartItem } from "@/components/cart/CartItem";
import { PriceSummary } from "@/components/cart/PriceSummary";
import { cartCountLabel, cartItems, similarProducts } from "@/data/cartContent";
import styles from "./CartPageContent.module.css";

export function CartPageContent() {
  return (
    <>
      <div className={styles.layout}>
        <section className={styles.cartPanel}>
          <h1 className={styles.title}>My Cart ({cartCountLabel})</h1>
          <hr className={styles.divider} />

          <ul className={styles.list}>
            {cartItems.map((item, index) => (
              <li key={item.id} className={styles.listItem}>
                <CartItem item={item} />
                {index < cartItems.length - 1 && <hr className={styles.divider} />}
              </li>
            ))}
          </ul>

          <div className={styles.buyNowWrap}>
            <button type="button" className={styles.buyNow}>
              Buy Now
            </button>
          </div>
        </section>

        <PriceSummary />
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
