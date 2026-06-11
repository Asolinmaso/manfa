"use client";

import { forwardRef, useState } from "react";
import styles from "./AuthInput.module.css";
import alertStyles from "./AuthAlert.module.css";

type AuthInputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  name?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
};

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput(
    {
      id,
      label,
      type = "text",
      name,
      autoComplete,
      error,
      disabled,
      ...rest
    },
    ref,
  ) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className={styles.wrapper}>
        <div className={`${styles.field} ${error ? styles.fieldInvalid : ""}`}>
          <input
            ref={ref}
            id={id}
            name={name ?? id}
            type={inputType}
            placeholder={label}
            autoComplete={autoComplete}
            disabled={disabled}
            className={styles.input}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              <EyeIcon hidden={showPassword} />
            </button>
          )}
        </div>
        {error ? (
          <p id={`${id}-error`} className={alertStyles.fieldError}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

function EyeIcon({ hidden }: { hidden: boolean }) {
  if (hidden) {
    return (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
        <path
          d="M1 8C1 8 4.5 1 11 1C17.5 1 21 8 21 8C21 8 17.5 15 11 15C4.5 15 1 8 1 8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="11" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
      <path
        d="M1 1L21 15M8.5 8.5C8.2 9.2 8 10 8 11C8 13.2 9.3 15 11 15C11.7 15 12.4 14.8 13 14.5M4 4.5C2.5 5.8 1.3 7.2 1 8C1 8 4.5 15 11 15C12.5 15 13.9 14.6 15.1 14M17 11.5C18.5 10.2 19.7 8.8 20 8C20 8 16.5 1 11 1C9.8 1 8.7 1.2 7.7 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
