import type { ActiveOrder } from "@/data/ordersContent";
import { OrderItemsTable } from "@/components/profile/OrderItemsTable";
import styles from "./OrderSummaryCard.module.css";

type OrderSummaryCardProps = {
  order: ActiveOrder;
};

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  const summaryFields = [
    { label: "Order ID", value: order.orderId },
    { label: "Order Placed", value: order.placedDate },
    { label: "Expected Delivery", value: order.expectedDelivery },
    { label: "No. of Items", value: order.itemCountLabel },
    { label: "Status", value: order.status },
  ];

  return (
    <section className={styles.card} aria-labelledby="active-order-heading">
      <div className={styles.summary}>
        {summaryFields.map((field) => (
          <div key={field.label} className={styles.field}>
            <span className={styles.label}>{field.label}</span>
            <span className={styles.value}>{field.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.itemsSection}>
        <h2 id="active-order-heading" className={styles.heading}>
          Items From Order
        </h2>
        <OrderItemsTable items={order.items} variant="active" />
      </div>
    </section>
  );
}
