"use client";

import { useState } from "react";
import {
  useGetWaterLogsQuery,
  useAddWaterLogMutation,
  useDeleteWaterLogMutation,
} from "@/store/api";

const DAILY_GOAL_CUPS = 8;

const QUICK_AMOUNTS = [
  { label: "½", cups: 0.5 },
  { label: "1",  cups: 1   },
  { label: "2",  cups: 2   },
];

export default function WaterWidget() {
  const today = new Date().toISOString().split("T")[0];
  const { data, isLoading } = useGetWaterLogsQuery(today);
  const [addWaterLog]    = useAddWaterLogMutation();
  const [deleteWaterLog] = useDeleteWaterLogMutation();

  const [adding, setAdding]   = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [showLog, setShowLog] = useState(false);

  const totalCups = data?.totalCups ?? 0;
  const logs      = data?.logs ?? [];
  const pct       = Math.min(100, (totalCups / DAILY_GOAL_CUPS) * 100);

  const ringColor =
    pct >= 100 ? "stroke-emerald-500" :
    pct >= 50  ? "stroke-blue-400"    :
    "stroke-sky-300";

  const textColor =
    pct >= 100 ? "text-emerald-600 dark:text-emerald-400" :
    pct >= 50  ? "text-blue-600 dark:text-blue-400"       :
    "text-sky-600 dark:text-sky-400";

  async function handleAdd(cups: number) {
    if (adding) return;
    setAdding(true);
    setError(null);
    try {
      await addWaterLog({ cups, date: today });
    } catch {
      setError("Failed to log water");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteWaterLog(id);
    } catch {
      setError("Failed to remove entry");
    }
  }

  // SVG ring parameters
  const R  = 38;
  const CX = 52;
  const CY = 52;
  const circumference = 2 * Math.PI * R;
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-blue-950/70 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        {/* Ring + label */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <svg width={104} height={104} className="-rotate-90">
              {/* Background track */}
              <circle
                cx={CX} cy={CY} r={R}
                fill="none"
                strokeWidth={8}
                className="stroke-zinc-100 dark:stroke-zinc-800"
              />
              {/* Progress arc */}
              <circle
                cx={CX} cy={CY} r={R}
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={isLoading ? circumference : dashOffset}
                className={`transition-all duration-500 ${ringColor}`}
              />
            </svg>
            {/* Centre text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl">💧</span>
              <span className={`text-sm font-bold tabular-nums leading-none ${textColor}`}>
                {totalCups % 1 === 0 ? totalCups : totalCups.toFixed(1)}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Water Today
            </p>
            <p className="mt-0.5 text-2xl font-bold tabular-nums">
              {totalCups % 1 === 0 ? totalCups : totalCups.toFixed(1)}
              <span className="ml-1 text-sm font-normal text-zinc-500">/ {DAILY_GOAL_CUPS} cups</span>
            </p>
            <p className={`mt-0.5 text-xs font-medium ${textColor}`}>
              {pct >= 100
                ? "Goal reached! 🎉"
                : `${(DAILY_GOAL_CUPS - totalCups).toFixed(1)} cups to go`}
            </p>
          </div>
        </div>

        {/* Log toggle */}
        {logs.length > 0 && (
          <button
            onClick={() => setShowLog((v) => !v)}
            className="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {showLog ? "Hide" : `${logs.length} log${logs.length > 1 ? "s" : ""}`}
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            pct >= 100 ? "bg-emerald-500" : pct >= 50 ? "bg-blue-400" : "bg-sky-300"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Quick-add buttons */}
      <div className="mt-3 flex items-center gap-2">
        {QUICK_AMOUNTS.map(({ label, cups }) => (
          <button
            key={cups}
            onClick={() => handleAdd(cups)}
            disabled={adding}
            className="flex-1 rounded-full border border-sky-200 bg-sky-50 py-1.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100 disabled:opacity-50 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-300 dark:hover:bg-sky-900/40"
          >
            +{label}
          </button>
        ))}
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      {/* Log entries */}
      {showLog && logs.length > 0 && (
        <div className="mt-3 space-y-1.5 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          {[...logs].reverse().map((log) => (
            <div key={log.id} className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
              <span>
                💧 {log.cups % 1 === 0 ? log.cups : log.cups.toFixed(1)} cup{log.cups !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">
                  {new Date(log.logged_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </span>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="rounded p-0.5 text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400"
                  title="Remove"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
