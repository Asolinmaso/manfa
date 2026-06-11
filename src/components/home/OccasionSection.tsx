import { occasions } from "@/data/homeContent";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./OccasionSection.module.css";

export function OccasionSection() {
  return (
    <SectionContainer className={styles.section}>
      <h2 className={styles.heading}>Curated For Every Occasion</h2>
      <div className={styles.grid}>
        {occasions.map((occasion) => (
          <article key={occasion.title} className={styles.card}>
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
        ))}
      </div>
    </SectionContainer>
  );
}
