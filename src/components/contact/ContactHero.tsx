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
        className={`${styles.image} anim-kenburns-slow`}
      />
      <div className={styles.content}>
        <h1 className={`${styles.title} anim-fade-up`}>{contactHero.title}</h1>
        <p className={`${styles.subtitle} anim-fade-up`} style={{ "--anim-delay": "180ms" } as React.CSSProperties}>
          {contactHero.subtitle}
        </p>
      </div>
    </section>
  );
}
