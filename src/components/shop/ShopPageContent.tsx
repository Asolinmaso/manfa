"use client";

import { useMemo, useState } from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ShopSidebar } from "./ShopSidebar";
import { ShopProductCard } from "./ShopProductCard";
import {
  shopProducts,
  productsPerPage,
  sortOptions,
  priceRangeDefaults,
  type ShopCategory,
  type SortValue,
} from "@/data/shopContent";
import styles from "./ShopPageContent.module.css";

export function ShopPageContent() {
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("New Arrivals");
  const [priceMin, setPriceMin] = useState<number>(priceRangeDefaults.min);
  const [priceMax, setPriceMax] = useState<number>(priceRangeDefaults.max);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortValue>("featured");
  const [visibleCount, setVisibleCount] = useState(productsPerPage);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = shopProducts.filter((product) => {
      const inCategory = product.category === activeCategory;
      const inPrice = product.price >= priceMin && product.price <= priceMax;
      const inSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.sizes.includes(size));
      const inSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return inCategory && inPrice && inSize && inSearch;
    });

    switch (sortBy) {
      case "price-asc":
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        results = [...results].reverse();
        break;
      default:
        break;
    }

    return results;
  }, [activeCategory, priceMin, priceMax, selectedSizes, searchQuery, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setVisibleCount(productsPerPage);
  };

  const handleCategoryChange = (category: ShopCategory) => {
    setActiveCategory(category);
    setVisibleCount(productsPerPage);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setVisibleCount(productsPerPage);
  };

  return (
    <SectionContainer className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Explore Our Collection</h1>

        <div className={styles.toolbar}>
          <hr className={styles.toolbarRule} />
          <div className={styles.toolbarRow}>
            <p className={styles.productCount}>
              {filteredProducts.length} Products
            </p>

            <form className={styles.searchBar} onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="SearchProducts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search products"
              />
              <button type="submit" className={styles.searchBtn}>
                Search
              </button>
            </form>

            <label className={styles.sortWrap}>
              <span className={styles.sortLabel}>Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortValue)}
                className={styles.sortSelect}
                aria-label="Sort products"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <SortIcon />
            </label>
          </div>
          <hr className={styles.toolbarRule} />
        </div>
      </header>

      <button
        type="button"
        className={styles.filterToggle}
        onClick={() => setFiltersOpen(!filtersOpen)}
        aria-expanded={filtersOpen}
      >
        {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={styles.layout}>
        <div className={`${styles.sidebarWrap} ${filtersOpen ? styles.sidebarOpen : ""}`}>
          <ShopSidebar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            priceMin={priceMin}
            priceMax={priceMax}
            onPriceMinChange={(value) => {
              setPriceMin(value);
              setVisibleCount(productsPerPage);
            }}
            onPriceMaxChange={(value) => {
              setPriceMax(value);
              setVisibleCount(productsPerPage);
            }}
            selectedSizes={selectedSizes}
            onSizeToggle={handleSizeToggle}
          />
        </div>

        <div className={styles.gridSection}>
          {visibleProducts.length > 0 ? (
            <div className={styles.grid}>
              {visibleProducts.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No products match your filters.</p>
          )}

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button
                type="button"
                className={styles.loadMore}
                onClick={() => setVisibleCount((c) => c + productsPerPage)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}

function SortIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden className={styles.sortIcon}>
      <path
        d="M12 16L20 24L28 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
