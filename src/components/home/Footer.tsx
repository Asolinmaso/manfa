"use client";

import { useState } from "react";
import Image from "next/image";
import { brandTagline, footerLinks, images } from "@/data/homeContent";
import { SafeImage } from "@/components/ui/SafeImage";
import igIcon from "@/icons/ig.png";
import fbIcon from "@/icons/fb.png";
import inIcon from "@/icons/in.png";
import waIcon from "@/icons/wa.png";
import ellipseIcon from "@/icons/Ellipse 5.png";
import starIcon from "@/icons/Star 5.png";
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
                <Image src={igIcon} alt="" width={60} height={60} />
              </SocialLink>
              <SocialLink label="Facebook" href="#">
                <Image src={fbIcon} alt="" width={60} height={60} />
              </SocialLink>
              <SocialLink label="LinkedIn" href="#">
                <Image src={inIcon} alt="" width={60} height={60} />
              </SocialLink>
              <SocialLink label="WhatsApp" href="#">
                <Image src={waIcon} alt="" width={60} height={60} />
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
          <DecorativeLine startWithStar />
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

function DecorativeLine({ startWithStar = false }: { startWithStar?: boolean }) {
  return (
    <div className={styles.decorativeLine} aria-hidden>
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className={styles.decorativeGroup}>
          {startWithStar ? (
            <>
              <Image src={starIcon} alt="" width={24} height={24} />
              <Image src={ellipseIcon} alt="" width={6} height={6} className={styles.dot} />
            </>
          ) : (
            <>
              <Image src={ellipseIcon} alt="" width={6} height={6} className={styles.dot} />
              <Image src={starIcon} alt="" width={24} height={24} />
            </>
          )}
        </span>
      ))}
    </div>
  );
}
