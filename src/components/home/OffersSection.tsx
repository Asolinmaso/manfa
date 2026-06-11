"use client";

import { useState } from "react";
import { offers } from "@/data/homeContent";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./OffersSection.module.css";

export function OffersSection() {
  return (
    <SectionContainer className={styles.section}>
      <h2 className={styles.heading}>Offers for You</h2>
      <div className={styles.grid}>
        {offers.map((offer) => (
          <OfferCard key={offer.code} offer={offer} />
        ))}
      </div>
    </SectionContainer>
  );
}

type Offer = (typeof offers)[number];

function OfferCard({ offer }: { offer: Offer }) {
  const [copied, setCopied] = useState(false);
  const isDark = offer.variant === "dark";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      className={`${styles.card} ${isDark ? styles.cardDark : styles.cardLight}`}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.iconCircle} ${isDark ? styles.iconLight : styles.iconDark}`}>
          <TagIcon />
        </div>
        <div>
          <h3 className={styles.cardTitle}>{offer.title}</h3>
          <p className={styles.cardSubtitle}>{offer.subtitle}</p>
        </div>
      </div>
      <hr className={styles.divider} />
      <p className={styles.code}>Use Code : {offer.code}</p>
      <button
        type="button"
        className={`${styles.copyBtn} ${isDark ? styles.copyLight : styles.copyDark}`}
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </article>
  );
}

function TagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 10L10 3L17 10L10 17L3 10Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="10" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}
