export type OrderItem = {
  id: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  quantityLabel: string;
  totalPriceLabel: string;
  image: string;
};

export type ActiveOrder = {
  orderId: string;
  placedDate: string;
  expectedDelivery: string;
  itemCount: number;
  itemCountLabel: string;
  status: string;
  items: OrderItem[];
};

const royalNavyShirtItem: Omit<OrderItem, "id"> = {
  name: "Royal Navy Textured Shirt",
  color: "Blue",
  size: "L",
  quantity: 1,
  quantityLabel: "01",
  totalPriceLabel: "₹2,499",
  image: "/home/Men.png",
};

export const activeOrder: ActiveOrder = {
  orderId: "ORD1207895",
  placedDate: "May 08, 2025",
  expectedDelivery: "May 13, 2025",
  itemCount: 2,
  itemCountLabel: "2 Items",
  status: "In Progress",
  items: [
    { id: "active-item-1", ...royalNavyShirtItem },
    { id: "active-item-2", ...royalNavyShirtItem },
  ],
};

export const pastOrderItems: OrderItem[] = [
  { id: "past-item-1", ...royalNavyShirtItem },
  { id: "past-item-2", ...royalNavyShirtItem },
];
