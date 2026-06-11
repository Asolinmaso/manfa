"use client";

import { useState } from "react";
import { brandTagline, footerLinks, images } from "@/data/homeContent";
import { SafeImage } from "@/components/ui/SafeImage";
import styles from "./Footer.module.css";

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            {!logoError ? (
              <SafeImage
                src={images.logo}
                alt="Manfa"
                width={207}
                height={76}
                className={styles.logo}
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className={styles.logoText}>manfa</span>
            )}
            <p className={styles.tagline}>{brandTagline}</p>
            <div className={styles.social}>
              <SocialLink label="Instagram" href="#">
                <InstagramIcon />
              </SocialLink>
              <SocialLink label="Facebook" href="#">
                <FacebookIcon />
              </SocialLink>
              <SocialLink label="LinkedIn" href="#">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink label="WhatsApp" href="#">
                <WhatsAppIcon />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title="Quick Links" links={footerLinks.quickLinks} />
          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Support" links={footerLinks.support} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className={styles.divider}>
          <DecorativeLine />
          <span className={styles.dividerText}>Wear The Change</span>
          <DecorativeLine />
        </div>

        <p className={styles.copyright}>
          © 2026 Manfa. All rights reserved. | Designed &amp; Developed By Manvian
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={styles.socialLink} aria-label={label}>
      {children}
    </a>
  );
}

function DecorativeLine() {
  return (
    <div className={styles.decorativeLine} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={styles.decorativeGroup}>
          <span className={styles.dot} />
          <StarIcon />
        </span>
      ))}
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="3" y="3" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M14 8H16V5H14C11.8 5 10 6.8 10 9V11H8V14H10V21H13V14H15.5L16 11H13V9.5C13 8.7 13.7 8 14 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="3" y="3" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V18M8 8V8.01M13 18V14C13 12.3 14.3 11 16 11C17.7 11 19 12.3 19 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M13 3C7.5 3 3 7.5 3 13C3 14.8 3.4 16.5 4.1 18L3 23L8.2 21.9C9.7 22.5 11.3 22.9 13 22.9C18.5 22.9 23 18.4 23 12.9C23 7.4 18.5 3 13 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 10.5C9.3 11.8 10.5 14 13 15.5C15.2 16.8 17 17 17.5 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
