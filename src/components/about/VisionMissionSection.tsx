import { visionMission } from "@/data/aboutContent";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./VisionMissionSection.module.css";

export function VisionMissionSection() {
  return (
    <SectionContainer className={styles.section}>
      <div className={styles.grid}>
        <Reveal variant="left" className={styles.columnReveal}>
          <article className={styles.column}>
            <h2 className={styles.title}>{visionMission.vision.title}</h2>
            <p className={styles.description}>{visionMission.vision.description}</p>
          </article>
        </Reveal>

        <div className={styles.dividerVertical} aria-hidden />
        <hr className={styles.dividerHorizontal} aria-hidden />

        <Reveal variant="right" className={styles.columnReveal}>
          <article className={styles.column}>
            <h2 className={styles.title}>{visionMission.mission.title}</h2>
            <p className={styles.description}>{visionMission.mission.description}</p>
          </article>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
