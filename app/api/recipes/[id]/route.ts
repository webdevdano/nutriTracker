import { NextResponse } from "next/server";
import { getRecipeInformation } from "@/lib/spoonacular";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipeId = parseInt(params.id);
    
    if (isNaN(recipeId)) {
      return NextResponse.json(
        { error: "Invalid recipe ID" },
        { status: 400 }
      );
    }

    const recipe = await getRecipeInformation(recipeId);
    return NextResponse.json(recipe);
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to fetch recipe",
      },
      { status: 500 },
    );
  }
}
