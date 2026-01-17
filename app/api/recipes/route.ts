import { NextResponse } from "next/server";
import { getRandomRecipes } from "@/lib/spoonacular";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getRandomRecipes(12, "healthy,dinner,lunch");
    
    const recipes = data.recipes.map((recipe) => {
      const nutrients = recipe.nutrition?.nutrients || [];
      
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        summary: recipe.summary,
        calories: nutrients.find((n) => n.name === "Calories")?.amount || 0,
        protein: nutrients.find((n) => n.name === "Protein")?.amount || 0,
        carbs: nutrients.find((n) => n.name === "Carbohydrates")?.amount || 0,
        fat: nutrients.find((n) => n.name === "Fat")?.amount || 0,
        ingredients: recipe.extendedIngredients?.map((i) => i.original) || [],
      };
    });

    return NextResponse.json({ recipes });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to fetch recipes",
      },
      { status: 500 },
    );
  }
}
