import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { hashToken, generateSecureToken } from "@/lib/auth/tokens";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/validation/authSchemas";
import { signAccessToken, verifyAccessToken } from "@/lib/auth/jwt";

describe("password utils", () => {
  it("hashes and verifies passwords", async () => {
    const hash = await hashPassword("Password1");
    expect(await verifyPassword("Password1", hash)).toBe(true);
    expect(await verifyPassword("WrongPass1", hash)).toBe(false);
  });
});

describe("token utils", () => {
  it("hashes tokens consistently", () => {
    const token = "abc123";
    expect(hashToken(token)).toBe(hashToken(token));
    expect(hashToken(token)).not.toBe(token);
  });

  it("generates unique secure tokens", () => {
    expect(generateSecureToken()).not.toBe(generateSecureToken());
  });
});

describe("auth schemas", () => {
  it("validates login input", () => {
    const result = loginSchema.safeParse({
      email: "User@Example.com",
      password: "secret",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });

  it("rejects weak registration passwords", () => {
    const result = registerSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      password: "weak",
      confirmPassword: "weak",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid registration input", () => {
    const result = registerSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      password: "Password1",
      confirmPassword: "Password1",
    });
    expect(result.success).toBe(true);
  });

  it("requires matching passwords on reset", () => {
    const result = resetPasswordSchema.safeParse({
      token: "token",
      password: "Password1",
      confirmPassword: "Password2",
    });
    expect(result.success).toBe(false);
  });
});

describe("jwt utils", () => {
  it("signs and verifies access tokens", async () => {
    process.env.JWT_ACCESS_SECRET =
      process.env.JWT_ACCESS_SECRET ??
      "test-access-secret-minimum-32-characters";
    process.env.JWT_REFRESH_SECRET =
      process.env.JWT_REFRESH_SECRET ??
      "test-refresh-secret-minimum-32-characters";

    const token = await signAccessToken({
      userId: "user123",
      email: "test@example.com",
      role: "user",
      emailVerified: true,
    });

    const payload = await verifyAccessToken(token);
    expect(payload?.sub).toBe("user123");
    expect(payload?.email).toBe("test@example.com");
    expect(payload?.role).toBe("user");
  });
});
