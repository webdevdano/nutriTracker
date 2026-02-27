import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;

  // Redirect to login if accessing /app/* without auth
  if (!session && nextUrl.pathname.startsWith("/app")) {
    const loginUrl = new URL("/login", nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/signup
  if (
    session &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup")
  ) {
    const appUrl = new URL("/app", nextUrl.origin);
    return NextResponse.redirect(appUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
