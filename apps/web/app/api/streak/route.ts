import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

function computeLongest(dates: string[]): number {
  if (!dates.length) return 0;
  let longest = 1, current = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    prev.setUTCDate(prev.getUTCDate() - 1);
    if (toDateStr(prev) === dates[i]) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }
  return longest;
}

// GET /api/streak — returns { streak, longestStreak } for the authenticated user
export async function GET() {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Distinct logged dates newest-first, last 90 days is enough for any real streak
  const rows = await prisma.foodLog.findMany({
    where: { userId: user.id },
    select: { date: true },
    distinct: ["date"],
    orderBy: { date: "desc" },
    take: 90,
  });

  if (rows.length === 0) return NextResponse.json({ streak: 0, longestStreak: 0 });

  const dates = rows.map((r) => toDateStr(r.date));

  const todayStr = toDateStr(new Date());
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = toDateStr(yesterday);

  // If neither today nor yesterday appears, streak is broken
  if (!dates.includes(todayStr) && !dates.includes(yesterdayStr)) {
    return NextResponse.json({ streak: 0, longestStreak: computeLongest(dates) });
  }

  // Walk backwards from today (or yesterday) counting consecutive days
  let streak = 0;
  const startDate = dates.includes(todayStr) ? todayStr : yesterdayStr;
  let cursor = startDate;
  for (const d of dates) {
    if (d === cursor) {
      streak++;
      const prev = new Date(cursor);
      prev.setUTCDate(prev.getUTCDate() - 1);
      cursor = toDateStr(prev);
    } else {
      break;
    }
  }

  return NextResponse.json({ streak, longestStreak: computeLongest(dates) });
}
