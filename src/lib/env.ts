function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get appUrl() {
    return process.env.APP_URL ?? "http://localhost:3000";
  },
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  get mongodbUri() {
    return requireEnv("MONGODB_URI");
  },
  get jwtAccessSecret() {
    return requireEnv("JWT_ACCESS_SECRET");
  },
  get jwtRefreshSecret() {
    return requireEnv("JWT_REFRESH_SECRET");
  },
  get emailUser() {
    return requireEnv("EMAIL_USER");
  },
  get emailPass() {
    return requireEnv("EMAIL_PASS");
  },
  get emailFrom() {
    return process.env.EMAIL_FROM ?? requireEnv("EMAIL_USER");
  },
  get adminEmail() {
    return (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  },
  get googleClientId() {
    return requireEnv("GOOGLE_CLIENT_ID");
  },
  get googleClientSecret() {
    return requireEnv("GOOGLE_CLIENT_SECRET");
  },
  get googleRedirectUri() {
    return `${env.appUrl}/api/auth/google/callback`;
  },
};
