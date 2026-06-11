"use client";

import { useState } from "react";
import styles from "./QuantitySelector.module.css";

type QuantitySelectorProps = {
  initialQuantity?: number;
  min?: number;
};

export function QuantitySelector({ initialQuantity = 1, min = 1 }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  return (
    <div className={styles.selector}>
      <button
        type="button"
        className={styles.btn}
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={() => setQuantity((current) => Math.max(min, current - 1))}
      >
        −
      </button>
      <span className={styles.value} aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className={styles.btn}
        aria-label="Increase quantity"
        onClick={() => setQuantity((current) => current + 1)}
      >
        +
      </button>
    </div>
  );
}
