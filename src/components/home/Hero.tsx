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
        className={`${styles.image} anim-kenburns-slow`}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={`${styles.eyebrow} anim-fade-up`} style={{ "--anim-delay": "300ms" } as React.CSSProperties}>
          Where Style Meets Purpose
        </p>
        <h1 className={`${styles.title} anim-fade-up`} style={{ "--anim-delay": "450ms" } as React.CSSProperties}>
          Wear The Change
        </h1>
        <p className={`${styles.description} anim-fade-up`} style={{ "--anim-delay": "600ms" } as React.CSSProperties}>
          Thoughtfully crafted essentials designed for changing every lifestyle
        </p>
        <div className={styles.ctaWrap} style={{ "--anim-delay": "750ms" } as React.CSSProperties}>
          <Button href="/shop" variant="cream" className="anim-fade-up">
            Explore Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
