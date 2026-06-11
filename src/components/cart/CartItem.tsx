import { SafeImage } from "@/components/ui/SafeImage";
import type { CartItem as CartItemType } from "@/data/cartContent";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import styles from "./CartItem.module.css";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.imageWrap}>
        <SafeImage
          src={item.image}
          alt={item.name}
          width={200}
          height={189}
          className={styles.image}
        />
      </div>

      <div className={styles.details}>
        <div className={styles.header}>
          <h3 className={styles.name}>{item.name}</h3>
          <div className={styles.iconActions}>
            <button type="button" className={styles.iconBtn} aria-label="Remove from cart">
              <DeleteIcon />
            </button>
            <button type="button" className={styles.iconBtn} aria-label="Share product">
              <ShareIcon />
            </button>
          </div>
        </div>

        <p className={styles.description}>{item.description}</p>

        <div className={styles.footer}>
          <p className={styles.price}>{item.priceLabel}</p>
          <QuantitySelector initialQuantity={item.quantity} />
        </div>
      </div>
    </article>
  );
}

function DeleteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6H5H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
