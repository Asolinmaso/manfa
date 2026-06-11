import { shopProducts, type ShopProduct } from "@/data/shopContent";

export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
  quantity: number;
};

const royalNavyShirt: Omit<CartItem, "id"> = {
  name: "Royal Navy Textured Shirt",
  description:
    "Premium Cotton Blend · Slim Fit · Blue Checkered · Button-Down · Machine Washable",
  price: 2499,
  priceLabel: "₹2,499",
  image: "/home/Men.png",
  quantity: 1,
};

export const cartItems: CartItem[] = [
  { id: "cart-1", ...royalNavyShirt },
  { id: "cart-2", ...royalNavyShirt },
];

export const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

export const cartCountLabel = String(cartCount).padStart(2, "0");

export const priceBreakdown = {
  itemCount: cartCount,
  subtotal: 1149,
  subtotalLabel: "₹1,149",
  discount: 200,
  discountLabel: "₹200",
  delivery: 50,
  deliveryLabel: "₹50",
  total: 1199,
  totalLabel: "₹1,199",
};

export const similarProducts: ShopProduct[] = [
  shopProducts[0],
  shopProducts[1],
  shopProducts[2],
  { ...shopProducts[2], id: "3-duplicate" },
];
