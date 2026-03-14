import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.email) return NextResponse.json({ error: "No email" }, { status: 400 });
  if (user.emailVerified) return NextResponse.json({ ok: true, alreadyVerified: true });

  // Delete any existing token for this user
  await prisma.verificationToken.deleteMany({ where: { identifier: user.email } });

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await prisma.verificationToken.create({ data: { identifier: user.email, token, expires } });
  await sendVerificationEmail(user.email, token);

  return NextResponse.json({ ok: true });
}
