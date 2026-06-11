"use client";

import { priceBreakdown } from "@/data/cartContent";
import styles from "./PriceSummary.module.css";

export function PriceSummary() {
  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>Price Details</h2>
      <hr className={styles.divider} />

      <div className={styles.rows}>
        <div className={styles.row}>
          <span>Price ({priceBreakdown.itemCount} Items)</span>
          <span>{priceBreakdown.subtotalLabel}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>
            <span className={styles.rowIcon} aria-hidden>
              −
            </span>
            Discount
          </span>
          <span className={styles.discount}>− {priceBreakdown.discountLabel}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>
            <span className={styles.rowIcon} aria-hidden>
              +
            </span>
            Delivery Charges
          </span>
          <span>{priceBreakdown.deliveryLabel}</span>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.totalRow}>
        <span>Total</span>
        <span>{priceBreakdown.totalLabel}</span>
      </div>

      <div className={styles.coupon}>
        <p className={styles.couponLabel}>Have coupon code?</p>
        <form className={styles.couponForm} onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            className={styles.couponInput}
            placeholder="Enter Code"
            aria-label="Coupon code"
          />
          <button type="submit" className={styles.applyBtn}>
            Apply
          </button>
        </form>
      </div>

      <button type="button" className={styles.checkoutBtn}>
        Checkout
      </button>
    </aside>
  );
}
