import mongoose, { Schema, type Document, type Model } from "mongoose";

export type UserRole = "user" | "admin";
export type AuthProvider = "email" | "google";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  googleId?: string;
  authProvider: AuthProvider;
  role: UserRole;
  emailVerified: boolean;
  emailVerificationTokenHash?: string;
  emailVerificationExpires?: Date;
  passwordResetTokenHash?: string;
  passwordResetExpires?: Date;
  refreshTokenHash?: string;
  refreshTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    authProvider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    emailVerified: { type: Boolean, default: false },
    emailVerificationTokenHash: { type: String },
    emailVerificationExpires: { type: Date },
    passwordResetTokenHash: { type: String },
    passwordResetExpires: { type: Date },
    refreshTokenHash: { type: String },
    refreshTokenExpires: { type: Date },
  },
  { timestamps: true },
);

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
