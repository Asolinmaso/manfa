import p1 from "@/imgs/p1.png";
import p2 from "@/imgs/p2.png";
import p3 from "@/imgs/p3.png";
import p4 from "@/imgs/p4.png";
import p5 from "@/imgs/p5.png";
import p6 from "@/imgs/p6.png";
import p7 from "@/imgs/p7.png";
import p8 from "@/imgs/p8.png";
import p9 from "@/imgs/p9.png";
import p10 from "@/imgs/p10.png";
import p11 from "@/imgs/p11.png";

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

/** @deprecated Use mainNav from @/data/navigation */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "#contact" },
];

export const valueProps = [
  {
    title: "Timeless Design",
    description: "Refined essentials created beyond seasons and trends.",
  },
  {
    title: "Exceptional Craftsmanship",
    description: "Meticulously crafted for enduring quality and comfort.",
  },
  {
    title: "Intentional Living",
    description: "Designed to support a more conscious wardrobe.",
  },
] as const;

export const categories = [
  {
    title: "Women",
    description: "Timeless silhouettes for modern living.",
    cta: "Explore Women Collection",
    href: "/shop",
    image: "/home/Women.png",
  },
  {
    title: "Men",
    description: "Refined essentials for every occasion.",
    cta: "Explore Men Collection",
    href: "/shop",
    image: "/home/Men.png",
  },
] as const;

export const offers = [
  {
    title: "Get ₹200 OFF",
    subtitle: "On Your 1st Order",
    code: "MANFA200",
    variant: "light" as const,
  },
  {
    title: "Free Shipping",
    subtitle: "On Order Above ₹2,999",
    code: "FREESHIP01",
    variant: "dark" as const,
  },
  {
    title: "Get 15% OFF",
    subtitle: "On Order Above ₹3,999",
    code: "MANFA15",
    variant: "light" as const,
  },
] as const;

export const newArrivals = [
  {
    name: "Emerald Tailored Suit",
    price: "₹5,990",
    image: p1,
  },
  {
    name: "Charcoal Utility Overshirt",
    price: "₹5,990",
    image: p2,
  },
  {
    name: "Midnight Wrap Dress",
    price: "₹5,990",
    image: p3,
  },
  {
    name: "Camel Knit Polo",
    price: "₹5,990",
    image: p4,
  },
  {
    name: "Emerald Tailored Suit",
    price: "₹5,990",
    image: p1,
  },
] as const;

export const signaturePieces = [
  {
    name: "Women's Ivory Power Suit",
    price: "₹8,990",
    image: p5,
  },
  {
    name: "Men's Burgundy Blazer",
    price: "₹7,490",
    image: p6,
  },
  {
    name: "Midnight Navy Dress",
    price: "₹6,990",
    image: p7,
  },
  {
    name: "Men's Charcoal Overshirt",
    price: "₹5,990",
    image: p8,
  },
] as const;

export const occasions = [
  {
    title: "Work",
    description: "Tailored essentials for\nmodern professionals.",
    image: p9,
  },
  {
    title: "Weekend",
    description: "Relaxed pieces with\ntimeless appeal.",
    image: p10,
  },
  {
    title: "Travel",
    description: "Designed for movement\nand versatility.",
    image: p11,
  },
] as const;

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact" },
  ],
  shop: [
    { label: "Men", href: "#men" },
    { label: "Women", href: "#women" },
    { label: "New Arrivals", href: "#new-arrivals" },
    { label: "Signature Pieces", href: "#signature-pieces" },
  ],
  support: [
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Cancellation", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Term & Conditions", href: "#" },
  ],
} as const;

export const images = {
  logo: "/home/logo.png",
  hero: "/home/Banner.png",
  explore: "/home/Explore.png",
  philosophyFabric: "/home/Men.png",
} as const;

export const brandTagline =
  "Minimal. Timeless. Purposeful.\nDesigned for changing every\nlifestyle";
