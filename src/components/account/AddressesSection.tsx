import type { SavedAddress } from "@/data/accountContent";
import styles from "./AddressesSection.module.css";

type AddressesSectionProps = {
  addresses: SavedAddress[];
};

export function AddressesSection({ addresses }: AddressesSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="addresses-heading">
      <div className={styles.rule} />
      <div className={styles.header}>
        <h2 id="addresses-heading" className={styles.heading}>
          Addresses
        </h2>
        <button type="button" className={styles.addBtn}>
          Add Address
        </button>
      </div>
      <ul className={styles.list}>
        {addresses.map((address) => (
          <li key={address.id}>
            <AddressCard address={address} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function AddressCard({ address }: { address: SavedAddress }) {
  const title = address.isDefault
    ? `${address.label} (Default)`
    : address.label;

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleGroup}>
          <HomeIcon />
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        <div className={styles.cardActions}>
          <button type="button" className={styles.iconBtn} aria-label="Delete address">
            <TrashIcon />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Edit address">
            <PencilIcon />
          </button>
        </div>
      </div>
      <p className={styles.addressText}>{address.fullAddress}</p>
    </article>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4L20 10.5V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 21V12H15V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
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

function TrashIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 7V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 7L8 20H16L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
