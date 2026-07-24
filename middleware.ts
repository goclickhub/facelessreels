import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/guide", "/my-account", "/series", "/settings", "/upgrade", "/videos", "/admin"];

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("refreshToken");
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Deliberately no "redirect away from /sign-in if a cookie exists" check
  // here — that used to redirect based on cookie *presence*, not validity,
  // which meant a stale/expired cookie could bounce sign-in straight back to
  // a dashboard that couldn't authenticate either, an infinite loop. The
  // (auth) layout now handles "already logged in" redirects itself, based on
  // a real validated session via useAuth().
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
    "/admin/:path*",
  ],
};
