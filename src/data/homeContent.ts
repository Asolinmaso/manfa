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
    href: "#women",
    image: "/home/Women.png",
  },
  {
    title: "Men",
    description: "Refined essentials for every occasion.",
    cta: "Explore Men Collection",
    href: "#men",
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
    image: "/home/new-arrivals-1.png",
  },
  {
    name: "Charcoal Utility Overshirt",
    price: "₹5,990",
    image: "/home/new-arrivals-2.png",
  },
  {
    name: "Midnight Wrap Dress",
    price: "₹5,990",
    image: "/home/new-arrivals-3.png",
  },
  {
    name: "Camel Knit Polo",
    price: "₹5,990",
    image: "/home/new-arrivals-4.png",
  },
  {
    name: "Emerald Tailored Suit",
    price: "₹5,990",
    image: "/home/new-arrivals-5.png",
  },
] as const;

export const signaturePieces = [
  {
    name: "Women's Ivory Power Suit",
    price: "₹8,990",
    image: "/home/signature-1.png",
  },
  {
    name: "Men's Burgundy Blazer",
    price: "₹7,490",
    image: "/home/signature-2.png",
  },
  {
    name: "Midnight Navy Dress",
    price: "₹6,990",
    image: "/home/signature-3.png",
  },
  {
    name: "Men's Charcoal Overshirt",
    price: "₹5,990",
    image: "/home/signature-4.png",
  },
] as const;

export const occasions = [
  {
    title: "Work",
    description: "Tailored essentials for modern professionals.",
    image: "/home/occasion-work.png",
  },
  {
    title: "Weekend",
    description: "Relaxed pieces with timeless appeal.",
    image: "/home/occasion-weekend.png",
  },
  {
    title: "Travel",
    description: "Designed for movement and versatility.",
    image: "/home/occasion-travel.png",
  },
] as const;

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "#contact" },
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
  philosophyFabric: "/home/philosophy-fabric.png",
} as const;

export const brandTagline =
  "Minimal. Timeless. Purposeful. Designed for changing every lifestyle";
