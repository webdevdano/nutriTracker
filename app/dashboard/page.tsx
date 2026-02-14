"use client";

import { useMemo, useState } from "react";
import { nutrientDatabase, type NutrientInfo } from "@/lib/nutrient-data";

type BmiResponse = {
  bmi?: string;
};

type NutritionInfoResponse = {
  BMI_EER?: {
    BMI?: string;
    "Estimated Daily Caloric Needs"?: string;
  };
  macronutrients_table?: {
    "macronutrients-table"?: string[][];
  };
};

type ErrorResponse = {
  error?: string;
  hint?: string;
  upstreamStatus?: number;
};

function toSearchParams(form: Record<string, string>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(form)) {
    if (value.trim().length > 0) params.set(key, value.trim());
  }
  return params;
}

function buildParams(form: Record<string, string>) {
  const base = {
    measurement_units: form.measurement_units,
    sex: form.sex,
    age_value: form.age_value,
    age_type: form.age_type,
    activity_level: form.activity_level,
  };

  const measurement: Record<string, string> =
    form.measurement_units === "met"
      ? { cm: form.cm, kilos: form.kilos }
      : { feet: form.feet, inches: form.inches, lbs: form.lbs };

  return toSearchParams({ ...base, ...measurement } as Record<string, string>);
}

