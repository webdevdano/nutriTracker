"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import {
  useGetWeightLogsQuery,
  useAddWeightLogMutation,
  useDeleteWeightLogMutation,
  type WeightLog,
} from "@/store/api";

// ─── Tooltip ─────────────────────────────────────────────────────────────────

function WeightTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: WeightLog }> }) {
  if (!active || !payload?.length) return null;
  const w = payload[0].payload;
  const d = new Date(w.logged_at + "T12:00:00");
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs shadow dark:border-zinc-700 dark:bg-zinc-900">
      <p className="font-semibold">{w.weight_lbs} lbs</p>
      <p className="text-zinc-500">{d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
    </div>
  );
}

// ─── WeightWidget ─────────────────────────────────────────────────────────────

export default function WeightWidget() {
  const { data: logs = [], isLoading } = useGetWeightLogsQuery({ days: 90 });
  const [addWeightLog]    = useAddWeightLogMutation();
  const [deleteWeightLog] = useDeleteWeightLogMutation();

  const [showForm, setShowForm]   = useState(false);
  const [inputVal, setInputVal]   = useState("");
  const [noteVal, setNoteVal]     = useState("");
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Most recent reading
  const latest   = logs.length ? logs[logs.length - 1] : null;
  const previous = logs.length > 1 ? logs[logs.length - 2] : null;
  const delta    = latest && previous ? latest.weight_lbs - previous.weight_lbs : null;

  // Chart data — last 30 readings (or all if fewer)
  const chartData = logs.slice(-30);

  // For the Y axis domain: add a small margin above/below min/max
  const weights = chartData.map((l) => l.weight_lbs);
  const minW = weights.length ? Math.floor(Math.min(...weights)) - 2 : 100;
  const maxW = weights.length ? Math.ceil(Math.max(...weights))  + 2 : 200;

  async function handleLog() {
    const val = parseFloat(inputVal);
    if (isNaN(val) || val <= 0 || val > 1500) {
      setError("Enter a valid weight in lbs");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await addWeightLog({ weight_lbs: val, note: noteVal || undefined }).unwrap();
      setInputVal("");
      setNoteVal("");
      setShowForm(false);
    } catch {
      setError("Failed to save — try again");
    } finally {
      setSaving(false);
    }
  }

  // Today already logged?
  const today    = new Date().toISOString().split("T")[0];
  const todayLog = logs.find((l) => l.logged_at === today);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white dark:border-zinc-800/80 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-base">⚖️</span>
          <h2 className="text-sm font-semibold">Weight</h2>
        </div>
        <button
          onClick={() => { setShowForm((v) => !v); setError(null); }}
          className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          {showForm ? "Cancel" : todayLog ? "Update" : "+ Log"}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Log form */}
        {showForm && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                min="50"
                max="1500"
                placeholder={todayLog ? String(todayLog.weight_lbs) : "lbs"}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLog()}
                autoFocus
                className="w-24 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm outline-none focus:border-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-[#87CEEB]"
              />
              <input
                type="text"
                placeholder="Note (optional)"
                value={noteVal}
                onChange={(e) => setNoteVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLog()}
                className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm outline-none focus:border-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800"
              />
              <button
                onClick={handleLog}
                disabled={saving || !inputVal}
                className="rounded-lg bg-[#4169E1] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#000080] disabled:opacity-50 dark:bg-[#87CEEB] dark:text-black"
              >
                {saving ? "…" : "Save"}
              </button>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        )}

        {/* Current weight + delta */}
        {isLoading ? (
          <p className="text-sm text-zinc-400">Loading…</p>
        ) : latest ? (
          <div className="flex items-end gap-3">
            <div>
              <p className="text-3xl font-bold tracking-tight">
                {latest.weight_lbs}
                <span className="ml-1 text-base font-normal text-zinc-400">lbs</span>
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">
                {new Date(latest.logged_at + "T12:00:00").toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </p>
            </div>
            {delta !== null && (
              <span className={`mb-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                delta > 0
                  ? "bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400"
                  : delta < 0
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
              }`}>
                {delta > 0 ? "▲" : delta < 0 ? "▼" : "–"} {Math.abs(delta).toFixed(1)} lbs
              </span>
            )}
          </div>
        ) : (
          <div className="py-2">
            <p className="text-sm text-zinc-400">No entries yet.</p>
            <p className="mt-0.5 text-xs text-zinc-400">Log your weight to start tracking.</p>
          </div>
        )}

        {/* Sparkline */}
        {chartData.length > 1 && (
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <XAxis
                  dataKey="logged_at"
                  tick={false}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[minW, maxW]}
                  tick={{ fontSize: 10, fill: "#a1a1aa" }}
                  axisLine={false}
                  tickLine={false}
                  tickCount={3}
                />
                <Tooltip content={<WeightTooltip />} />
                {/* Flat reference line at starting weight */}
                <ReferenceLine
                  y={logs[0].weight_lbs}
                  stroke="#a1a1aa"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
                <Line
                  type="monotone"
                  dataKey="weight_lbs"
                  stroke="#4169E1"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#4169E1" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Recent log list */}
        {logs.length > 0 && (
          <div className="mt-auto">
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-zinc-400">Recent</p>
            <div className="space-y-1 overflow-y-auto" style={{ maxHeight: "84px" }}>
              {[...logs].reverse().slice(0, 5).map((log) => {
                const d = new Date(log.logged_at + "T12:00:00");
                return (
                  <div
                    key={log.id}
                    onMouseEnter={() => setHoveredId(log.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="flex items-center justify-between rounded-lg px-1.5 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs text-zinc-500">
                      {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      {log.note && <span className="ml-1.5 italic text-zinc-400">{log.note}</span>}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{log.weight_lbs} lbs</span>
                      {hoveredId === log.id && (
                        <button
                          onClick={() => deleteWeightLog(log.id)}
                          className="text-xs text-red-400 hover:text-red-600"
                          aria-label="Delete"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
