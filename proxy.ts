import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth: session } = req;

  // Redirect authenticated users away from login/signup
  if (
    session &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup")
  ) {
    const appUrl = new URL("/app", nextUrl.origin);
    return NextResponse.redirect(appUrl);
  }

  // /app/* is open to guests — individual pages handle the guest state
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
