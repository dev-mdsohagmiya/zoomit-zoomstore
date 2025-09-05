import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // Define protected auth routes
  const authRoutes = ["/login", "/register", "/reset-password"];

  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If user is logged in and trying to access auth pages, redirect to home
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/reset-password"],
};
