"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./SafeImage.module.css";

type SafeImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onError?: () => void;
};

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  priority,
  sizes,
  onError,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div
        className={`${styles.placeholder} ${fill ? styles.fill : ""} ${className}`}
        aria-label={alt}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        onError={handleError}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={handleError}
    />
  );
}
