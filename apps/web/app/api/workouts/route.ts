import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import type { CardioActivity, MuscleGroup, Prisma } from "@/lib/generated/prisma";

export const dynamic = "force-dynamic";

// GET /api/workouts?limit=20&type=CARDIO|STRENGTH
export async function GET(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

  const sessions = await prisma.workoutSession.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: limit,
    include: {
      cardioLogs: true,
      exerciseSets: { orderBy: [{ exerciseName: "asc" }, { setNumber: "asc" }] },
    },
  });

  return NextResponse.json({ sessions: sessions.map(serializeSession) });
}

// POST /api/workouts
// Body: { date, name?, notes?, durationMins?, caloriesBurned?, cardioLogs?: [...], exerciseSets?: [...] }
export async function POST(request: Request) {
  const rl = rateLimit(`${getClientIp(request)}:workouts-post`, { limit: 30, windowSeconds: 60 });
  if (!rl.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const date = body.date ? new Date(body.date) : new Date();
  date.setUTCHours(0, 0, 0, 0);

  const toInt = (v: unknown) => (v !== undefined && v !== "" && v !== null ? parseInt(String(v)) : undefined);

  const session = await prisma.workoutSession.create({
    data: {
      userId: user.id,
      date,
      name: body.name || null,
      notes: body.notes || null,
      durationMins: toInt(body.durationMins),
      caloriesBurned: toInt(body.caloriesBurned),
      cardioLogs: body.cardioLogs?.length
        ? {
            create: (body.cardioLogs as CardioLogInput[]).map((c) => ({
              userId: user.id,
              activity: c.activity as CardioActivity,
              durationMins: toInt(c.durationMins),
              distanceMiles: c.distanceMiles ? parseFloat(c.distanceMiles) : null,
              caloriesBurned: toInt(c.caloriesBurned),
              avgHeartRate: toInt(c.avgHeartRate),
              maxHeartRate: toInt(c.maxHeartRate),
              hrZone: toInt(c.hrZone),
              pace: c.pace || null,
              notes: c.notes || null,
            })),
          }
        : undefined,
      exerciseSets: body.exerciseSets?.length
        ? {
            create: (body.exerciseSets as ExerciseSetInput[]).map((s) => ({
              userId: user.id,
              exerciseName: s.exerciseName,
              muscleGroup: s.muscleGroup as MuscleGroup,
              setNumber: s.setNumber,
              reps: toInt(s.reps),
              weightLbs: s.weightLbs ? parseFloat(s.weightLbs) : null,
              durationSecs: toInt(s.durationSecs),
              notes: s.notes || null,
            })),
          }
        : undefined,
    },
    include: {
      cardioLogs: true,
      exerciseSets: { orderBy: [{ exerciseName: "asc" }, { setNumber: "asc" }] },
    },
  });

  return NextResponse.json({ session: serializeSession(session) }, { status: 201 });
}

// ── Types ──────────────────────────────────────────────────────

type CardioLogInput = {
  activity: string;
  durationMins?: string | number;
  distanceMiles?: string;
  caloriesBurned?: string | number;
  avgHeartRate?: string | number;
  maxHeartRate?: string | number;
  hrZone?: string | number;
  pace?: string;
  notes?: string;
};

type ExerciseSetInput = {
  exerciseName: string;
  muscleGroup: string;
  setNumber: number;
  reps?: string | number;
  weightLbs?: string;
  durationSecs?: string | number;
  notes?: string;
};

// ── Serializer ─────────────────────────────────────────────────

type SessionWithRelations = Prisma.WorkoutSessionGetPayload<{
  include: { cardioLogs: true; exerciseSets: true };
}>;

function serializeSession(s: SessionWithRelations) {
  return {
    ...s,
    date: s.date.toISOString().split("T")[0],
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
    cardioLogs: s.cardioLogs.map((c) => ({
      ...c,
      distanceMiles: c.distanceMiles?.toString() ?? null,
      createdAt: c.createdAt.toISOString(),
    })),
    exerciseSets: s.exerciseSets.map((e) => ({
      ...e,
      weightLbs: e.weightLbs?.toString() ?? null,
      createdAt: e.createdAt.toISOString(),
    })),
  };
}
