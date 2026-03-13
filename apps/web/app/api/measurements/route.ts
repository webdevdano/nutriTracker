import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { serializeMeasurement } from "@/lib/api-serializers";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// GET /api/measurements?limit=20
export async function GET(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

  const logs = await prisma.measurementLog.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: limit,
  });

  return NextResponse.json({ measurements: logs.map(serializeMeasurement) });
}

// POST /api/measurements  { date, neck, chest, waist, ... }
export async function POST(request: Request) {
  const rl = rateLimit(`${getClientIp(request)}:measurements-post`, { limit: 30, windowSeconds: 60 });
  if (!rl.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const date = body.date ? new Date(body.date) : new Date();
  date.setUTCHours(0, 0, 0, 0);

  const pick = (v: unknown) => (v !== undefined && v !== "" && v !== null ? Number(v) : undefined);

  const measurement = await prisma.measurementLog.upsert({
    where: { userId_date: { userId: user.id, date } },
    update: {
      neck:        pick(body.neck),
      shoulders:   pick(body.shoulders),
      chest:       pick(body.chest),
      waist:       pick(body.waist),
      hips:        pick(body.hips),
      leftBicep:   pick(body.left_bicep),
      rightBicep:  pick(body.right_bicep),
      leftThigh:   pick(body.left_thigh),
      rightThigh:  pick(body.right_thigh),
      leftCalf:    pick(body.left_calf),
      rightCalf:   pick(body.right_calf),
      bodyFatPct:  pick(body.body_fat_pct),
      note:        body.note ?? undefined,
    },
    create: {
      userId:      user.id,
      date,
      neck:        pick(body.neck),
      shoulders:   pick(body.shoulders),
      chest:       pick(body.chest),
      waist:       pick(body.waist),
      hips:        pick(body.hips),
      leftBicep:   pick(body.left_bicep),
      rightBicep:  pick(body.right_bicep),
      leftThigh:   pick(body.left_thigh),
      rightThigh:  pick(body.right_thigh),
      leftCalf:    pick(body.left_calf),
      rightCalf:   pick(body.right_calf),
      bodyFatPct:  pick(body.body_fat_pct),
      note:        body.note ?? undefined,
    },
  });

  return NextResponse.json({ measurement: serializeMeasurement(measurement) });
}

// DELETE /api/measurements?id=...
export async function DELETE(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.measurementLog.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ ok: true });
}
