import { SafeImage } from "@/components/ui/SafeImage";
import type { OrderItem } from "@/data/ordersContent";
import styles from "./OrderItemsTable.module.css";

type OrderItemsTableProps = {
  items: OrderItem[];
  variant: "active" | "past";
};

export function OrderItemsTable({ items, variant }: OrderItemsTableProps) {
  const showActions = variant === "past";

  return (
    <div className={styles.table} role="table">
      <div className={`${styles.headerRow} ${showActions ? styles.headerPast : ""}`} role="row">
        <div className={styles.productCol} role="columnheader">
          Product
        </div>
        <div className={styles.quantityCol} role="columnheader">
          Quantity
        </div>
        <div className={styles.priceCol} role="columnheader">
          Total Price
        </div>
        {showActions && (
          <div className={styles.actionCol} role="columnheader">
            Action
          </div>
        )}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.bodyRow} ${showActions ? styles.bodyPast : ""}`}
          role="row"
        >
          <div className={styles.productCol} role="cell">
            <div className={styles.productCell}>
              <div className={styles.imageWrap}>
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className={styles.image}
                />
              </div>
              <div className={styles.productInfo}>
                <p className={styles.productName}>{item.name}</p>
                <p className={styles.productMeta}>Color - {item.color}</p>
                <p className={styles.productMeta}>Size - {item.size}</p>
              </div>
            </div>
          </div>
          <div className={styles.quantityCol} role="cell">
            <span className={styles.cellValue}>{item.quantityLabel}</span>
          </div>
          <div className={styles.priceCol} role="cell">
            <span className={styles.cellValue}>{item.totalPriceLabel}</span>
          </div>
          {showActions && (
            <div className={styles.actionCol} role="cell">
              <div className={styles.actions}>
                <button type="button" className={styles.actionBtn}>
                  View Details
                </button>
                <button type="button" className={styles.actionBtn}>
                  Invoice
                </button>
                <button type="button" className={styles.actionBtn}>
                  Buy Again
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
