import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/verify-email?error=missing", request.url));
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return NextResponse.redirect(new URL("/verify-email?error=expired", request.url));
    }

    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.redirect(new URL("/verify-email?success=1", request.url));
  } catch (err) {
    console.error("[verify-email]", err);
    return NextResponse.redirect(new URL("/verify-email?error=unknown", request.url));
  }
}
