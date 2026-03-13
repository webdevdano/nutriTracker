import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

// DELETE /api/workouts/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const session = await prisma.workoutSession.findUnique({ where: { id } });
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (session.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.workoutSession.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

// GET /api/workouts/[id]  — fetch single session with all logs
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const session = await prisma.workoutSession.findUnique({
    where: { id },
    include: {
      cardioLogs: true,
      exerciseSets: { orderBy: [{ exerciseName: "asc" }, { setNumber: "asc" }] },
    },
  });

  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (session.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json({ session });
}
