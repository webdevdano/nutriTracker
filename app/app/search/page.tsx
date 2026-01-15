"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type UsdaFood = {
  fdcId: number;
  description: string;
  dataType?: string;
  brandOwner?: string;
  foodNutrients?: Array<{
    nutrientName: string;
    value: number;
    unitName: string;
  }>;
};

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UsdaFood[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/foods/search?query=${encodeURIComponent(query)}&pageSize=15`,
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Search failed");
        setResults([]);
        return;
      }

      setResults(data.foods || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogFood(food: UsdaFood) {
    const calories =
      food.foodNutrients?.find((n) => n.nutrientName === "Energy")?.value || 0;
    const protein =
      food.foodNutrients?.find((n) => n.nutrientName === "Protein")?.value || 0;
    const carbs =
      food.foodNutrients?.find(
        (n) => n.nutrientName === "Carbohydrate, by difference",
      )?.value || 0;
    const fat =
      food.foodNutrients?.find((n) => n.nutrientName === "Total lipid (fat)")?.value ||
      0;

    const supabase = createClient();
    const today = new Date().toISOString().split("T")[0];

    const { error: insertError } = await supabase.from("food_logs").insert({
      date: today,
      fdc_id: food.fdcId,
      food_name: food.description,
      calories,
      protein,
      carbs,
      fat,
      quantity: 1,
    });

    if (insertError) {
      alert(`Failed to log food: ${insertError.message}`);
      return;
    }

    router.push("/app");
  }

  function getNutrientValue(food: UsdaFood, name: string): string {
    const nutrient = food.foodNutrients?.find((n) => n.nutrientName === name);
    if (!nutrient) return "—";
    return `${Math.round(nutrient.value)}${nutrient.unitName}`;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Search Foods</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Find foods from the USDA database and log them
      </p>

      <form onSubmit={handleSearch} className="mt-6">
        <div className="flex gap-2">
          <input
            type="text"
            className="h-11 flex-1 rounded-xl border border-zinc-300 bg-transparent px-4 text-sm dark:border-zinc-700"
            placeholder="Search for foods (e.g., chicken breast, broccoli)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="h-11 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
            disabled={loading}
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
      </form>

      {error ? (
        <div className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</div>
      ) : null}

      {results.length > 0 ? (
        <div className="mt-6 grid gap-3">
          {results.map((food) => (
            <div
              key={food.fdcId}
              className="rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-800/80"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{food.description}</div>
                  {food.brandOwner ? (
                    <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      {food.brandOwner}
                    </div>
                  ) : null}
                  <div className="mt-2 flex gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                    <span>{getNutrientValue(food, "Energy")} cal</span>
                    <span>{getNutrientValue(food, "Protein")} protein</span>
                    <span>
                      {getNutrientValue(food, "Carbohydrate, by difference")} carbs
                    </span>
                    <span>{getNutrientValue(food, "Total lipid (fat)")} fat</span>
                  </div>
                </div>
                <button
                  onClick={() => handleLogFood(food)}
                  className="shrink-0 rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  + Log
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : query && !loading ? (
        <div className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          No results found. Try a different search term.
        </div>
      ) : null}
    </div>
  );
}
