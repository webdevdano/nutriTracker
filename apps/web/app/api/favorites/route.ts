import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeFavorite } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

// GET - Fetch all favorites for the user
export async function GET() {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const favorites = await prisma.savedFavorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ favorites: favorites.map(serializeFavorite) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch favorites" },
      { status: 500 },
    );
  }
}

// POST - Add a new favorite
export async function POST(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { fdc_id, food_name, calories, protein, carbs, fat, serving_size } = body;

    if (!fdc_id || !food_name) {
      return NextResponse.json(
        { error: "Missing required fields: fdc_id and food_name" },
        { status: 400 },
      );
    }

    const existing = await prisma.savedFavorite.findFirst({
      where: { userId: user.id, fdcId: fdc_id },
    });
    if (existing) {
      return NextResponse.json({ error: "Food already in favorites" }, { status: 400 });
    }

    const favorite = await prisma.savedFavorite.create({
      data: {
        userId: user.id,
        fdcId: fdc_id,
        foodName: food_name,
        calories,
        protein,
        carbs,
        fat,
        servingSize: serving_size ?? 100,
      },
    });

    return NextResponse.json({ favorite: serializeFavorite(favorite) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to add favorite" },
      { status: 500 },
    );
  }
}

// DELETE - Remove a favorite
export async function DELETE(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing favorite ID" }, { status: 400 });

    await prisma.savedFavorite.delete({ where: { id, userId: user.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete favorite" },
      { status: 500 },
    );
  }
}
