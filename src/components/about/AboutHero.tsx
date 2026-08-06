import { aboutHero, aboutImages } from "@/data/aboutContent";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./AboutHero.module.css";

export function AboutHero() {
  return (
    <section className={styles.hero}>
      <SafeImage
        src={aboutImages.hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`${styles.image} anim-kenburns-slow`}
      />
      <div className={styles.content}>
        <h1 className={`${styles.title} anim-fade-up`}>{aboutHero.title}</h1>
        <p className={`${styles.description} anim-fade-up`} style={{ "--anim-delay": "180ms" } as React.CSSProperties}>
          {aboutHero.description}
        </p>
      </div>
    </section>
  );
}
