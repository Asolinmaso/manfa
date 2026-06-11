import { valueProps } from "@/data/homeContent";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./ValueProps.module.css";

const icons = [
  <TimelessIcon key="timeless" />,
  <CraftIcon key="craft" />,
  <LivingIcon key="living" />,
];

export function ValueProps() {
  return (
    <SectionContainer className={styles.section}>
      <div className={styles.grid}>
        {valueProps.map((item, index) => (
          <article key={item.title} className={styles.item}>
            <div className={styles.icon}>{icons[index]}</div>
            <div className={styles.text}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}

function TimelessIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden>
      <rect x="8" y="12" width="44" height="36" rx="2" fill="var(--burgundy)" />
      <path d="M20 24H40M20 32H36" stroke="var(--cream)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CraftIcon() {
  return (
    <svg width="54" height="60" viewBox="0 0 54 60" fill="none" aria-hidden>
      <path
        d="M27 4L8 20V52H46V20L27 4Z"
        fill="var(--burgundy)"
        stroke="var(--burgundy)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M27 4V52" stroke="var(--cream)" strokeWidth="1.5" />
    </svg>
  );
}

function LivingIcon() {
  return (
    <svg width="63" height="60" viewBox="0 0 63 60" fill="none" aria-hidden>
      <circle cx="31.5" cy="30" r="24" fill="var(--burgundy)" />
      <path
        d="M31.5 18C26 18 22 24 22 30C22 36 26 42 31.5 42C37 42 41 36 41 30"
        stroke="var(--cream)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="31.5" cy="30" r="4" fill="var(--cream)" />
    </svg>
  );
}
