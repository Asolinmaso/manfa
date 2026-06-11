import Link from "next/link";
import { images } from "@/data/homeContent";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./PhilosophySection.module.css";

export function PhilosophySection() {
  return (
    <section className={styles.section}>
      <div className={styles.textPanel}>
        <p className={styles.eyebrow}>Our Philosophy</p>
        <h2 className={styles.title}>Made With Intention. Worn With Confidence.</h2>
        <p className={styles.description}>
          We believe that true style is not about following trends, but about making
          choices that reflect who you are and how you want to show up in the world.
        </p>
        <Link href="/about" className={styles.cta}>
          Explore Our Story
          <ArrowIcon />
        </Link>
      </div>
      <div className={styles.imagePanel}>
        <SafeImage
          src={images.philosophyFabric}
          alt="Fabric texture detail"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
        />
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden>
      <path
        d="M2 2L10 8L2 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
