import { connectDB } from "@/lib/db/mongoose";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { Product } from "@/models/Product";

/**
 * GET /api/products
 *
 * Public endpoint — returns all active products for the shop page.
 * No authentication required.
 */
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    // Normalize _id → id for frontend compatibility
    const normalized = products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      priceLabel: p.priceLabel,
      image: p.image,
      category: p.category,
      sizes: p.sizes,
      rating: p.rating,
      reviewCount: p.reviewCount,
    }));

    return jsonSuccess(normalized);
  } catch (error) {
    console.error("Public GET products error:", error);
    return jsonError("Failed to fetch products", 500);
  }
}
