import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessToken, ACCESS_COOKIE } from "@/lib/auth/jwt";

const AUTH_PAGES = ["/login", "/signup", "/forgot-password"];
const PROTECTED_PREFIXES = ["/account"];
const ADMIN_PREFIX = "/admin";

function isAuthPage(pathname: string) {
  return AUTH_PAGES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function isAdminRoute(pathname: string) {
  return pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const session = accessToken ? await verifyAccessToken(accessToken) : null;

  if (isAdminRoute(pathname)) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (isProtected(pathname)) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (!session.emailVerified) {
      return NextResponse.redirect(new URL("/verify-email", request.url));
    }
    return NextResponse.next();
  }

  if (isAuthPage(pathname) && session?.emailVerified) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account",
    "/account/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/signup",
    "/forgot-password",
  ],
};
