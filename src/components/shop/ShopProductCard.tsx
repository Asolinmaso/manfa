"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ShopProduct } from "@/data/shopContent";
import styles from "./ShopProductCard.module.css";

type ShopProductCardProps = {
  product: ShopProduct;
};

export function ShopProductCard({ product }: ShopProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [popping, setPopping] = useState(false);

  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
    setPopping(true);
  };

  const handleAddToCart = () => {
    alert(`"${product.name}" added to cart! (Cart integration coming soon)`);
  };

  const handleBuyNow = () => {
    alert(`Buying "${product.name}"… (Payment integration coming soon)`);
  };

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
        <button
          type="button"
          className={styles.wishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlist}
          onAnimationEnd={() => setPopping(false)}
        >
          <span className={`${styles.heartWrap} ${popping ? styles.heartPop : ""}`}>
            <HeartIcon filled={wishlisted} />
          </span>
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.meta}>
          <span className={styles.price}>{product.priceLabel}</span>
          <div className={styles.rating}>
            <StarIcon />
            <span className={styles.ratingValue}>{product.rating}</span>
            <span className={styles.reviews}>({product.reviewCount})</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.addToCart} onClick={handleAddToCart}>
            Add to cart
          </button>
          <button type="button" className={styles.buyNow} onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 1L11.163 6.52786H17.0622L12.4496 9.94427L14.6126 15.4721L9 12.0557L3.38742 15.4721L5.55038 9.94427L0.937822 6.52786H6.83702L9 1Z"
        fill="var(--star-gold)"
        stroke="var(--star-gold)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="27" height="24" viewBox="0 0 27 24" fill="none" aria-hidden>
      <path
        d="M13.5 21.5L2.5 10.5C0.5 8.5 0.5 5.5 2.5 3.5C4.5 1.5 7.5 1.5 9.5 3.5L13.5 7.5L17.5 3.5C19.5 1.5 22.5 1.5 24.5 3.5C26.5 5.5 26.5 8.5 24.5 10.5L13.5 21.5Z"
        stroke={filled ? "var(--burgundy)" : "currentColor"}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={filled ? "var(--burgundy)" : "none"}
      />
    </svg>
  );
}
