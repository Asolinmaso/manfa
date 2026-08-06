import { occasions } from "@/data/homeContent";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./OccasionSection.module.css";

export function OccasionSection() {
  return (
    <SectionContainer className={styles.section}>
      <Reveal variant="up">
        <h2 className={styles.heading}>Curated For Every Occasion</h2>
      </Reveal>
      <div className={styles.grid}>
        {occasions.map((occasion, index) => (
          <Reveal key={occasion.title} variant="zoom" delay={index * 150} className={styles.cardReveal}>
            <article className={styles.card}>
              <SafeImage
                src={occasion.image}
                alt={occasion.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3 className={styles.title}>{occasion.title}</h3>
                <p className={styles.description}>{occasion.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
