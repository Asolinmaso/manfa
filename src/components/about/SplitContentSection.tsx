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
        <div className={`${styles.imageWrap} ${styles.imageBlock}`}>
          <SafeImage
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </div>
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
      </div>
    </SectionContainer>
  );
}
