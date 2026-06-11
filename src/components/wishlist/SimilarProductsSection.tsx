import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { similarProducts } from "@/data/wishlistContent";
import styles from "./SimilarProductsSection.module.css";

export function SimilarProductsSection() {
  return (
    <SectionContainer className={styles.section}>
      <h2 className={styles.title}>Similar Products</h2>
      <div className={styles.grid}>
        {similarProducts.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionContainer>
  );
}
