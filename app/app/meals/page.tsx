"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGetFoodLogsQuery, type FoodLog } from "@/store/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type DayGroup = {
  date: string;
  label: string;
  logs: FoodLog[];
  totals: { calories: number; protein: number; carbs: number; fat: number };
};

type MealSection = {
  type: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  logs: FoodLog[];
  calories: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MEAL_META: Record<string, { label: string; emoji: string; color: string }> = {
  BREAKFAST: { label: "Breakfast", emoji: "🌅", color: "text-amber-600 dark:text-amber-400" },
  LUNCH:     { label: "Lunch",     emoji: "☀️",  color: "text-blue-600 dark:text-blue-400" },
  DINNER:    { label: "Dinner",    emoji: "🌙",  color: "text-indigo-600 dark:text-indigo-400" },
  SNACK:     { label: "Snack",     emoji: "🍎",  color: "text-emerald-600 dark:text-emerald-400" },
};

function formatDate(dateStr: string) {
  const d         = new Date(dateStr + "T12:00:00");
  const today     = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().split("T")[0];
  if (dateStr === today)     return "Today";
  if (dateStr === yesterday) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

// ─── LogRow ───────────────────────────────────────────────────────────────────

function LogRow({ log }: { log: FoodLog }) {
  const totalCals = Math.round((log.calories || 0) * log.quantity);
  const protein   = Math.round((log.protein  || 0) * log.quantity);
  const carbs     = Math.round((log.carbs    || 0) * log.quantity);
  const fat       = Math.round((log.fat      || 0) * log.quantity);
  const label     = log.food_name.replace(/\s*\(\d+g\)$/, "");
  const serving   = log.food_name.match(/\((\d+g)\)$/)?.[1];

  return (
    <div className="flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{label}</p>
        <p className="mt-0.5 text-xs text-zinc-400">
          {log.quantity !== 1 && <span>{log.quantity} × </span>}
          {serving ?? `${Math.round((log.calories || 0) * 100) / 100} kcal/srv`}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{totalCals} kcal</span>
        <span className="hidden sm:inline">P {protein}g</span>
        <span className="hidden sm:inline">C {carbs}g</span>
        <span className="hidden sm:inline">F {fat}g</span>
      </div>
    </div>
  );
}

// ─── DayCard ──────────────────────────────────────────────────────────────────

function DayCard({ day }: { day: DayGroup }) {
  const mealSections: MealSection[] = (["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const)
    .map((type) => {
      const ml = day.logs.filter((l) => (l.meal_type ?? "SNACK") === type);
      return { type, logs: ml, calories: ml.reduce((s, l) => s + (l.calories || 0) * l.quantity, 0) };
    })
    .filter((s) => s.logs.length > 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white dark:border-zinc-800/80 dark:bg-zinc-900">
      {/* Day header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800">
        <span className="text-sm font-semibold">{day.label}</span>
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{Math.round(day.totals.calories)} kcal</span>
          <span className="hidden sm:inline">P {Math.round(day.totals.protein)}g</span>
          <span className="hidden sm:inline">C {Math.round(day.totals.carbs)}g</span>
          <span className="hidden sm:inline">F {Math.round(day.totals.fat)}g</span>
        </div>
      </div>

      {/* Meal sections */}
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {mealSections.map((section) => {
          const meta = MEAL_META[section.type];
          return (
            <div key={section.type} className="px-5 py-3">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="text-sm">{meta.emoji}</span>
                <span className={`text-xs font-semibold ${meta.color}`}>{meta.label}</span>
                <span className="ml-auto text-xs text-zinc-400">{Math.round(section.calories)} kcal</span>
              </div>
              <div className="space-y-1.5">
                {section.logs.map((log) => (
                  <LogRow key={log.id} log={log} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MealsPage() {
  const { status }  = useSession();
  const isGuest     = status === "unauthenticated";

  const today    = new Date().toISOString().split("T")[0];
  const sevenAgo = new Date(Date.now() - 6 * 86_400_000).toISOString().split("T")[0];

  const { data: logs = [], isLoading } = useGetFoodLogsQuery(
    { start: sevenAgo, end: today },
    { skip: isGuest }
  );

  // Group logs by date, newest first
  const days: DayGroup[] = useMemo(() => {
    const map: Record<string, FoodLog[]> = {};
    for (const log of logs) {
      const d = (log as FoodLog & { date?: string }).date ?? today;
      (map[d] ??= []).push(log);
    }
    return Object.entries(map)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, dayLogs]) => ({
        date,
        label: formatDate(date),
        logs: dayLogs,
        totals: dayLogs.reduce(
          (acc, l) => ({
            calories: acc.calories + (l.calories || 0) * l.quantity,
            protein:  acc.protein  + (l.protein  || 0) * l.quantity,
            carbs:    acc.carbs    + (l.carbs    || 0) * l.quantity,
            fat:      acc.fat      + (l.fat      || 0) * l.quantity,
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        ),
      }));
  }, [logs, today]);

  if (isGuest) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Meal History</h1>
        <div className="mt-6 rounded-2xl border border-[#4169E1]/30 bg-[#4169E1]/5 p-8 text-center dark:bg-blue-950/30">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Sign in to see your meal history.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/signup" className="rounded-full bg-[#4169E1] px-5 py-2 text-sm font-medium text-white hover:bg-[#000080]">
              Get started
            </Link>
            <Link href="/login" className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Meal History</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Last 7 days</p>
        </div>
        <Link
          href="/app/search"
          className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
        >
          + Add Food
        </Link>
      </div>

      {isLoading && (
        <div className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">Loading…</div>
      )}

      {!isLoading && days.length === 0 && (
        <div className="mt-10 rounded-2xl border border-zinc-200/70 bg-white p-10 text-center dark:border-zinc-800/80 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No meals logged in the last 7 days.</p>
          <Link
            href="/app/search"
            className="mt-4 inline-flex rounded-full bg-[#4169E1] px-5 py-2 text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
          >
            Log your first meal
          </Link>
        </div>
      )}

      <div className="mt-6 space-y-6">
        {days.map((day) => (
          <DayCard key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
}
