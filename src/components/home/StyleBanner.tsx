import { images } from "@/data/homeContent";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./StyleBanner.module.css";

export function StyleBanner() {
  return (
    <section className={styles.banner}>
      <SafeImage
        src={images.explore}
        alt="Style that stays"
        fill
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2 className={styles.title}>Style That Stays.</h2>
        <p className={styles.description}>
          Thoughtfully designed essentials that remain relevant long after trends
          have passed.
        </p>
        <Button href="/shop" variant="cream">
          Explore Collection
        </Button>
      </div>
    </section>
  );
}
