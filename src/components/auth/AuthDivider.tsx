import styles from "./AuthDivider.module.css";

export function AuthDivider() {
  return (
    <div className={styles.divider}>
      <span className={styles.line} />
      <span className={styles.text}>or continue with</span>
      <span className={styles.line} />
    </div>
  );
}
