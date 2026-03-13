import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeWaterLog } from "@/lib/api-serializers";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// GET /api/water?date=YYYY-MM-DD — returns logs + totalCups for the date
export async function GET(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date") ?? new Date().toISOString().split("T")[0];
    const date = new Date(dateParam + "T12:00:00");

    const logs = await prisma.waterLog.findMany({
      where: { userId: user.id, date },
      orderBy: { loggedAt: "asc" },
    });

    const totalCups = logs.reduce((sum, l) => sum + Number(l.cups), 0);

    return NextResponse.json({ logs: logs.map(serializeWaterLog), totalCups });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch water logs" },
      { status: 500 },
    );
  }
}

// POST /api/water — log cups of water
export async function POST(request: Request) {
  const rl = rateLimit(`${getClientIp(request)}:water-post`, { limit: 30, windowSeconds: 60 });
  if (!rl.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { cups, date: dateParam } = await request.json();
    const cupsNum = Number(cups);

    if (!cups || isNaN(cupsNum) || cupsNum <= 0 || cupsNum > 20) {
      return NextResponse.json({ error: "Invalid cups value (must be 0–20)" }, { status: 400 });
    }

    const dateStr = dateParam ?? new Date().toISOString().split("T")[0];
    const date = new Date(dateStr + "T12:00:00");

    const log = await prisma.waterLog.create({
      data: { userId: user.id, date, cups: cupsNum },
    });

    return NextResponse.json({ log: serializeWaterLog(log) }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to log water" },
      { status: 500 },
    );
  }
}

// DELETE /api/water?id=... — remove a water log entry
export async function DELETE(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const existing = await prisma.waterLog.findUnique({ where: { id } });
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.waterLog.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete water log" },
      { status: 500 },
    );
  }
}
