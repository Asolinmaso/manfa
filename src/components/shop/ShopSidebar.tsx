"use client";

import type { ShopCategory } from "@/data/shopContent";
import { shopCategories, shopSizes, priceRangeDefaults } from "@/data/shopContent";
import styles from "./ShopSidebar.module.css";

type ShopSidebarProps = {
  activeCategory: ShopCategory;
  onCategoryChange: (category: ShopCategory) => void;
  priceMin: number;
  priceMax: number;
  onPriceMinChange: (value: number) => void;
  onPriceMaxChange: (value: number) => void;
  selectedSizes: string[];
  onSizeToggle: (size: string) => void;
};

export function ShopSidebar({
  activeCategory,
  onCategoryChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  selectedSizes,
  onSizeToggle,
}: ShopSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Filter By</h2>
      <hr className={styles.rule} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Category</h3>
        <ul className={styles.categoryList}>
          {shopCategories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className={`${styles.categoryItem} ${
                  activeCategory === category ? styles.categoryActive : ""
                }`}
                onClick={() => onCategoryChange(category)}
              >
                <span>{category}</span>
                <ChevronIcon />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <hr className={styles.rule} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Price Range</h3>
        <div className={styles.priceRange}>
          <div className={styles.priceLabels}>
            <span>Rs {priceMin.toLocaleString("en-IN")}</span>
            <span>Rs {priceMax.toLocaleString("en-IN")}</span>
          </div>
          <div className={styles.sliderTrack}>
            <input
              type="range"
              min={priceRangeDefaults.min}
              max={priceRangeDefaults.max}
              value={priceMin}
              onChange={(e) => {
                const value = Number(e.target.value);
                onPriceMinChange(Math.min(value, priceMax - 100));
              }}
              className={styles.slider}
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={priceRangeDefaults.min}
              max={priceRangeDefaults.max}
              value={priceMax}
              onChange={(e) => {
                const value = Number(e.target.value);
                onPriceMaxChange(Math.max(value, priceMin + 100));
              }}
              className={`${styles.slider} ${styles.sliderMax}`}
              aria-label="Maximum price"
            />
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Size</h3>
        <div className={styles.sizeGrid}>
          {shopSizes.map((size) => (
            <button
              key={size}
              type="button"
              className={`${styles.sizeBtn} ${
                selectedSizes.includes(size) ? styles.sizeActive : ""
              }`}
              onClick={() => onSizeToggle(size)}
              aria-pressed={selectedSizes.includes(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
