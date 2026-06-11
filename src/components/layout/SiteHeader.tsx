"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav, isInternalHref } from "@/data/navigation";
import { images } from "@/data/homeContent";
import { cartCount as defaultCartCount } from "@/data/cartContent";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  variant: "overlay" | "solid";
  activeHref?: string;
  cartCount?: number;
};

export function SiteHeader({
  variant,
  activeHref = "/",
  cartCount = defaultCartCount,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const isSolid = variant === "solid";

  return (
    <header
      className={`${styles.header} ${isSolid ? styles.headerSolid : styles.headerOverlay}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          {!logoError ? (
            <SafeImage
              src={images.logo}
              alt="Manfa"
              width={109}
              height={40}
              className={styles.logoImage}
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className={styles.logoText}>manfa</span>
          )}
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""} ${isSolid ? styles.navSolid : ""}`}
        >
          <ul className={styles.navList}>
            {mainNav.map((link) => {
              const isActive = link.href === activeHref;
              const className = isActive ? styles.navActive : styles.navLink;

              return (
                <li key={link.label}>
                  {isInternalHref(link.href) ? (
                    <Link
                      href={link.href}
                      className={className}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className={className}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <label className={styles.search}>
            <SearchIcon />
            <input
              type="search"
              placeholder="Search for products..."
              aria-label="Search for products"
            />
          </label>

          {isSolid ? (
            <div className={styles.iconActions}>
              <IconButton label="Wishlist" href="/wishlist">
                <HeartIcon />
              </IconButton>
              <IconButton
                label="Cart"
                href="/cart"
                badge={cartCount > 0 ? String(cartCount).padStart(2, "0") : undefined}
              >
                <CartIcon />
              </IconButton>
              <IconButton label="Profile" href="/account">
                <ProfileIcon />
              </IconButton>
            </div>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              Log In
            </Link>
          )}

          <button
            type="button"
            className={styles.menuToggle}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  label,
  href,
  children,
  badge,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <Link href={href} className={styles.iconBtn} aria-label={label}>
      {children}
      {badge ? <span className={styles.cartBadge}>{badge}</span> : null}
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="27" height="24" viewBox="0 0 27 24" fill="none" aria-hidden>
      <path
        d="M13.5 21.5L2.5 10.5C0.5 8.5 0.5 5.5 2.5 3.5C4.5 1.5 7.5 1.5 9.5 3.5L13.5 7.5L17.5 3.5C19.5 1.5 22.5 1.5 24.5 3.5C26.5 5.5 26.5 8.5 24.5 10.5L13.5 21.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden>
      <path
        d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M1 1H5L7.5 15H22L25 5H7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden>
      <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 22C3 17.5817 6.58172 14 11 14C15.4183 14 19 17.5817 19 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
