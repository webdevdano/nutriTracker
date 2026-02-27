import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with that email already exists" },
        { status: 409 },
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, name: name ?? null },
    });

    // Create an empty profile for the new user
    await prisma.profile.create({ data: { userId: user.id, email } });

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Registration failed" },
      { status: 500 },
    );
  }
}
