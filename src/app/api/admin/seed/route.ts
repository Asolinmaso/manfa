import { connectDB } from "@/lib/db/mongoose";
import { hashPassword } from "@/lib/auth/password";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

/**
 * POST /api/admin/seed
 *
 * One-time idempotent endpoint to create the admin user.
 * Reads credentials from environment variables (never from request body).
 * Returns 409 if the user already exists.
 *
 * To add more admin users in the future, either:
 *  - Extend this endpoint to accept a list from env
 *  - Or promote a user via a separate admin-promote endpoint
 */
export async function POST() {
  const email = process.env.ADMIN_SEED_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    return jsonError(
      "ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must be set in environment",
      500,
    );
  }

  try {
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      // Idempotent — if already admin just confirm
      if (existing.role === "admin") {
        return NextResponse.json(
          { success: true, message: "Admin user already exists" },
          { status: 409 },
        );
      }
      // Promote existing user to admin
      existing.role = "admin";
      existing.emailVerified = true;
      await existing.save();
      return jsonSuccess({ message: "Existing user promoted to admin" }, 200);
    }

    const passwordHash = await hashPassword(password);

    await User.create({
      name: "Admin",
      email,
      passwordHash,
      authProvider: "email",
      role: "admin",
      emailVerified: true,
    });

    return jsonSuccess({ message: "Admin user created successfully" }, 201);
  } catch (error) {
    console.error("Admin seed error:", error);
    return jsonError("Failed to seed admin user", 500);
  }
}
