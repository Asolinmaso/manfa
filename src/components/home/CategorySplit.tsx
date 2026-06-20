import { categories } from "@/data/homeContent";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./CategorySplit.module.css";

export function CategorySplit() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {categories.map((category) => (
          <article key={category.title} className={styles.card}>
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
                <ArrowIcon />
              </a>
            </div>
          </article>
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
