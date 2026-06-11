import { SafeImage } from "@/components/ui/SafeImage";
import type { ShopProduct } from "@/data/shopContent";
import styles from "./ShopProductCard.module.css";

type ShopProductCardProps = {
  product: ShopProduct;
};

export function ShopProductCard({ product }: ShopProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 288px"
          className={styles.image}
        />
        <button type="button" className={styles.wishlist} aria-label="Add to wishlist">
          <HeartIcon />
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.meta}>
          <span className={styles.price}>{product.priceLabel}</span>
          <div className={styles.rating}>
            <span className={styles.star} aria-hidden>
              ★
            </span>
            <span className={styles.ratingValue}>{product.rating}</span>
            <span className={styles.reviews}>({product.reviewCount})</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.addToCart}>
            Add to cart
          </button>
          <button type="button" className={styles.buyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

function HeartIcon() {
  return (
    <svg width="27" height="24" viewBox="0 0 27 24" fill="none" aria-hidden>
      <path
        d="M13.5 21.5L2.5 10.5C0.5 8.5 0.5 5.5 2.5 3.5C4.5 1.5 7.5 1.5 9.5 3.5L13.5 7.5L17.5 3.5C19.5 1.5 22.5 1.5 24.5 3.5C26.5 5.5 26.5 8.5 24.5 10.5L13.5 21.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
