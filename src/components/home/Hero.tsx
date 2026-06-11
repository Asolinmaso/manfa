import { images } from "@/data/homeContent";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <SafeImage
        src={images.hero}
        alt="Manfa lifestyle collection"
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Where Style Meets Purpose</p>
        <h1 className={styles.title}>Wear The Change</h1>
        <p className={styles.description}>
          Thoughtfully crafted essentials designed for changing every lifestyle
        </p>
        <Button href="/shop" variant="cream">
          Explore Collection
        </Button>
      </div>
    </section>
  );
}
