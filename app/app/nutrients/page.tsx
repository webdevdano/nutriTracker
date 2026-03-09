"use client";

import { useState } from "react";
import { useGetFoodLogsQuery } from "@/store/api";
import { nutrientDatabase, NutrientInfo } from "@/lib/nutrient-data";

// ─── RDI Map (numeric, per day) ───────────────────────────────────────────────
const RDI: Record<string, number> = {
  calories: 2000,
  protein: 50,
  carbs: 275,
  fat: 78,
  fiber: 28,
  sodium: 2300,
  vitamin_a: 900,
  vitamin_c: 90,
  vitamin_d: 20,
  vitamin_e: 15,
  vitamin_k: 120,
  thiamin: 1.2,
  riboflavin: 1.3,
  niacin: 16,
  vitamin_b6: 1.7,
  folate: 400,
  vitamin_b12: 2.4,
  calcium: 1000,
  iron: 18,
  magnesium: 420,
  phosphorus: 700,
  potassium: 4700,
  zinc: 11,
  selenium: 55,
  cholesterol: 300,
  saturated_fat: 22,
  sugars: 50,
};

// ─── Nutrient display config ──────────────────────────────────────────────────
type NutrientKey = keyof typeof RDI;

interface NutrientRow {
  key: NutrientKey;
  label: string;
  unit: string;
  dbKey: string; // key in nutrientDatabase
}

const MACROS: NutrientRow[] = [
  { key: "calories", label: "Calories", unit: "kcal", dbKey: "energy" },
  { key: "protein", label: "Protein", unit: "g", dbKey: "protein" },
  { key: "carbs", label: "Carbohydrates", unit: "g", dbKey: "carbs" },
  { key: "fat", label: "Total Fat", unit: "g", dbKey: "fat" },
  { key: "fiber", label: "Dietary Fiber", unit: "g", dbKey: "fiber" },
  { key: "sodium", label: "Sodium", unit: "mg", dbKey: "sodium" },
  { key: "sugars", label: "Total Sugars", unit: "g", dbKey: "sugars" },
  { key: "saturated_fat", label: "Saturated Fat", unit: "g", dbKey: "saturated_fat" },
  { key: "cholesterol", label: "Cholesterol", unit: "mg", dbKey: "cholesterol" },
];

const VITAMINS: NutrientRow[] = [
  { key: "vitamin_a", label: "Vitamin A", unit: "µg", dbKey: "vitamin_a" },
  { key: "vitamin_c", label: "Vitamin C", unit: "mg", dbKey: "vitamin_c" },
  { key: "vitamin_d", label: "Vitamin D", unit: "µg", dbKey: "vitamin_d" },
  { key: "vitamin_e", label: "Vitamin E", unit: "mg", dbKey: "vitamin_e" },
  { key: "vitamin_k", label: "Vitamin K", unit: "µg", dbKey: "vitamin_k" },
  { key: "thiamin", label: "Thiamin (B1)", unit: "mg", dbKey: "thiamin" },
  { key: "riboflavin", label: "Riboflavin (B2)", unit: "mg", dbKey: "riboflavin" },
  { key: "niacin", label: "Niacin (B3)", unit: "mg", dbKey: "niacin" },
  { key: "vitamin_b6", label: "Vitamin B6", unit: "mg", dbKey: "vitamin_b6" },
  { key: "folate", label: "Folate (B9)", unit: "µg", dbKey: "folate" },
  { key: "vitamin_b12", label: "Vitamin B12", unit: "µg", dbKey: "vitamin_b12" },
];

