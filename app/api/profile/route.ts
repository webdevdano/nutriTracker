import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeProfile } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
    return NextResponse.json({ profile: profile ? serializeProfile(profile) : null });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        fullName: body.full_name,
        age: body.age,
        sex: body.sex,
        heightFeet: body.height_feet,
        heightInches: body.height_inches,
        weightLbs: body.weight_lbs,
        activityLevel: body.activity_level,
        bmi: body.bmi,
        recommendedCalories: body.recommended_calories,
        recommendedProtein: body.recommended_protein,
        recommendedCarbs: body.recommended_carbs,
        recommendedFat: body.recommended_fat,
        fitnessGoal: body.fitness_goal,
      },
      create: {
        userId: user.id,
        email: user.email,
        fullName: body.full_name,
        age: body.age,
        sex: body.sex,
        heightFeet: body.height_feet,
        heightInches: body.height_inches,
        weightLbs: body.weight_lbs,
        activityLevel: body.activity_level,
        bmi: body.bmi,
        recommendedCalories: body.recommended_calories,
        recommendedProtein: body.recommended_protein,
        recommendedCarbs: body.recommended_carbs,
        recommendedFat: body.recommended_fat,
        fitnessGoal: body.fitness_goal ?? "maintain",
      },
    });
    return NextResponse.json({ profile: serializeProfile(profile) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save profile" },
      { status: 500 },
    );
  }
}
