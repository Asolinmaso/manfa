"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ProductForm, type ProductFormData } from "./ProductForm";
import styles from "./AdminProductsClient.module.css";

// ── Types ──────────────────────────────────────────────────────────────────

export type AdminProduct = {
  _id: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  category: string;
  sizes: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
};

type Toast = {
  id: number;
  kind: "success" | "error";
  message: string;
};

// ── Component ──────────────────────────────────────────────────────────────

type AdminProductsClientProps = {
  adminName: string;
};

export function AdminProductsClient({ adminName }: AdminProductsClientProps) {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ── Fetch ────────────────────────────────────────────────────────────────

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setProducts(json.data ?? []);
    } catch {
      addToast("error", "Could not load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ── Toasts ───────────────────────────────────────────────────────────────

  function addToast(kind: "success" | "error", message: string) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }

  // ── Filtering ────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        categoryFilter === "All" || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, search, categoryFilter]);

  const stats = useMemo(() => {
    const active = products.filter((p) => p.isActive).length;
    const totalValue = products.reduce((acc, p) => acc + p.price, 0);
    return {
      total: products.length,
      active,
      inactive: products.length - active,
      categories: [...new Set(products.map((p) => p.category))].length,
      totalValue: `₹${totalValue.toLocaleString("en-IN")}`,
    };
  }, [products]);

  // ── Create ───────────────────────────────────────────────────────────────

  async function handleCreate(data: ProductFormData) {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      addToast("error", json.message ?? "Failed to create product");
      return;
    }
    addToast("success", `"${data.name}" added successfully`);
    setShowForm(false);
    fetchProducts();
  }

  // ── Update ───────────────────────────────────────────────────────────────

  async function handleUpdate(data: ProductFormData) {
    if (!editTarget) return;
    const res = await fetch(`/api/admin/products/${editTarget._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      addToast("error", json.message ?? "Failed to update product");
      return;
    }
    addToast("success", `"${data.name}" updated`);
    setEditTarget(null);
    fetchProducts();
  }

  // ── Delete ───────────────────────────────────────────────────────────────

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) {
        addToast("error", json.message ?? "Failed to delete product");
        return;
      }
      addToast("success", `"${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
      fetchProducts();
    } finally {
      setDeleting(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  const CATEGORIES = ["All", "New Arrivals", "Signature Pieces", "Men", "Women"];

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Product Management</h1>
          <p className={styles.subtitle}>Welcome back, {adminName}</p>
        </div>
        <button
          type="button"
          id="admin-add-product-btn"
          className={styles.addBtn}
          onClick={() => setShowForm(true)}
        >
          <PlusIcon />
          Add Product
        </button>
      </header>

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Products</p>
          <p className={styles.statValue}>{stats.total}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Active</p>
          <p className={styles.statValueGold}>{stats.active}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Inactive</p>
          <p className={styles.statValue}>{stats.inactive}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Categories</p>
          <p className={styles.statValue}>{stats.categories}</p>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        {/* Toolbar */}
        <div className={styles.tableToolbar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              id="admin-search-input"
              type="search"
              className={styles.searchInput}
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>

          <select
            id="admin-category-filter"
            className={styles.filterSelect}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Table body */}
        <div className={styles.tableWrap}>
          {loading ? (
            <div className={styles.loading}>
              <span className={styles.spinner} />
              Loading products…
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📦</div>
              <p className={styles.emptyText}>
                {search || categoryFilter !== "All"
                  ? "No products match your filters"
                  : "No products yet"}
              </p>
              <p className={styles.emptySubtext}>
                {search || categoryFilter !== "All"
                  ? "Try adjusting your search or filter"
                  : "Click "Add Product" to get started"}
              </p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Sizes</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product._id}>
                    {/* Product name + thumb */}
                    <td>
                      <div className={styles.nameCell}>
                        <ProductThumb src={product.image} name={product.name} />
                        <span className={styles.productName}>{product.name}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td>{product.category}</td>

                    {/* Price */}
                    <td>{product.priceLabel}</td>

                    {/* Sizes */}
                    <td>
                      <div className={styles.sizes}>
                        {product.sizes.length > 0
                          ? product.sizes.map((s) => (
                              <span key={s} className={styles.sizeTag}>{s}</span>
                            ))
                          : <span style={{ color: "#6b6b7b", fontSize: "0.8rem" }}>—</span>
                        }
                      </div>
                    </td>

                    {/* Rating */}
                    <td>
                      ★ {product.rating.toFixed(1)}{" "}
                      <span style={{ color: "#6b6b7b", fontSize: "0.8rem" }}>
                        ({product.reviewCount})
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={
                          product.isActive ? styles.badgeActive : styles.badgeInactive
                        }
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.editBtn}
                          onClick={() => setEditTarget(product)}
                          aria-label={`Edit ${product.name}`}
                        >
                          <EditIcon />
                          Edit
                        </button>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => setDeleteTarget(product)}
                          aria-label={`Delete ${product.name}`}
                        >
                          <TrashIcon />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <ProductForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Edit Form Modal */}
      {editTarget && (
        <ProductForm
          isEdit
          initialData={{
            name: editTarget.name,
            price: editTarget.price,
            priceLabel: editTarget.priceLabel,
            image: editTarget.image,
            category: editTarget.category,
            sizes: editTarget.sizes,
            rating: editTarget.rating,
            reviewCount: editTarget.reviewCount,
            isActive: editTarget.isActive,
          }}
          onSubmit={handleUpdate}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className={styles.overlay}>
          <div className={styles.confirmCard} role="dialog" aria-modal="true">
            <h2 className={styles.confirmTitle}>Delete Product?</h2>
            <p className={styles.confirmText}>
              Are you sure you want to permanently delete{" "}
              <strong style={{ color: "#f1f0ef" }}>{deleteTarget.name}</strong>?
              This will also remove it from the shop immediately.
            </p>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                id="admin-confirm-delete-btn"
                className={styles.confirmDeleteBtn}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className={styles.toastWrap} aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={t.kind === "success" ? styles.toastSuccess : styles.toastError}
          >
            {t.kind === "success" ? "✓" : "✕"} {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ProductThumb({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className={styles.thumbPlaceholder}>🖼</div>;
  }

  return (
    <div className={styles.thumbWrap}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className={styles.thumb}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path
        d="M9.5 1.5l2 2L4 11H2v-2L9.5 1.5z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path
        d="M1.5 3.5h10M5 3.5V2.5h3v1M3 3.5l.75 7h5.5l.75-7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
