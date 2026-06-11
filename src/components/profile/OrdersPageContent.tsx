import { activeOrder, pastOrderItems } from "@/data/ordersContent";
import { OrderSummaryCard } from "@/components/profile/OrderSummaryCard";
import { PastOrdersSection } from "@/components/profile/PastOrdersSection";
import styles from "./OrdersPageContent.module.css";

export function OrdersPageContent() {
  return (
    <div className={styles.content}>
      <OrderSummaryCard order={activeOrder} />
      <PastOrdersSection items={pastOrderItems} />
    </div>
  );
}
