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
        className={styles.image}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>{aboutHero.title}</h1>
        <p className={styles.description}>{aboutHero.description}</p>
      </div>
    </section>
  );
}
