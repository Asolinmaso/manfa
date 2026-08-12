"use client";

import Image from "next/image";
import { useState } from "react";
import { offers } from "@/data/homeContent";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import styles from "./OffersSection.module.css";
import getIcon from "@/icons/get.png";
import freeIcon from "@/icons/free.png";

export function OffersSection() {
  return (
    <SectionContainer className={styles.section}>
      <Reveal variant="up">
        <h2 className={styles.heading}>Offers for You</h2>
      </Reveal>
      <div className={styles.grid}>
        {offers.map((offer, index) => (
          <Reveal key={offer.code} variant="up" delay={index * 130} className={styles.cardReveal}>
            <OfferCard offer={offer} />
          </Reveal>
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
          <Image
            src={offer.title.includes("Free Shipping") ? freeIcon : getIcon}
            alt=""
            width={50}
            height={50}
          />
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
