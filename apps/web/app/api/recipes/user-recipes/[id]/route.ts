import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeUserRecipe } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

// PUT – update a user recipe (owner only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.userRecipe.findUnique({ where: { id } });

    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const {
      title,
      description,
      ingredients,
      instructions,
      servings,
      prep_time,
      cook_time,
      image_url,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sodium,
    } = body;

    const updated = await prisma.userRecipe.update({
      where: { id },
      data: {
        ...(title     !== undefined && { title: title.trim() }),
        ...(description !== undefined && { description }),
        ...(ingredients !== undefined && { ingredients: Array.isArray(ingredients) ? ingredients : [] }),
        ...(instructions !== undefined && { instructions }),
        ...(servings !== undefined && { servings }),
        ...(prep_time !== undefined && { prepTime: prep_time }),
        ...(cook_time !== undefined && { cookTime: cook_time }),
        ...(image_url !== undefined && { imageUrl: image_url }),
        ...(calories !== undefined && { calories }),
        ...(protein  !== undefined && { protein }),
        ...(carbs    !== undefined && { carbs }),
        ...(fat      !== undefined && { fat }),
        ...(fiber    !== undefined && { fiber }),
        ...(sodium   !== undefined && { sodium }),
      },
    });

    return NextResponse.json({ recipe: serializeUserRecipe(updated) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update recipe" },
      { status: 500 },
    );
  }
}

// DELETE – delete a user recipe (owner only)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.userRecipe.findUnique({ where: { id } });

    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.userRecipe.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete recipe" },
      { status: 500 },
    );
  }
}
