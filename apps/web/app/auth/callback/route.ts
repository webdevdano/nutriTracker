import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supabase OAuth callback no longer used - redirects gracefully.
export async function GET(request: NextRequest) {
  const next = new URL(request.url).searchParams.get("next") ?? "/app";
  return NextResponse.redirect(new URL(next, request.url));
}