const MINERALS: NutrientRow[] = [
  { key: "calcium", label: "Calcium", unit: "mg", dbKey: "calcium" },
  { key: "iron", label: "Iron", unit: "mg", dbKey: "iron" },
  { key: "magnesium", label: "Magnesium", unit: "mg", dbKey: "magnesium" },
  { key: "phosphorus", label: "Phosphorus", unit: "mg", dbKey: "phosphorus" },
  { key: "potassium", label: "Potassium", unit: "mg", dbKey: "potassium" },
  { key: "zinc", label: "Zinc", unit: "mg", dbKey: "zinc" },
  { key: "selenium", label: "Selenium", unit: "µg", dbKey: "selenium" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getStatus(pct: number): "great" | "ok" | "low" | "none" {
  if (pct >= 80) return "great";
  if (pct >= 50) return "ok";
  if (pct > 0) return "low";
  return "none";
}

function statusColors(status: ReturnType<typeof getStatus>) {
  switch (status) {
    case "great": return { bar: "bg-green-500", text: "text-green-700 dark:text-green-400", badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" };
    case "ok":    return { bar: "bg-yellow-400", text: "text-yellow-700 dark:text-yellow-400", badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" };
    case "low":   return { bar: "bg-red-400", text: "text-red-600 dark:text-red-400", badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" };
    default:      return { bar: "bg-zinc-200 dark:bg-zinc-700", text: "text-zinc-400 dark:text-zinc-500", badge: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400" };
  }
}

function formatValue(val: number, unit: string): string {
  if (unit === "kcal") return Math.round(val).toString();
  if (val < 1) return val.toFixed(2);
  if (val < 10) return val.toFixed(1);
  return Math.round(val).toString();
}

// ─── NutrientDetailModal (matches Learn page NutrientModal style) ─────────────
function NutrientDetailModal({
  rows,
  initialIndex,
  intakes,
  onClose,
}: {
  rows: NutrientRow[];
  initialIndex: number;
  intakes: Record<string, number>;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const row = rows[idx];
  const nutrient: NutrientInfo | undefined = nutrientDatabase[row.dbKey as keyof typeof nutrientDatabase];
  const rdi = RDI[row.key] ?? 0;
  const actual = intakes[row.key] ?? 0;
  const pct = rdi > 0 ? Math.min(Math.round((actual / rdi) * 100), 100) : 0;
  const status = getStatus(pct);
  const colors = statusColors(status);

  const handlePrev = () => setIdx((i) => (i === 0 ? rows.length - 1 : i - 1));
  const handleNext = () => setIdx((i) => (i === rows.length - 1 ? 0 : i + 1));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div className="relative flex w-full max-w-5xl items-center justify-center gap-4">
        {/* Prev arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="hidden sm:flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700 transition"
          aria-label="Previous"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          className="max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{row.label}</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {nutrient?.category ?? "Nutrient"}
                {nutrient?.dailyValue && ` • Daily Value: ${nutrient.dailyValue}`}
              </p>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{idx + 1} / {rows.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handlePrev} className="sm:hidden rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Previous">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={handleNext} className="sm:hidden rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Next">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Today's intake summary */}
          <div className="mb-6 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
            <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Today&apos;s Intake</p>
            <div className="mb-1 flex items-end justify-between">
              <span className={`text-2xl font-bold ${colors.text}`}>
                {formatValue(actual, row.unit)}{row.unit}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                / {formatValue(rdi, row.unit)}{row.unit} RDI
              </span>
            </div>
            <div className="mb-1 h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className={`h-3 rounded-full transition-all ${colors.bar}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className={`text-xs font-medium ${colors.text}`}>
              {pct}% of daily value
              {status === "great" && " — Target met! ✓"}
              {status === "ok" && " — Getting there"}
              {status === "low" && " — You need more"}
              {status === "none" && " — Not logged today"}
            </p>
          </div>

          {/* Description */}
          {nutrient && (
            <div className="mb-6">
              <p className="text-zinc-700 dark:text-zinc-300">{nutrient.description}</p>
            </div>
          )}

          {/* Two Column Layout */}
          {nutrient && (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Benefits */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Health Benefits</h3>
                  <ul className="space-y-2">
                    {nutrient.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Food Sources */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Food Sources</h3>
                  <div className="flex flex-wrap gap-2">
                    {nutrient.sources.map((source, i) => (
                      <span key={i} className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Absorption Tips */}
                {nutrient.absorptionTips && nutrient.absorptionTips.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Absorption Tips</h3>
                    <ul className="space-y-2">
                      {nutrient.absorptionTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column — Overdose Risks */}
              {nutrient.overdoseRisks && nutrient.overdoseRisks.length > 0 && (
                <div>
                  <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                    <h3 className="mb-3 text-lg font-semibold text-red-900 dark:text-red-400">
                      ⚠️ Risks of Taking Too Much
                    </h3>
                    <ul className="space-y-2">
                      {nutrient.overdoseRisks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                          <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Next arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="hidden sm:flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700 transition"
          aria-label="Next"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── NutrientCard ─────────────────────────────────────────────────────────────
function NutrientTrackCard({
  row,
  actual,
  onClick,
}: {
  row: NutrientRow;
  actual: number;
  onClick: () => void;
}) {
  const rdi = RDI[row.key] ?? 0;
  const pct = rdi > 0 ? Math.min(Math.round((actual / rdi) * 100), 100) : 0;
  const status = getStatus(pct);
  const colors = statusColors(status);
  const nutrient: NutrientInfo | undefined = nutrientDatabase[row.dbKey as keyof typeof nutrientDatabase];

  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-zinc-200 p-4 text-left transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900"
    >
      {/* Name + badge */}
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-semibold group-hover:text-zinc-900 dark:group-hover:text-zinc-50">
          {row.label}
        </h3>
        <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
          {pct}%
        </span>
      </div>

      {/* Description snippet */}
      {nutrient && (
        <p className="mb-3 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
          {nutrient.description}
        </p>
      )}

      {/* Progress bar */}
      <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={`h-2 rounded-full transition-all ${colors.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Actual / RDI */}
      <div className="mt-1 flex items-center justify-between text-xs">
        <span className={`font-medium ${colors.text}`}>
          {formatValue(actual, row.unit)}{row.unit}
        </span>
        <span className="text-zinc-400 dark:text-zinc-500">
          / {formatValue(rdi, row.unit)}{row.unit}
        </span>
      </div>
    </button>
  );
}

// ─── Tab view ─────────────────────────────────────────────────────────────────
type TabView = "overview" | "macros" | "vitamins" | "minerals";

function TabGrid({
  rows,
  intakes,
  onSelect,
}: {
  rows: NutrientRow[];
  intakes: Record<string, number>;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row, idx) => (
        <NutrientTrackCard
          key={row.key}
          row={row}
          actual={intakes[row.key] ?? 0}
          onClick={() => onSelect(idx)}
        />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NutrientsPage() {
  const today = new Date().toISOString().split("T")[0];
  const { data: logs = [], isLoading } = useGetFoodLogsQuery({ start: today, end: today });

  // Sum all nutrients across today's logs
  const intakes = (logs as Array<Record<string, unknown>>).reduce<Record<string, number>>((acc, log) => {
    const qty = (log.quantity as number) ?? 1;
    for (const key of Object.keys(RDI)) {
      const raw = log[key];
      if (typeof raw === "number") {
        acc[key] = (acc[key] ?? 0) + raw * qty;
      }
    }
    return acc;
  }, {});

  const [view, setView] = useState<TabView>("overview");
  const [modal, setModal] = useState<{ rows: NutrientRow[]; idx: number } | null>(null);

  // Overview: all nutritients combined sorted by % of RDI ascending (show gaps first)
  const ALL_ROWS = [...MACROS, ...VITAMINS, ...MINERALS];
  const overviewRows = [...ALL_ROWS].sort((a, b) => {
    const pctA = RDI[a.key] > 0 ? (intakes[a.key] ?? 0) / RDI[a.key] : 1;
    const pctB = RDI[b.key] > 0 ? (intakes[b.key] ?? 0) / RDI[b.key] : 1;
    return pctA - pctB;
  });

  // Stats for summary banner
  const totalTracked = ALL_ROWS.length;
  const metCount = ALL_ROWS.filter((r) => (intakes[r.key] ?? 0) / (RDI[r.key] ?? 1) >= 0.8).length;
  const lowCount = ALL_ROWS.filter((r) => {
    const pct = (intakes[r.key] ?? 0) / (RDI[r.key] ?? 1);
    return pct > 0 && pct < 0.5;
  }).length;

  function openModal(rows: NutrientRow[], idx: number) {
    setModal({ rows, idx });
  }

  const tabBtn = (t: TabView, label: string, activeColor: string, inactiveColor: string) => (
    <button
      onClick={() => setView(t)}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        view === t ? activeColor : inactiveColor
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Daily Nutrients</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Track how today&apos;s meals stack up against recommended daily intakes
        </p>
      </div>

      {/* Summary banner */}
      <div className="mb-6 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 p-5 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-2xl font-bold">{metCount}<span className="text-base font-normal text-zinc-600 dark:text-zinc-400">/{totalTracked}</span></p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Targets met (≥80%)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{lowCount}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Nutrients below 50%</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{today}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">{logs.length} food{logs.length !== 1 ? "s" : ""} logged</p>
          </div>
        </div>
      </div>

      {/* Tab Strip */}
      <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2" style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="flex gap-2 min-w-max">
          {tabBtn(
            "overview", "Overview",
            "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
            "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          )}
          {tabBtn(
            "macros", "Macros",
            "bg-blue-900 text-white dark:bg-blue-100 dark:text-blue-900",
            "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-300 dark:hover:bg-blue-700"
          )}
          {tabBtn(
            "vitamins", "Vitamins",
            "bg-green-900 text-white dark:bg-green-100 dark:text-green-900",
            "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-300 dark:hover:bg-green-700"
          )}
          {tabBtn(
            "minerals", "Minerals",
            "bg-yellow-900 text-white dark:bg-yellow-100 dark:text-yellow-900",
            "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-300 dark:hover:bg-yellow-700"
          )}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-zinc-500">
          <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading today&apos;s nutrients...
        </div>
      )}

      {/* No logs state */}
      {!isLoading && logs.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
          <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">No foods logged today</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            Log some meals via <a href="/app/search" className="text-[#4169E1] hover:underline dark:text-[#87CEEB]">Search Foods</a> to see your nutrient breakdown.
          </p>
        </div>
      )}

      {/* Tab Content */}
      {!isLoading && (
        <>
          {/* ── OVERVIEW ───────────────────────────────────────────── */}
          {view === "overview" && (
            <div>
              <div className="mb-6 rounded-xl bg-zinc-50 p-6 dark:bg-zinc-800/40">
                <h2 className="mb-2 text-2xl font-bold">All Nutrients</h2>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Sorted by how close you are to your daily targets — gaps appear first.
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-full bg-green-500" /> ≥80% great</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-full bg-yellow-400" /> 50–79% ok</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-full bg-red-400" /> &lt;50% low</span>
                </div>
              </div>
              <TabGrid
                rows={overviewRows}
                intakes={intakes}
                onSelect={(idx) => openModal(overviewRows, idx)}
              />
            </div>
          )}

          {/* ── MACROS ─────────────────────────────────────────────── */}
          {view === "macros" && (
            <div>
              <div className="mb-6 rounded-xl bg-blue-50 p-6 dark:bg-blue-950/30">
                <h2 className="mb-2 text-2xl font-bold">🍽️ Macronutrients</h2>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Calories, protein, carbohydrates, fats — the foundation of your diet.
                </p>
              </div>
              <TabGrid rows={MACROS} intakes={intakes} onSelect={(idx) => openModal(MACROS, idx)} />
            </div>
          )}

          {/* ── VITAMINS ───────────────────────────────────────────── */}
          {view === "vitamins" && (
            <div>
              <div className="mb-6 rounded-xl bg-green-50 p-6 dark:bg-green-950/30">
                <h2 className="mb-2 text-2xl font-bold">🍃 Vitamins</h2>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Essential micronutrients that support immune function, energy, and cell health.
                </p>
              </div>
              <TabGrid rows={VITAMINS} intakes={intakes} onSelect={(idx) => openModal(VITAMINS, idx)} />
            </div>
          )}

          {/* ── MINERALS ───────────────────────────────────────────── */}
          {view === "minerals" && (
            <div>
              <div className="mb-6 rounded-xl bg-yellow-50 p-6 dark:bg-yellow-950/30">
                <h2 className="mb-2 text-2xl font-bold">🧂 Minerals</h2>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Inorganic elements crucial for bone health, nerve function, and metabolism.
                </p>
              </div>
              <TabGrid rows={MINERALS} intakes={intakes} onSelect={(idx) => openModal(MINERALS, idx)} />
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {modal && (
        <NutrientDetailModal
          rows={modal.rows}
          initialIndex={modal.idx}
          intakes={intakes}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
