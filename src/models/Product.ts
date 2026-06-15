import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ProductCategory =
  | "New Arrivals"
  | "Signature Pieces"
  | "Men"
  | "Women";

export interface IProduct extends Document {
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  category: ProductCategory;
  sizes: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    price: { type: Number, required: true, min: 0 },
    priceLabel: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["New Arrivals", "Signature Pieces", "Men", "Women"],
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      default: [],
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", ProductSchema);
