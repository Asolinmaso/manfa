import { contactInfoItems } from "@/data/contactContent";
import styles from "./ContactInfo.module.css";

function ContactIcon({ type }: { type: (typeof contactInfoItems)[number]["icon"] }) {
  return (
    <span className={styles.iconCircle} aria-hidden>
      {type === "phone" && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5.5 3.5H7.5L8.5 7L6.75 8.25C7.55 10.35 9.65 12.45 11.75 13.25L13 11.5L16.5 12.5V14.5C16.5 15.05 16.05 15.5 15.5 15.5C8.5 15.5 3 10 3 3C3 2.45 3.45 2 4 2H5.5V3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {type === "email" && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 6L10 11L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )}
      {type === "address" && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 17.5C10 17.5 15 12.25 15 8.75C15 5.85 12.75 3.5 10 3.5C7.25 3.5 5 5.85 5 8.75C5 12.25 10 17.5 10 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="8.75" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      {type === "hours" && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 6V10L12.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

export function ContactInfo() {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Contact Us</h2>
      <div className={styles.card}>
        <ul className={styles.list}>
          {contactInfoItems.map((item) => (
            <li key={item.id} className={styles.row}>
              <ContactIcon type={item.icon} />
              <div className={styles.details}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
