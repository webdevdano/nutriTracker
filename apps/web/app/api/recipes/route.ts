import { NextResponse } from "next/server";
import { searchRecipes } from "@/lib/spoonacular";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // complexSearch is more reliable than /random with tags and always returns
    // nutrition when addRecipeNutrition=true
    const data = await searchRecipes("", 12, true);

    const recipes = (data.results ?? []).map((recipe) => {
      const nutrients = recipe.nutrition?.nutrients ?? [];
      const get = (name: string) => nutrients.find((n) => n.name === name)?.amount ?? 0;

      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        servings: recipe.servings ?? 1,
        readyInMinutes: recipe.readyInMinutes ?? 0,
        summary: recipe.summary ?? "",
        calories: get("Calories"),
        protein:  get("Protein"),
        carbs:    get("Carbohydrates"),
        fat:      get("Fat"),
        ingredients: [],
      };
    });

    return NextResponse.json({ recipes });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}
