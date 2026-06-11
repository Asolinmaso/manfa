export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "#contact" },
];

export function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}
