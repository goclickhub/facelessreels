import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/guide", "/my-account", "/series", "/settings", "/upgrade", "/videos"];
const AUTH_ONLY_PATHS = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("refreshToken");
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (AUTH_ONLY_PATHS.includes(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/guide/:path*",
    "/my-account/:path*",
    "/series/:path*",
    "/settings/:path*",
    "/upgrade/:path*",
    "/videos/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
