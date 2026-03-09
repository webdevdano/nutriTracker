import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeUserRecipe } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

// GET – list all user-created recipes
export async function GET() {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const recipes = await prisma.userRecipe.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ recipes: recipes.map(serializeUserRecipe) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}

// POST – create a new user recipe
export async function POST(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const recipe = await prisma.userRecipe.create({
      data: {
        userId: user.id,
        title: title.trim(),
        description: description ?? null,
        ingredients: Array.isArray(ingredients) ? ingredients : [],
        instructions: instructions ?? null,
        servings: servings ?? 1,
        prepTime: prep_time ?? null,
        cookTime: cook_time ?? null,
        imageUrl: image_url ?? null,
        calories: calories ?? null,
        protein: protein ?? null,
        carbs: carbs ?? null,
        fat: fat ?? null,
        fiber: fiber ?? null,
        sodium: sodium ?? null,
      },
    });

    return NextResponse.json({ recipe: serializeUserRecipe(recipe) }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create recipe" },
      { status: 500 },
    );
  }
}
