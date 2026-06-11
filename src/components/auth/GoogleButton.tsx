import styles from "./GoogleButton.module.css";

type GoogleButtonProps = {
  label: string;
  redirect?: string;
};

export function GoogleButton({ label, redirect = "/account" }: GoogleButtonProps) {
  const href = `/api/auth/google?redirect=${encodeURIComponent(redirect)}`;

  return (
    <a href={href} className={styles.button}>
      <GoogleIcon />
      <span>{label}</span>
    </a>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M19.6 10.23c0-.68-.06-1.36-.16-2H10v3.78h5.4c-.24 1.28-.96 2.36-2.04 3.08v2.56h3.3c1.92-1.77 3.04-4.38 3.04-7.42z"
        fill="#4285F4"
      />
      <path
        d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.3-2.56c-.9.6-2.04.96-3.32.96-2.56 0-4.72-1.72-5.5-4.04H1.12v2.64A9.99 9.99 0 0010 20z"
        fill="#34A853"
      />
      <path
        d="M4.5 11.92A5.99 5.99 0 014.1 10c0-.68.12-1.34.32-1.92V5.44H1.12A9.99 9.99 0 000 10c0 1.64.4 3.18 1.12 4.56l3.38-2.64z"
        fill="#FBBC05"
      />
      <path
        d="M10 3.98c1.44 0 2.74.5 3.76 1.48l2.82-2.82C14.96.98 12.7 0 10 0 6.09 0 2.72 2.24 1.12 5.44l3.38 2.64C5.28 5.7 7.44 3.98 10 3.98z"
        fill="#EA4335"
      />
    </svg>
  );
}
