import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./SplitContentSection.module.css";

type SplitContentSectionProps = {
  title: string;
  paragraphs: readonly string[];
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
};

export function SplitContentSection({
  title,
  paragraphs,
  image,
  imageAlt,
  imagePosition,
}: SplitContentSectionProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <SectionContainer className={styles.section}>
      <div
        className={`${styles.grid} ${isImageLeft ? "" : styles.gridReversed}`}
      >
        <Reveal variant={isImageLeft ? "left" : "right"} className={styles.blockReveal}>
          <div className={`${styles.imageWrap} ${styles.imageBlock}`}>
            <SafeImage
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </Reveal>
        <Reveal variant={isImageLeft ? "right" : "left"} className={styles.blockReveal}>
          <div className={`${styles.textBlock} ${styles.text}`}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.paragraphs}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
