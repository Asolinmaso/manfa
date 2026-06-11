import type { ProfileUser } from "@/data/profileContent";
import styles from "./ProfileCard.module.css";

type ProfileCardProps = {
  user: ProfileUser;
};

export function ProfileCard({ user }: ProfileCardProps) {
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
          <PencilIcon />
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

function PencilIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20H8L19 9L15 5L4 16V20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
