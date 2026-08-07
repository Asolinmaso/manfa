"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./ProductGrid.module.css";

type Product = {
  name: string;
  price: string;
  image: string;
};

type ProductGridProps = {
  id?: string;
  title: string;
  products: readonly Product[];
  layout?: "scroll" | "grid";
  titleAlign?: "left" | "center";
  ctaHref?: string;
};

export function ProductGrid({
  id,
  title,
  products,
  layout = "scroll",
  titleAlign = "left",
  ctaHref = "/shop",
}: ProductGridProps) {
  return (
    <SectionContainer id={id} className={styles.section}>
      <Reveal variant="up">
        <h2
          className={`${styles.title} ${titleAlign === "center" ? styles.titleCenter : ""}`}
        >
          {title}
        </h2>
      </Reveal>
      <div
        className={`${styles.products} ${layout === "grid" ? styles.productsGrid : styles.productsScroll}`}
      >
        {products.map((product, index) => (
          <Reveal
            key={`${product.name}-${product.image}-${index}`}
            variant="up"
            delay={layout === "grid" ? (index % 4) * 100 : (index % 4) * 80}
            className={styles.cardSlot}
          >
            <ProductCard product={product} layout={layout} />
          </Reveal>
        ))}
      </div>
      <Reveal variant="fade" delay={120}>
        <div className={`${styles.ctaWrap} ${titleAlign === "center" ? styles.ctaCenter : ""}`}>
          <Button href={ctaHref} variant="burgundy">
            Explore Collection
          </Button>
        </div>
      </Reveal>
    </SectionContainer>
  );
}

function ProductCard({ product, layout }: { product: Product; layout: "scroll" | "grid" }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [popping, setPopping] = useState(false);

  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
    setPopping(true);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes={layout === "grid" ? "(max-width: 768px) 50vw, 25vw" : "292px"}
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
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{product.price}</p>
      </div>
    </article>
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
