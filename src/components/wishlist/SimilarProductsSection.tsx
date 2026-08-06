import { Reveal } from "@/components/ui/Reveal";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { similarProducts } from "@/data/wishlistContent";
import styles from "./SimilarProductsSection.module.css";

export function SimilarProductsSection() {
  return (
    <SectionContainer className={styles.section}>
      <h2 className={`${styles.title} anim-fade-up`}>Similar Products</h2>
      <div className={styles.grid}>
        {similarProducts.map((product, index) => (
          <Reveal key={product.id} variant="up" delay={(index % 4) * 90} className={styles.cardSlot}>
            <ShopProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
