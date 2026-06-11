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
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden>
      <path
        d="M2 2L10 8L2 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
