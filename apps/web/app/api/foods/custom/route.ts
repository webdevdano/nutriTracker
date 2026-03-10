import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

function serializeCustomFood(f: {
  id: string;
  name: string;
  servingSize: { toNumber: () => number } | number | null;
  servingUnit: string;
  category: string | null;
  barcode: string | null;
  calories: { toNumber: () => number } | number | null;
  protein: { toNumber: () => number } | number | null;
  carbs: { toNumber: () => number } | number | null;
  fat: { toNumber: () => number } | number | null;
  fiber: { toNumber: () => number } | number | null;
  sodium: { toNumber: () => number } | number | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  const n = (v: { toNumber: () => number } | number | null) =>
    v == null ? null : typeof v === "number" ? v : v.toNumber();
  return {
    id: f.id,
    name: f.name,
    serving_size: n(f.servingSize),
    serving_unit: f.servingUnit,
    category: f.category,
    barcode: f.barcode,
    calories: n(f.calories),
    protein: n(f.protein),
    carbs: n(f.carbs),
    fat: n(f.fat),
    fiber: n(f.fiber),
    sodium: n(f.sodium),
    created_at: f.createdAt.toISOString(),
    updated_at: f.updatedAt.toISOString(),
  };
}

// GET /api/foods/custom?q=...
export async function GET(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  const foods = await prisma.customFood.findMany({
    where: {
      userId: user.id,
      ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    },
    orderBy: { name: "asc" },
    take: 50,
  });

  return NextResponse.json({ foods: foods.map(serializeCustomFood) });
}

// POST /api/foods/custom — create
export async function POST(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, serving_size, serving_unit, category, barcode, calories, protein, carbs, fat, fiber, sodium } = body;

  if (!name?.trim()) return NextResponse.json({ error: "name is required" }, { status: 400 });

  const food = await prisma.customFood.create({
    data: {
      userId: user.id,
      name: name.trim(),
      servingSize: serving_size ?? 100,
      servingUnit: serving_unit ?? "g",
      category: category ?? null,
      barcode: barcode ?? null,
      calories: calories ?? null,
      protein: protein ?? null,
      carbs: carbs ?? null,
      fat: fat ?? null,
      fiber: fiber ?? null,
      sodium: sodium ?? null,
    },
  });

  return NextResponse.json({ food: serializeCustomFood(food) }, { status: 201 });
}

// PATCH /api/foods/custom — update
export async function PATCH(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, name, serving_size, serving_unit, category, barcode, calories, protein, carbs, fat, fiber, sodium } = body;

  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  // Verify ownership
  const existing = await prisma.customFood.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const food = await prisma.customFood.update({
    where: { id },
    data: {
      ...(name !== undefined ? { name: name.trim() } : {}),
      ...(serving_size !== undefined ? { servingSize: serving_size } : {}),
      ...(serving_unit !== undefined ? { servingUnit: serving_unit } : {}),
      ...(category !== undefined ? { category } : {}),
      ...(barcode !== undefined ? { barcode } : {}),
      ...(calories !== undefined ? { calories } : {}),
      ...(protein !== undefined ? { protein } : {}),
      ...(carbs !== undefined ? { carbs } : {}),
      ...(fat !== undefined ? { fat } : {}),
      ...(fiber !== undefined ? { fiber } : {}),
      ...(sodium !== undefined ? { sodium } : {}),
    },
  });

  return NextResponse.json({ food: serializeCustomFood(food) });
}

// DELETE /api/foods/custom?id=...
export async function DELETE(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const existing = await prisma.customFood.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.customFood.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
