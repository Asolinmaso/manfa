import Link from "next/link";
import styles from "./AccountTabs.module.css";

type AccountTab = "account" | "orders";

type AccountTabsProps = {
  activeTab: AccountTab;
};

export function AccountTabs({ activeTab }: AccountTabsProps) {
  return (
    <nav className={styles.tabs} aria-label="Account sections">
      <div className={styles.rule} />
      <ul className={styles.list}>
        <li>
          {activeTab === "account" ? (
            <span className={styles.active} aria-current="page">
              My Account
            </span>
          ) : (
            <Link href="/account" className={styles.inactive}>
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
            <Link href="/account/orders" className={styles.inactive}>
              My Orders
            </Link>
          )}
        </li>
      </ul>
      <div className={styles.rule} />
    </nav>
  );
}
