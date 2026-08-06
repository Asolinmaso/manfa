import Image from "next/image";
import { authImages, authTagline } from "@/data/authContent";
import styles from "./AuthBranding.module.css";

export function AuthBranding() {
  return (
    <aside className={styles.branding}>
      <Image
        src={authImages.sidePanel}
        alt=""
        fill
        priority
        sizes="(max-width: 900px) 100vw, 464px"
        className={`${styles.background} anim-kenburns-slow`}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <Image
          src={authImages.logo}
          alt="Manfa"
          width={199}
          height={73}
          priority
          className={`${styles.logo} anim-fade-down`}
          style={{ "--anim-delay": "300ms" } as React.CSSProperties}
        />
        <p className={`${styles.tagline} anim-fade-up`} style={{ "--anim-delay": "500ms" } as React.CSSProperties}>
          {authTagline}
        </p>
      </div>
    </aside>
  );
}
