import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeFoodLog } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

/**
 * GET /api/food-logs/export?start=YYYY-MM-DD&end=YYYY-MM-DD
 * Returns all food logs in the given date range as a UTF-8 CSV download.
 */
export async function GET(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end   = searchParams.get("end");

  if (!start || !end)
    return NextResponse.json({ error: "start and end query params are required" }, { status: 400 });

  const startDate = new Date(start);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setUTCHours(23, 59, 59, 999);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });

  const logs = await prisma.foodLog.findMany({
    where: { userId: user.id, date: { gte: startDate, lte: endDate } },
    orderBy: [{ date: "asc" }, { time: "asc" }],
  });

  const serialized = logs.map(serializeFoodLog);

  const COLUMNS = [
    "date", "meal_type", "food_name", "quantity", "serving_size", "serving_unit",
    "calories", "protein", "carbs", "fat", "fiber", "sodium",
    "saturated_fat", "trans_fat", "cholesterol", "sugars", "added_sugars",
    "vitamin_a", "vitamin_c", "vitamin_d", "calcium", "iron",
  ] as const;

  function escapeCell(value: unknown): string {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  const header = COLUMNS.join(",");
  const rows = serialized.map((log) =>
    COLUMNS.map((col) => escapeCell((log as Record<string, unknown>)[col])).join(",")
  );

  const csv = [header, ...rows].join("\r\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="food-log-${start}-to-${end}.csv"`,
    },
  });
}
