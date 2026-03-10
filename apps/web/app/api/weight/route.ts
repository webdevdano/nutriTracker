import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeWeightLog } from "@/lib/api-serializers";

export const dynamic = "force-dynamic";

// GET – last 90 days of weight logs
export async function GET(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const days = Math.min(Number(searchParams.get("days") ?? "90"), 365);
    const since = new Date(Date.now() - days * 86_400_000);

    const logs = await prisma.weightLog.findMany({
      where: { userId: user.id, loggedAt: { gte: since } },
      orderBy: { loggedAt: "asc" },
    });

    return NextResponse.json({ logs: logs.map(serializeWeightLog) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch weight logs" },
      { status: 500 },
    );
  }
}

// POST – log or update today's weight (upsert by date)
export async function POST(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { weight_lbs, note, logged_at } = await request.json();

    if (!weight_lbs || isNaN(Number(weight_lbs)) || Number(weight_lbs) <= 0) {
      return NextResponse.json({ error: "Invalid weight value" }, { status: 400 });
    }

    const date = logged_at
      ? new Date(logged_at + "T12:00:00")
      : new Date(new Date().toISOString().split("T")[0] + "T12:00:00");

    const log = await prisma.weightLog.upsert({
      where: { userId_loggedAt: { userId: user.id, loggedAt: date } },
      update: { weightLbs: Number(weight_lbs), note: note ?? null },
      create: { userId: user.id, weightLbs: Number(weight_lbs), note: note ?? null, loggedAt: date },
    });

    return NextResponse.json({ log: serializeWeightLog(log) }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to log weight" },
      { status: 500 },
    );
  }
}

// DELETE – remove a specific weight log by id
export async function DELETE(request: Request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const existing = await prisma.weightLog.findUnique({ where: { id } });
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.weightLog.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete log" },
      { status: 500 },
    );
  }
}
