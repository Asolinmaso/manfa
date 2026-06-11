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
        className={styles.background}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <Image
          src={authImages.logo}
          alt="Manfa"
          width={199}
          height={73}
          priority
          className={styles.logo}
        />
        <p className={styles.tagline}>{authTagline}</p>
      </div>
    </aside>
  );
}
