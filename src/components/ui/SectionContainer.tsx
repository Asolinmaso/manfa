import styles from "./SectionContainer.module.css";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
};

export function SectionContainer({
  children,
  className = "",
  as: Tag = "section",
  id,
}: SectionContainerProps) {
  return (
    <Tag id={id} className={`${styles.container} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
