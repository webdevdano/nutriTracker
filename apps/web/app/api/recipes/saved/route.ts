import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeSavedRecipe } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

// GET – list all Spoonacular recipes the user has saved
export async function GET() {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const saved = await prisma.savedRecipe.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ saved: saved.map(serializeSavedRecipe) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch saved recipes" },
      { status: 500 },
    );
  }
}

// POST – save (bookmark) a Spoonacular recipe
export async function POST(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { spoonacular_id, title, image, servings, ready_in_minutes, calories, protein, carbs, fat } = body;

    if (!spoonacular_id || !title) {
      return NextResponse.json({ error: "spoonacular_id and title are required" }, { status: 400 });
    }

    const saved = await prisma.savedRecipe.upsert({
      where: { userId_spoonacularId: { userId: user.id, spoonacularId: spoonacular_id } },
      update: {},
      create: {
        userId: user.id,
        spoonacularId: spoonacular_id,
        title,
        image: image ?? null,
        servings: servings ?? null,
        readyInMinutes: ready_in_minutes ?? null,
        calories: calories ?? null,
        protein: protein ?? null,
        carbs: carbs ?? null,
        fat: fat ?? null,
      },
    });

    return NextResponse.json({ saved: serializeSavedRecipe(saved) }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save recipe" },
      { status: 500 },
    );
  }
}

// DELETE – unsave a Spoonacular recipe (pass ?id=spoonacular_id as query param)
export async function DELETE(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const spoonacularId = Number(searchParams.get("id"));

    if (!spoonacularId) {
      return NextResponse.json({ error: "Query param ?id= required" }, { status: 400 });
    }

    await prisma.savedRecipe.deleteMany({
      where: { userId: user.id, spoonacularId },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to unsave recipe" },
      { status: 500 },
    );
  }
}
