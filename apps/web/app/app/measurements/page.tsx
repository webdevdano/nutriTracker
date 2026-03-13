"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Measurement = {
  id: string;
  date: string;
  neck?: number | null;
  shoulders?: number | null;
  chest?: number | null;
  waist?: number | null;
  hips?: number | null;
  left_bicep?: number | null;
  right_bicep?: number | null;
  left_thigh?: number | null;
  right_thigh?: number | null;
  left_calf?: number | null;
  right_calf?: number | null;
  body_fat_pct?: number | null;
  note?: string | null;
};

const FIELDS: { key: keyof Measurement; label: string; unit: string }[] = [
  { key: "neck",        label: "Neck",         unit: "in" },
  { key: "shoulders",   label: "Shoulders",    unit: "in" },
  { key: "chest",       label: "Chest",        unit: "in" },
  { key: "waist",       label: "Waist",        unit: "in" },
  { key: "hips",        label: "Hips",         unit: "in" },
  { key: "left_bicep",  label: "Left Bicep",   unit: "in" },
  { key: "right_bicep", label: "Right Bicep",  unit: "in" },
  { key: "left_thigh",  label: "Left Thigh",   unit: "in" },
  { key: "right_thigh", label: "Right Thigh",  unit: "in" },
  { key: "left_calf",   label: "Left Calf",    unit: "in" },
  { key: "right_calf",  label: "Right Calf",   unit: "in" },
  { key: "body_fat_pct", label: "Body Fat %",  unit: "%" },
];

const CHART_COLORS = [
  "#4169E1","#22c55e","#f59e0b","#ef4444","#8b5cf6",
  "#06b6d4","#ec4899","#84cc16","#f97316","#6366f1","#14b8a6","#f43f5e",
];

export default function MeasurementsPage() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState<Partial<Measurement>>({ date: new Date().toISOString().split("T")[0] });
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState<string | null>(null);
  const [chartFields, setChartFields] = useState<string[]>(["waist", "chest"]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/measurements?limit=30");
      if (res.ok) {
        const { measurements: data } = await res.json();
        setMeasurements(data);
        setLoaded(true);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/measurements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const { measurement } = await res.json();
        setMeasurements((prev) => {
          const idx = prev.findIndex((m) => m.date === measurement.date);
          return idx >= 0
            ? prev.map((m, i) => (i === idx ? measurement : m))
            : [measurement, ...prev].sort((a, b) => b.date.localeCompare(a.date));
        });
        setShowForm(false);
        setToast("Measurements saved!");
        setTimeout(() => setToast(null), 3000);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/measurements?id=${id}`, { method: "DELETE" });
    setMeasurements((prev) => prev.filter((m) => m.id !== id));
  }

  const chartData = useMemo(
    () => [...measurements].reverse().map((m) => ({ ...m, date: m.date.slice(5) })),
    [measurements]
  );

  if (!loaded && !loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-sm text-zinc-500">Track your body measurements over time</p>
        <button
          onClick={load}
          className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900"
        >
          Load Measurements
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-sm text-zinc-500">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Body Measurements</h1>
        <button
          onClick={() => { setForm({ date: new Date().toISOString().split("T")[0] }); setShowForm(true); }}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900"
        >
          + Log Measurements
        </button>
      </div>

      {/* Chart */}
      {measurements.length >= 2 && (
        <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-blue-950/70 dark:bg-zinc-900">
          <div className="mb-3 flex flex-wrap gap-2">
            {FIELDS.map((f) => (
              <button
                key={f.key}
                onClick={() =>
                  setChartFields((prev) =>
                    prev.includes(f.key as string)
                      ? prev.filter((k) => k !== f.key)
                      : [...prev, f.key as string]
                  )
                }
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  chartFields.includes(f.key as string)
                    ? "border-transparent bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    : "border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: -12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="″" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {FIELDS.filter((f) => chartFields.includes(f.key as string)).map((f, i) => (
                <Line
                  key={f.key}
                  type="monotone"
                  dataKey={f.key as string}
                  name={f.label}
                  stroke={CHART_COLORS[i % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Log entries */}
      {measurements.length === 0 ? (
        <p className="text-center text-sm text-zinc-500">No measurements logged yet. Add your first entry!</p>
      ) : (
        <div className="space-y-4">
          {measurements.map((m) => (
            <div key={m.id} className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-blue-950/70 dark:bg-zinc-900">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold">{m.date}</h3>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-xs text-zinc-400 hover:text-red-500"
                  title="Delete"
                >
                  ✕
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {FIELDS.filter((f) => m[f.key] != null).map((f) => (
                  <div key={f.key} className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/40">
                    <p className="text-xs text-zinc-500">{f.label}</p>
                    <p className="text-sm font-semibold">{(m[f.key] as number).toFixed(1)}{f.unit}</p>
                  </div>
                ))}
              </div>
              {m.note && <p className="mt-2 text-xs text-zinc-500 italic">{m.note}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Log form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <form
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Log Measurements</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-700">✕</button>
            </div>

            <label className="mb-4 block">
              <span className="text-xs text-zinc-500">Date</span>
              <input
                type="date"
                className="mt-1 block w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                value={form.date ?? ""}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
              />
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-xs text-zinc-500">{f.label} ({f.unit})</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    className="mt-1 block w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                    value={(form[f.key] as string | number | undefined) ?? ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder="—"
                  />
                </label>
              ))}
            </div>

            <label className="mt-3 block">
              <span className="text-xs text-zinc-500">Note (optional)</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                value={form.note ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                placeholder="e.g. morning, fasted"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="mt-5 h-10 w-full rounded-full bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
            >
              {saving ? "Saving…" : "Save Measurements"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
