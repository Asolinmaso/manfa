import { shopProducts, type ShopProduct } from "@/data/shopContent";

export type WishlistItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
};

export const wishlistItems: WishlistItem[] = [
  {
    id: "wl-1",
    name: "Royal Navy Textured Shirt",
    description:
      "Premium Cotton Blend · Slim Fit · Blue Checkered · Button-Down · Machine Washable",
    price: 2499,
    priceLabel: "₹2,499",
    image: "/home/Men.png",
  },
  {
    id: "wl-2",
    name: "Charcoal Utility Overshirt",
    description:
      "Heavyweight Cotton · Relaxed Fit · Charcoal Grey · Patch Pockets · Machine Washable",
    price: 5990,
    priceLabel: "₹5,990",
    image: "/shop/product-4.png",
  },
];

export const similarProducts: ShopProduct[] = shopProducts.slice(0, 4);
