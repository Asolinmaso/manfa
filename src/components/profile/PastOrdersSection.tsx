import type { OrderItem } from "@/data/ordersContent";
import { OrderItemsTable } from "@/components/profile/OrderItemsTable";
import styles from "./PastOrdersSection.module.css";

type PastOrdersSectionProps = {
  items: OrderItem[];
};

export function PastOrdersSection({ items }: PastOrdersSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="past-orders-heading">
      <h2 id="past-orders-heading" className={styles.heading}>
        Past Orders
      </h2>
      <div className={styles.divider} />
      <div className={styles.tableWrap}>
        <OrderItemsTable items={items} variant="past" />
      </div>
    </section>
  );
}
