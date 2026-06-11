import Link from "next/link";
import styles from "./ProfileTabs.module.css";

type ProfileTab = "account" | "orders";

type ProfileTabsProps = {
  activeTab: ProfileTab;
};

export function ProfileTabs({ activeTab }: ProfileTabsProps) {
  return (
    <nav className={styles.tabs} aria-label="Profile sections">
      <div className={styles.rule} />
      <ul className={styles.list}>
        <li>
          {activeTab === "account" ? (
            <span className={styles.active} aria-current="page">
              My Account
            </span>
          ) : (
            <Link href="/profile" className={styles.inactive}>
              My Account
            </Link>
          )}
        </li>
        <li>
          {activeTab === "orders" ? (
            <span className={styles.active} aria-current="page">
              My Orders
            </span>
          ) : (
            <Link href="/profile/orders" className={styles.inactive}>
              My Orders
            </Link>
          )}
        </li>
      </ul>
      <div className={styles.rule} />
    </nav>
  );
}
