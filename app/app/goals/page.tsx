"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GoalsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  useEffect(() => {
    async function fetchGoals() {
      const supabase = createClient();
      const { data } = await supabase.from("user_goals").select("*").single();

      if (data) {
        setCalories(String(data.calories_goal || ""));
        setProtein(String(data.protein_goal || ""));
        setCarbs(String(data.carbs_goal || ""));
        setFat(String(data.fat_goal || ""));
      }

      setFetching(false);
    }

    fetchGoals();
  }, []);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error: upsertError } = await supabase.from("user_goals").upsert(
      {
        calories_goal: calories ? Number(calories) : null,
        protein_goal: protein ? Number(protein) : null,
        carbs_goal: carbs ? Number(carbs) : null,
        fat_goal: fat ? Number(fat) : null,
      },
      { onConflict: "user_id" },
    );

    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }

    router.push("/app");
  }

  if (fetching) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8">
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Daily Goals</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Set your daily nutrition targets
      </p>

      <form
        onSubmit={handleSave}
        className="mt-6 rounded-2xl border border-zinc-200/70 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Calories goal</span>
            <input
              type="number"
              inputMode="numeric"
              className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
              placeholder="2000"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Protein goal (g)</span>
            <input
              type="number"
              inputMode="numeric"
              className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
              placeholder="150"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Carbs goal (g)</span>
            <input
              type="number"
              inputMode="numeric"
              className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
              placeholder="200"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Fat goal (g)</span>
            <input
              type="number"
              inputMode="numeric"
              className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
              placeholder="65"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </label>
        </div>

        {error ? (
          <div className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</div>
        ) : null}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="h-11 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
            disabled={loading}
          >
            {loading ? "Saving…" : "Save Goals"}
          </button>
          <a
            href="/app"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
