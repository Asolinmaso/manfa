import { visionMission } from "@/data/aboutContent";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./VisionMissionSection.module.css";

export function VisionMissionSection() {
  return (
    <SectionContainer className={styles.section}>
      <div className={styles.grid}>
        <article className={styles.column}>
          <h2 className={styles.title}>{visionMission.vision.title}</h2>
          <p className={styles.description}>{visionMission.vision.description}</p>
        </article>

        <div className={styles.dividerVertical} aria-hidden />
        <hr className={styles.dividerHorizontal} aria-hidden />

        <article className={styles.column}>
          <h2 className={styles.title}>{visionMission.mission.title}</h2>
          <p className={styles.description}>{visionMission.mission.description}</p>
        </article>
      </div>
    </SectionContainer>
  );
}
