import type { AccountUser } from "@/data/accountContent";
import styles from "./ProfileSection.module.css";

type ProfileSectionProps = {
  user: AccountUser;
};

export function ProfileSection({ user }: ProfileSectionProps) {
  const fields = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Contact", value: user.contact },
    { label: "Default Address", value: user.defaultAddress },
  ];

  return (
    <section className={styles.section} aria-labelledby="profile-heading">
      <h2 id="profile-heading" className={styles.heading}>
        My Profile
      </h2>
      <div className={styles.card}>
        <button type="button" className={styles.editBtn} aria-label="Edit profile">
          <EditIcon />
        </button>
        <div className={styles.avatar} aria-hidden>
          <span className={styles.initials}>{user.initials}</span>
        </div>
        <dl className={styles.fields}>
          {fields.map((field) => (
            <div key={field.label} className={styles.field}>
              <dt className={styles.label}>{field.label} :</dt>
              <dd className={styles.value}>{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function EditIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 7L17 11M8 18H12L17 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
