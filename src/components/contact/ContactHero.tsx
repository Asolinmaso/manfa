import { contactHero, contactImages } from "@/data/contactContent";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./ContactHero.module.css";

export function ContactHero() {
  return (
    <section className={styles.hero}>
      <SafeImage
        src={contactImages.hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>{contactHero.title}</h1>
        <p className={styles.subtitle}>{contactHero.subtitle}</p>
      </div>
    </section>
  );
}
