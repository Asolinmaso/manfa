import styles from "./AuthAlert.module.css";

type AuthAlertProps = {
  variant: "error" | "success";
  message: string;
};

export function AuthAlert({ variant, message }: AuthAlertProps) {
  return (
    <div
      className={`${styles.alert} ${variant === "error" ? styles.error : styles.success}`}
      role="alert"
    >
      {message}
    </div>
  );
}