export default function DashboardPage() {
  const [form, setForm] = useState({
    measurement_units: "std",
    sex: "female",
    age_value: "20",
    age_type: "yrs",
    activity_level: "Active",
    feet: "5",
    inches: "2",
    lbs: "120",
    cm: "",
    kilos: "",
  });

  const [loading, setLoading] = useState(false);
  const [bmi, setBmi] = useState<string | null>(null);
  const [bmiError, setBmiError] = useState<string | null>(null);
  const [nutritionError, setNutritionError] = useState<string | null>(null);
  const [data, setData] = useState<NutritionInfoResponse | null>(null);

  const isStd = form.measurement_units === "std";

  // Macro progress rows with nutrient info
  const macroRows = useMemo(() => {
    const table = data?.macronutrients_table?.["macronutrients-table"];
    if (!table || table.length < 2) return [];
    return table
      .slice(1)
      .map((row) => {
        const info = Object.values(nutrientDatabase).find(n => (n as NutrientInfo).name === row[0]) as NutrientInfo | undefined;
        const value = parseFloat(row[1]);
        let goal = 0;
        const unit = info?.unit || "g";
        if (info?.dailyValue) {
          const match = info.dailyValue.match(/([\d\.]+)/);
          if (match) goal = parseFloat(match[1]);
        }
        return { name: row[0], value, goal, unit };
      })
      .filter((row) => row.name && row.value !== undefined);
  }, [data]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setBmi(null);
    setBmiError(null);
    setNutritionError(null);
    setData(null);

    try {
      const params = buildParams(form);

      const [bmiResult, nutritionResult] = await Promise.allSettled([
        fetch(`/api/bmi?${params.toString()}`).then(async (response) => {
          const json = (await response.json()) as BmiResponse & ErrorResponse;
          return { ok: response.ok, status: response.status, json };
        }),
        fetch(`/api/nutrition-info?${params.toString()}`).then(async (response) => {
          const json = (await response.json()) as NutritionInfoResponse &
            ErrorResponse;
          return { ok: response.ok, status: response.status, json };
        }),
      ]);

      if (bmiResult.status === "fulfilled") {
        if (bmiResult.value.ok) {
          setBmi(bmiResult.value.json.bmi ?? null);
        } else {
          setBmiError(bmiResult.value.json.error || "BMI request failed");
        }
      } else {
        setBmiError(
          bmiResult.reason instanceof Error
            ? bmiResult.reason.message
            : "BMI request failed",
        );
      }

      if (nutritionResult.status === "fulfilled") {
        if (nutritionResult.value.ok) {
          setData(nutritionResult.value.json);
        } else {
          const json = nutritionResult.value.json;
          const parts = [json.error || "Recommendations request failed"];
          if (json.upstreamStatus) parts.push(`(upstream ${json.upstreamStatus})`);
          if (json.hint) parts.push(json.hint);
          setNutritionError(parts.join(" "));
        }
      } else {
        setNutritionError(
          nutritionResult.reason instanceof Error
            ? nutritionResult.reason.message
            : "Recommendations request failed",
        );
      }
    } catch (err) {
      setNutritionError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  function update(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200/70 dark:border-zinc-800/80">
        <div className="mx-auto w-full max-w-5xl px-6 py-4">
          <div className="text-sm font-semibold tracking-tight">Dashboard</div>
          <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            RapidAPI Nutrition Calculator integration (BMI + recommended intake)
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-zinc-200/70 p-6 dark:border-zinc-800/80">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="grid gap-1">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Units</span>
              <select
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={form.measurement_units}
                onChange={(e) => update("measurement_units", e.target.value)}
              >
                <option value="std">Imperial (ft/lb)</option>
                <option value="met">Metric (cm/kg)</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Sex</span>
              <select
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={form.sex}
                onChange={(e) => update("sex", e.target.value)}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Activity</span>
              <select
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={form.activity_level}
                onChange={(e) => update("activity_level", e.target.value)}
              >
                <option value="Inactive">Inactive</option>
                <option value="Low Active">Low Active</option>
                <option value="Active">Active</option>
                <option value="Very Active">Very Active</option>
              </select>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="grid gap-1">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Age</span>
              <input
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                inputMode="numeric"
                value={form.age_value}
                onChange={(e) => update("age_value", e.target.value)}
              />
            </label>

            <label className="grid gap-1">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Age type</span>
              <select
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={form.age_type}
                onChange={(e) => update("age_type", e.target.value)}
              >
                <option value="yrs">Years</option>
                <option value="mos">Months</option>
              </select>
            </label>

            <div className="hidden sm:block" />
          </div>

          {isStd ? (
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="grid gap-1">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Height (feet)</span>
                <input
                  className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                  inputMode="numeric"
                  value={form.feet}
                  onChange={(e) => update("feet", e.target.value)}
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Height (inches)</span>
                <input
                  className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                  inputMode="numeric"
                  value={form.inches}
                  onChange={(e) => update("inches", e.target.value)}
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Weight (lbs)</span>
                <input
                  className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                  inputMode="numeric"
                  value={form.lbs}
                  onChange={(e) => update("lbs", e.target.value)}
                />
              </label>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="grid gap-1">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Height (cm)</span>
                <input
                  className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                  inputMode="numeric"
                  value={form.cm}
                  onChange={(e) => update("cm", e.target.value)}
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Weight (kg)</span>
                <input
                  className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                  inputMode="numeric"
                  value={form.kilos}
                  onChange={(e) => update("kilos", e.target.value)}
                />
              </label>
              <div className="hidden sm:block" />
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
              type="submit"
              disabled={loading}
            >
              {loading ? "Calculating…" : "Calculate"}
            </button>

            <div className="text-sm">
              {bmiError ? (
                <div className="text-red-600 dark:text-red-400">{bmiError}</div>
              ) : null}
              {nutritionError ? (
                <div className="mt-1 text-amber-700 dark:text-amber-300">
                  {nutritionError}
                </div>
              ) : null}
            </div>
          </div>
        </form>

        {bmi || data ? (
          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200/70 p-6 dark:border-zinc-800/80">
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">BMI</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">
                {bmi ?? data?.BMI_EER?.BMI ?? "—"}
              </div>
              <div className="mt-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Estimated daily calories
              </div>
              <div className="mt-2 text-base text-zinc-900 dark:text-zinc-50">
                {data?.BMI_EER?.["Estimated Daily Caloric Needs"] ?? "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200/70 p-6 dark:border-zinc-800/80">
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">Macros & Key Nutrients</div>
              {macroRows.length ? (
                <>
                  {/* Carbohydrates Group */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-blue-700 dark:text-blue-300">Carbohydrates</span>
                      <button title="Primary energy source for the body. Includes sugars, starches, and fiber." className="text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 focus:outline-none">
                        <svg className="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" /></svg>
                      </button>
                    </div>
                    {macroRows.filter(r => r.name === 'Carbohydrates' || r.name === 'Total Sugars' || r.name === 'Dietary Fiber').map(row => {
                      const color = row.name === 'Carbohydrates' ? 'bg-blue-500 dark:bg-blue-400' : row.name === 'Total Sugars' ? 'bg-pink-500 dark:bg-pink-400' : 'bg-purple-500 dark:bg-purple-400';
                      const consumed = row.value ?? 0;
                      const goal = row.goal ?? 0;
                      const percent = goal > 0 ? Math.min(100, (consumed / goal) * 100) : 0;
                      return (
                        <div key={row.name} className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-3 mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{row.name}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">{consumed} / {goal} {row.unit}</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                            <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${percent}%`, minWidth: percent === 0 ? '8px' : undefined }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Fats Group */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-yellow-700 dark:text-yellow-300">Fats</span>
                      <button title="Essential for energy, cell growth, and vitamin absorption. Includes total, saturated, and other fats." className="text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200 focus:outline-none">
                        <svg className="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" /></svg>
                      </button>
                    </div>
                    {macroRows.filter(r => r.name === 'Total Fat' || r.name === 'Saturated Fat').map(row => {
                      const color = row.name === 'Total Fat' ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-orange-500 dark:bg-orange-400';
                      const consumed = row.value ?? 0;
                      const goal = row.goal ?? 0;
                      const percent = goal > 0 ? Math.min(100, (consumed / goal) * 100) : 0;
                      return (
                        <div key={row.name} className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-3 mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{row.name}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">{consumed} / {goal} {row.unit}</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                            <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${percent}%`, minWidth: percent === 0 ? '8px' : undefined }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Cholesterol Group */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-rose-700 dark:text-rose-300">Cholesterol</span>
                      <button title="Waxy substance found in animal products. Important for hormones, but excess can increase heart risk." className="text-rose-400 hover:text-rose-700 dark:hover:text-rose-200 focus:outline-none">
                        <svg className="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" /></svg>
                      </button>
                    </div>
                    {macroRows.filter(r => r.name === 'Cholesterol').map(row => {
                      const color = 'bg-rose-500 dark:bg-rose-400';
                      const consumed = row.value ?? 0;
                      const goal = row.goal ?? 0;
                      const percent = goal > 0 ? Math.min(100, (consumed / goal) * 100) : 0;
                      return (
                        <div key={row.name} className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-3 mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{row.name}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">{consumed} / {goal} {row.unit}</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                            <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${percent}%`, minWidth: percent === 0 ? '8px' : undefined }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Protein Group (for completeness) */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-orange-700 dark:text-orange-300">Protein</span>
                      <button title="Essential for building and repairing tissues, and supporting immune function." className="text-orange-400 hover:text-orange-700 dark:hover:text-orange-200 focus:outline-none">
                        <svg className="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" /></svg>
                      </button>
                    </div>
                    {macroRows.filter(r => r.name === 'Protein').map(row => {
                      const color = 'bg-orange-500 dark:bg-orange-400';
                      const consumed = row.value ?? 0;
                      const goal = row.goal ?? 0;
                      const percent = goal > 0 ? Math.min(100, (consumed / goal) * 100) : 0;
                      return (
                        <div key={row.name} className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-3 mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{row.name}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">{consumed} / {goal} {row.unit}</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                            <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${percent}%`, minWidth: percent === 0 ? '8px' : undefined }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {nutritionError
                    ? "Recommendations unavailable."
                    : "No macro data."}
                </div>
              )}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
