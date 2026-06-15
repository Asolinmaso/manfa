import { connectDB } from "@/lib/db/mongoose";
import { requireRole } from "@/lib/auth/rbac";
import { jsonError, jsonSuccess, zodErrorResponse } from "@/lib/api/response";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  price: z.number().min(0).optional(),
  priceLabel: z.string().min(1).optional(),
  image: z.string().url("Image must be a valid URL").optional(),
  category: z
    .enum(["New Arrivals", "Signature Pieces", "Men", "Women"])
    .optional(),
  sizes: z.array(z.enum(["XS", "S", "M", "L", "XL", "XXL"])).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().min(0).int().optional(),
  isActive: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

/** GET /api/admin/products/[id] */
export async function GET(_req: Request, ctx: RouteContext) {
  const auth = await requireRole("admin");
  if (auth instanceof Response) return auth;

  const { id } = await ctx.params;
  if (!isValidObjectId(id)) return jsonError("Invalid product ID", 400);

  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    if (!product) return jsonError("Product not found", 404);
    return jsonSuccess(product);
  } catch (error) {
    console.error("Admin GET product error:", error);
    return jsonError("Failed to fetch product", 500);
  }
}

/** PUT /api/admin/products/[id] */
export async function PUT(request: Request, ctx: RouteContext) {
  const auth = await requireRole("admin");
  if (auth instanceof Response) return auth;

  const { id } = await ctx.params;
  if (!isValidObjectId(id)) return jsonError("Invalid product ID", 400);

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    await connectDB();
    const product = await Product.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!product) return jsonError("Product not found", 404);
    return jsonSuccess(product);
  } catch (error) {
    console.error("Admin PUT product error:", error);
    return jsonError("Failed to update product", 500);
  }
}

/** DELETE /api/admin/products/[id] */
export async function DELETE(_req: Request, ctx: RouteContext) {
  const auth = await requireRole("admin");
  if (auth instanceof Response) return auth;

  const { id } = await ctx.params;
  if (!isValidObjectId(id)) return jsonError("Invalid product ID", 400);

  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(id).lean();
    if (!product) return jsonError("Product not found", 404);
    return jsonSuccess({ message: "Product deleted" });
  } catch (error) {
    console.error("Admin DELETE product error:", error);
    return jsonError("Failed to delete product", 500);
  }
}
