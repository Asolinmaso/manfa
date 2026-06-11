export type ShopCategory =
  | "New Arrivals"
  | "Signature Pieces"
  | "Men"
  | "Women";

export type ShopProduct = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  category: ShopCategory;
  rating: number;
  reviewCount: number;
  sizes: string[];
};

export const shopCategories: ShopCategory[] = [
  "New Arrivals",
  "Signature Pieces",
  "Men",
  "Women",
];

export const shopSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export const priceRangeDefaults = {
  min: 100,
  max: 10000,
} as const;

export const shopProducts: ShopProduct[] = [
  {
    id: "1",
    name: "Midnight Wrap Dress",
    price: 6990,
    priceLabel: "₹6,990",
    image: "/shop/product-1.png",
    category: "New Arrivals",
    rating: 4.8,
    reviewCount: 120,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Camel Knit Polo",
    price: 6990,
    priceLabel: "₹6,990",
    image: "/shop/product-2.png",
    category: "New Arrivals",
    rating: 4.8,
    reviewCount: 120,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    name: "Midnight Navy Dress",
    price: 6990,
    priceLabel: "₹6,990",
    image: "/shop/product-3.png",
    category: "New Arrivals",
    rating: 4.8,
    reviewCount: 120,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "4",
    name: "Charcoal Utility Overshirt",
    price: 5990,
    priceLabel: "₹5,990",
    image: "/shop/product-4.png",
    category: "Men",
    rating: 4.7,
    reviewCount: 98,
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "5",
    name: "Emerald Tailored Suit",
    price: 5990,
    priceLabel: "₹5,990",
    image: "/shop/product-5.png",
    category: "Men",
    rating: 4.9,
    reviewCount: 64,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "6",
    name: "Women's Ivory Power Suit",
    price: 8990,
    priceLabel: "₹8,990",
    image: "/shop/product-6.png",
    category: "Women",
    rating: 4.8,
    reviewCount: 86,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "7",
    name: "Men's Burgundy Blazer",
    price: 7490,
    priceLabel: "₹7,490",
    image: "/home/Men.png",
    category: "Signature Pieces",
    rating: 4.8,
    reviewCount: 112,
    sizes: ["M", "L", "XL"],
  },
  {
    id: "8",
    name: "Men's Charcoal Overshirt",
    price: 5990,
    priceLabel: "₹5,990",
    image: "/home/Explore.png",
    category: "Signature Pieces",
    rating: 4.6,
    reviewCount: 74,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "9",
    name: "Timeless Linen Blazer",
    price: 8490,
    priceLabel: "₹8,490",
    image: "/home/Women.png",
    category: "Women",
    rating: 4.7,
    reviewCount: 55,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "10",
    name: "Sandstone Trench Coat",
    price: 9990,
    priceLabel: "₹9,990",
    image: "/home/Banner.png",
    category: "New Arrivals",
    rating: 4.9,
    reviewCount: 42,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "11",
    name: "Olive Utility Jacket",
    price: 6490,
    priceLabel: "₹6,490",
    image: "/home/Men.png",
    category: "Men",
    rating: 4.5,
    reviewCount: 38,
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "12",
    name: "Ivory Pleated Skirt",
    price: 4490,
    priceLabel: "₹4,490",
    image: "/home/Women.png",
    category: "Women",
    rating: 4.8,
    reviewCount: 91,
    sizes: ["XS", "S", "M", "L"],
  },
];

export const productsPerPage = 6;
