"use client";

import { useState, useEffect } from "react";
import styles from "./ProductForm.module.css";

const CATEGORIES = [
  "New Arrivals",
  "Signature Pieces",
  "Men",
  "Women",
] as const;

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export type ProductFormData = {
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  category: string;
  sizes: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
};

type ProductFormProps = {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onClose: () => void;
  isEdit?: boolean;
};

const EMPTY: ProductFormData = {
  name: "",
  price: 0,
  priceLabel: "",
  image: "",
  category: "New Arrivals",
  sizes: [],
  rating: 0,
  reviewCount: 0,
  isActive: true,
};

export function ProductForm({
  initialData,
  onSubmit,
  onClose,
  isEdit = false,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    ...EMPTY,
    ...initialData,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [imagePreviewSrc, setImagePreviewSrc] = useState(initialData?.image ?? "");

  // Auto-generate priceLabel when price changes
  useEffect(() => {
    if (form.price > 0) {
      setForm((prev) => ({
        ...prev,
        priceLabel: `₹${form.price.toLocaleString("en-IN")}`,
      }));
    }
  }, [form.price]);

  // Update preview
  useEffect(() => {
    setImagePreviewSrc(form.image);
  }, [form.image]);

  function set<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleSize(size: string) {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  }

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (form.price <= 0) errs.price = "Price must be greater than 0";
    if (!form.image.trim()) errs.image = "Image URL is required";
    else {
      try { new URL(form.image); }
      catch { errs.image = "Must be a valid URL"; }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={isEdit ? "Edit product" : "Add product"}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pf-name">
              Product Name <span className={styles.required}>*</span>
            </label>
            <input
              id="pf-name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.error : ""}`}
              placeholder="e.g. Midnight Wrap Dress"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              maxLength={120}
            />
            {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
          </div>

          {/* Price + Category */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pf-price">
                Price (₹) <span className={styles.required}>*</span>
              </label>
              <input
                id="pf-price"
                type="number"
                className={`${styles.input} ${errors.price ? styles.error : ""}`}
                placeholder="6990"
                value={form.price || ""}
                min={0}
                onChange={(e) => set("price", Number(e.target.value))}
              />
              {errors.price && <p className={styles.errorMsg}>{errors.price}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="pf-category">
                Category
              </label>
              <select
                id="pf-category"
                className={styles.select}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pf-image">
              Image URL <span className={styles.required}>*</span>
            </label>
            <input
              id="pf-image"
              type="url"
              className={`${styles.input} ${errors.image ? styles.error : ""}`}
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
            />
            {errors.image && <p className={styles.errorMsg}>{errors.image}</p>}
            {imagePreviewSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreviewSrc}
                alt="Preview"
                className={styles.imagePreview}
                onError={() => setImagePreviewSrc("")}
              />
            )}
          </div>

          {/* Rating + Review Count */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pf-rating">
                Rating (0–5)
              </label>
              <input
                id="pf-rating"
                type="number"
                className={styles.input}
                placeholder="4.8"
                value={form.rating || ""}
                min={0}
                max={5}
                step={0.1}
                onChange={(e) => set("rating", Number(e.target.value))}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="pf-reviews">
                Review Count
              </label>
              <input
                id="pf-reviews"
                type="number"
                className={styles.input}
                placeholder="120"
                value={form.reviewCount || ""}
                min={0}
                onChange={(e) => set("reviewCount", Number(e.target.value))}
              />
            </div>
          </div>

          {/* Sizes */}
          <div className={styles.field}>
            <span className={styles.label}>Available Sizes</span>
            <div className={styles.sizesGrid}>
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={
                    form.sizes.includes(size)
                      ? styles.sizeBtnActive
                      : styles.sizeBtn
                  }
                  onClick={() => toggleSize(size)}
                  aria-pressed={form.sizes.includes(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Active Toggle */}
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabel}>
              <span className={styles.toggleTitle}>Active / Visible</span>
              <span className={styles.toggleSub}>
                Inactive products are hidden from the shop
              </span>
            </div>
            <label className={styles.toggle} aria-label="Toggle product visibility">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => set("isActive", e.target.checked)}
              />
              <span className={styles.toggleTrack} />
            </label>
          </div>

          {/* Footer */}
          <div className={styles.formFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting
                ? isEdit ? "Saving…" : "Adding…"
                : isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
