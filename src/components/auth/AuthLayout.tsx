import { AuthBranding } from "./AuthBranding";
import styles from "./AuthLayout.module.css";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <AuthBranding />
      <div className={styles.formPanel}>{children}</div>
    </div>
  );
}
