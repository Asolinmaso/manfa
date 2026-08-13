import Link from "next/link";
import fabricTexture from "@/imgs/op.png";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./PhilosophySection.module.css";

export function PhilosophySection() {
  return (
    <section className={styles.section}>
      <Reveal variant="left" className={styles.panelReveal}>
        <div className={styles.textPanel}>
          <p className={styles.eyebrow}>Our Philosophy</p>
          <h2 className={styles.title}>Made With Intention. Worn With Confidence.</h2>
          <p className={styles.description}>
            We believe that true style is not about following trends, but about making
            choices that reflect who you are and how you want to show up in the world.
          </p>
          <Link href="/about" className={styles.cta}>
            Explore Our Story
            <span className={styles.ctaArrow}>
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </Reveal>
      <Reveal variant="right" className={styles.panelReveal}>
        <div className={styles.imagePanel}>
          <SafeImage
            src={fabricTexture}
            alt="Fabric texture detail"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </div>
      </Reveal>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
      <path
        d="M1 7H19M13 1L19 7L13 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
