import { NextResponse } from "next/server";
import { getRecipeInformation } from "@/lib/spoonacular";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recipeId = parseInt(id);
    
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
