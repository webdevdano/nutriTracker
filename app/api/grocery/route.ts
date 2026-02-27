import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeGroceryItem } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const items = await prisma.groceryList.findMany({
      where: { userId: user.id },
      orderBy: [{ purchased: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ items: items.map(serializeGroceryItem) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch grocery list" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { food_name, quantity = 1, unit = "serving" } = await request.json();
    if (!food_name) return NextResponse.json({ error: "Food name is required" }, { status: 400 });

    const item = await prisma.groceryList.create({
      data: { userId: user.id, foodName: food_name, quantity, unit },
    });
    return NextResponse.json({ item: serializeGroceryItem(item) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to add item" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, purchased } = await request.json();
    if (!id || purchased === undefined)
      return NextResponse.json({ error: "id and purchased are required" }, { status: 400 });

    const item = await prisma.groceryList.update({
      where: { id, userId: user.id },
      data: { purchased },
    });
    return NextResponse.json({ item: serializeGroceryItem(item) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update item" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  try {
    await prisma.groceryList.delete({ where: { id, userId: user.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete item" },
      { status: 500 },
    );
  }
}
