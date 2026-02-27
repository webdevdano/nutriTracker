import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeFoodLog } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

// GET /api/food-logs?date=YYYY-MM-DD  (default: today)
// GET /api/food-logs?start=YYYY-MM-DD&end=YYYY-MM-DD  (date range)
export async function GET(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  try {
    if (start && end) {
      const logs = await prisma.foodLog.findMany({
        where: {
          userId: user.id,
          date: { gte: new Date(start), lte: new Date(end) },
        },
        orderBy: [{ date: "asc" }, { time: "asc" }],
      });
      return NextResponse.json({ logs: logs.map(serializeFoodLog) });
    }

    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const logs = await prisma.foodLog.findMany({
      where: {
        userId: user.id,
        date: { gte: targetDate, lt: nextDay },
      },
      orderBy: { time: "desc" },
    });
    return NextResponse.json({ logs: logs.map(serializeFoodLog) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch logs" },
      { status: 500 },
    );
  }
}

// POST /api/food-logs — log a food
export async function POST(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const created = await prisma.foodLog.create({
      data: {
        userId: user.id,
        date: body.date ? new Date(body.date) : new Date(),
        fdcId: body.fdc_id,
        foodName: body.food_name,
        servingSize: body.serving_size,
        servingUnit: body.serving_unit,
        calories: body.calories,
        protein: body.protein,
        carbs: body.carbs,
        fat: body.fat,
        fiber: body.fiber,
        sodium: body.sodium,
        quantity: body.quantity ?? 1,
        saturatedFat: body.saturated_fat,
        transFat: body.trans_fat,
        polyunsaturatedFat: body.polyunsaturated_fat,
        monounsaturatedFat: body.monounsaturated_fat,
        cholesterol: body.cholesterol,
        sugars: body.sugars,
        addedSugars: body.added_sugars,
        vitaminA: body.vitamin_a,
        vitaminC: body.vitamin_c,
        vitaminD: body.vitamin_d,
        vitaminE: body.vitamin_e,
        vitaminK: body.vitamin_k,
        thiamin: body.thiamin,
        riboflavin: body.riboflavin,
        niacin: body.niacin,
        vitaminB6: body.vitamin_b6,
        folate: body.folate,
        vitaminB12: body.vitamin_b12,
        calcium: body.calcium,
        iron: body.iron,
        magnesium: body.magnesium,
        phosphorus: body.phosphorus,
        potassium: body.potassium,
        zinc: body.zinc,
        selenium: body.selenium,
      },
    });
    return NextResponse.json({ log: serializeFoodLog(created) }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create log" },
      { status: 500 },
    );
  }
}

// PATCH /api/food-logs — update a log entry
export async function PATCH(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Map snake_case fields to camelCase
    const data: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      food_name: "foodName", serving_size: "servingSize", serving_unit: "servingUnit",
      saturated_fat: "saturatedFat", trans_fat: "transFat",
      polyunsaturated_fat: "polyunsaturatedFat", monounsaturated_fat: "monounsaturatedFat",
      added_sugars: "addedSugars", vitamin_a: "vitaminA", vitamin_c: "vitaminC",
      vitamin_d: "vitaminD", vitamin_e: "vitaminE", vitamin_k: "vitaminK",
      vitamin_b6: "vitaminB6", vitamin_b12: "vitaminB12",
    };
    for (const [k, v] of Object.entries(updates)) {
      data[fieldMap[k] ?? k] = v;
    }

    const updated = await prisma.foodLog.update({
      where: { id, userId: user.id },
      data,
    });
    return NextResponse.json({ log: serializeFoodLog(updated) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update log" },
      { status: 500 },
    );
  }
}

// DELETE /api/food-logs?id=...
export async function DELETE(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await prisma.foodLog.delete({ where: { id, userId: user.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete log" },
      { status: 500 },
    );
  }
}
