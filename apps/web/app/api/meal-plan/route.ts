import { NextResponse } from "next/server";
import { generateMealPlan } from "@/lib/spoonacular";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(`${ip}:meal-plan`, { limit: 5, windowSeconds: 60 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests — please wait before generating another meal plan" },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
    );
  }
  try {
    const url = new URL(request.url);
    const timeFrame = (url.searchParams.get("timeFrame") || "day") as "day" | "week";
    const targetCalories = url.searchParams.get("targetCalories");
    const diet = url.searchParams.get("diet");
    const exclude = url.searchParams.get("exclude");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mealPlan = await (generateMealPlan as any)(
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
