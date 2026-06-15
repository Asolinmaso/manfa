import { connectDB } from "@/lib/db/mongoose";
import { requireRole } from "@/lib/auth/rbac";
import { jsonError, jsonSuccess, zodErrorResponse } from "@/lib/api/response";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1).max(120),
  price: z.number().min(0),
  priceLabel: z.string().min(1),
  image: z.string().url("Image must be a valid URL"),
  category: z.enum(["New Arrivals", "Signature Pieces", "Men", "Women"]),
  sizes: z.array(z.enum(["XS", "S", "M", "L", "XL", "XXL"])).default([]),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().min(0).int().default(0),
  isActive: z.boolean().default(true),
});

/** GET /api/admin/products — list all products (admin only) */
export async function GET(request: Request) {
  const auth = await requireRole("admin");
  if (auth instanceof Response) return auth;

  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return jsonSuccess(products);
  } catch (error) {
    console.error("Admin GET products error:", error);
    return jsonError("Failed to fetch products", 500);
  }
}

/** POST /api/admin/products — create a product (admin only) */
export async function POST(request: Request) {
  const auth = await requireRole("admin");
  if (auth instanceof Response) return auth;

  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    await connectDB();
    const product = await Product.create(parsed.data);
    return jsonSuccess(product.toObject(), 201);
  } catch (error) {
    console.error("Admin POST product error:", error);
    return jsonError("Failed to create product", 500);
  }
}
