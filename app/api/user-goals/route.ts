import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeGoals } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const goals = await prisma.userGoals.findUnique({ where: { userId: user.id } });
    return NextResponse.json({ goals: goals ? serializeGoals(goals) : null });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch goals" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const goals = await prisma.userGoals.upsert({
      where: { userId: user.id },
      update: {
        caloriesGoal: body.calories_goal,
        proteinGoal: body.protein_goal,
        carbsGoal: body.carbs_goal,
        fatGoal: body.fat_goal,
        fiberGoal: body.fiber_goal ?? undefined,
        sodiumGoal: body.sodium_goal ?? undefined,
      },
      create: {
        userId: user.id,
        caloriesGoal: body.calories_goal,
        proteinGoal: body.protein_goal,
        carbsGoal: body.carbs_goal,
        fatGoal: body.fat_goal,
        fiberGoal: body.fiber_goal ?? undefined,
        sodiumGoal: body.sodium_goal ?? undefined,
      },
    });
    return NextResponse.json({ goals: serializeGoals(goals) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save goals" },
      { status: 500 },
    );
  }
}
