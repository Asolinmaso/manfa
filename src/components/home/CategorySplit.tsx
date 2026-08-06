import { categories } from "@/data/homeContent";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./CategorySplit.module.css";

export function CategorySplit() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {categories.map((category, index) => (
          <Reveal
            key={category.title}
            variant={index === 0 ? "left" : "right"}
            delay={150}
            as="article"
            className={styles.cardReveal}
          >
            <article className={styles.card}>
              <SafeImage
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
              <div className={styles.content}>
                <h2 className={styles.title}>{category.title}</h2>
                <p className={styles.description}>{category.description}</p>
                <a href={category.href} className={styles.cta}>
                  {category.cta}
                  <span className={styles.ctaArrow}>
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
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
