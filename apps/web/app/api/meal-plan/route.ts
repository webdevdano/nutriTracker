import { NextResponse } from "next/server";
import { generateMealPlan } from "@/lib/spoonacular";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const timeFrame = (url.searchParams.get("timeFrame") || "day") as "day" | "week";
    const targetCalories = url.searchParams.get("targetCalories");
    const diet = url.searchParams.get("diet");
    const exclude = url.searchParams.get("exclude");

    const mealPlan = await generateMealPlan(
      timeFrame,
      targetCalories ? parseInt(targetCalories) : undefined,
      diet || undefined,
      exclude || undefined
    );

    return NextResponse.json(mealPlan);
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to generate meal plan",
      },
      { status: 500 },
    );
  }
}
