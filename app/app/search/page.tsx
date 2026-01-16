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

type ServingSize = {
  label: string;
  grams: number;
};

const SERVING_SIZES: ServingSize[] = [
  { label: "100g", grams: 100 },
  { label: "150g", grams: 150 },
  { label: "200g", grams: 200 },
];

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UsdaFood[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedFood, setSelectedFood] = useState<UsdaFood | null>(null);
  const [servingSize, setServingSize] = useState<number>(100);
  const [customServing, setCustomServing] = useState("");
  const [mealType, setMealType] = useState("Lunch");
  const [adding, setAdding] = useState(false);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/foods/search?query=${encodeURIComponent(query)}&pageSize=5`,
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Search failed");
        setResults([]);
        return;
      }

      // Simple deduplication by description
      const seen = new Set();
      const deduped = (data.foods || []).filter((food: UsdaFood) => {
        const key = food.description.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setResults(deduped.slice(0, 5));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function openModal(food: UsdaFood) {
    setSelectedFood(food);
    setServingSize(100);
    setCustomServing("");
    setMealType("Lunch");
  }

  function closeModal() {
    setSelectedFood(null);
  }

  function getNutrient(name: string): number {
    if (!selectedFood?.foodNutrients) return 0;
    return selectedFood.foodNutrients.find((n) => n.nutrientName === name)?.value || 0;
  }

  async function handleAddFood() {
    if (!selectedFood) return;

    setAdding(true);
    const multiplier = servingSize / 100; // USDA values are per 100g

    // Extract all nutrients from USDA API
    const calories = getNutrient("Energy") * multiplier;
    const protein = getNutrient("Protein") * multiplier;
    const carbs = getNutrient("Carbohydrate, by difference") * multiplier;
    const fat = getNutrient("Total lipid (fat)") * multiplier;
    const fiber = getNutrient("Fiber, total dietary") * multiplier;
    const sodium = getNutrient("Sodium, Na") * multiplier;
    
    // Fat breakdown
    const saturated_fat = getNutrient("Fatty acids, total saturated") * multiplier;
    const trans_fat = getNutrient("Fatty acids, total trans") * multiplier;
    const polyunsaturated_fat = getNutrient("Fatty acids, total polyunsaturated") * multiplier;
    const monounsaturated_fat = getNutrient("Fatty acids, total monounsaturated") * multiplier;
    const cholesterol = getNutrient("Cholesterol") * multiplier;
    
    // Sugars
    const sugars = getNutrient("Sugars, total including NLEA") * multiplier;
    const added_sugars = getNutrient("Sugars, added") * multiplier;
    
    // Vitamins
    const vitamin_a = getNutrient("Vitamin A, RAE") * multiplier;
    const vitamin_c = getNutrient("Vitamin C, total ascorbic acid") * multiplier;
    const vitamin_d = getNutrient("Vitamin D (D2 + D3)") * multiplier;
    const vitamin_e = getNutrient("Vitamin E (alpha-tocopherol)") * multiplier;
    const vitamin_k = getNutrient("Vitamin K (phylloquinone)") * multiplier;
    const thiamin = getNutrient("Thiamin") * multiplier;
    const riboflavin = getNutrient("Riboflavin") * multiplier;
    const niacin = getNutrient("Niacin") * multiplier;
    const vitamin_b6 = getNutrient("Vitamin B-6") * multiplier;
    const folate = getNutrient("Folate, total") * multiplier;
    const vitamin_b12 = getNutrient("Vitamin B-12") * multiplier;
    
    // Minerals
    const calcium = getNutrient("Calcium, Ca") * multiplier;
    const iron = getNutrient("Iron, Fe") * multiplier;
    const magnesium = getNutrient("Magnesium, Mg") * multiplier;
    const phosphorus = getNutrient("Phosphorus, P") * multiplier;
    const potassium = getNutrient("Potassium, K") * multiplier;
    const zinc = getNutrient("Zinc, Zn") * multiplier;
    const selenium = getNutrient("Selenium, Se") * multiplier;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert("You must be logged in to log food");
      setAdding(false);
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const { error: insertError } = await supabase.from("food_logs").insert({
      user_id: user.id,
      date: today,
      fdc_id: selectedFood.fdcId,
      food_name: `${selectedFood.description} (${servingSize}g)`,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sodium,
      saturated_fat,
      trans_fat,
      polyunsaturated_fat,
      monounsaturated_fat,
      cholesterol,
      sugars,
      added_sugars,
      vitamin_a,
      vitamin_c,
      vitamin_d,
      vitamin_e,
      vitamin_k,
      thiamin,
      riboflavin,
      niacin,
      vitamin_b6,
      folate,
      vitamin_b12,
      calcium,
      iron,
      magnesium,
      phosphorus,
      potassium,
      zinc,
      selenium,
      quantity: 1,
      time: new Date().toISOString(),
    });

    setAdding(false);

    if (insertError) {
      alert(`Failed to log food: ${insertError.message}`);
      return;
    }

    closeModal();
    router.push("/app");
  }

  function getNutrientValue(food: UsdaFood, name: string): string {
    const nutrient = food.foodNutrients?.find((n) => n.nutrientName === name);
    if (!nutrient) return "—";
    return `${Math.round(nutrient.value)}${nutrient.unitName}`;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Search Foods</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Search and add to your daily log
      </p>

      <form onSubmit={handleSearch} className="mt-6">
        <div className="flex gap-2">
          <input
            type="text"
            className="h-12 flex-1 rounded-xl border border-[#B0C4DE] bg-white px-4 text-sm dark:border-gray-700 dark:bg-black"
            placeholder="Type a food (e.g., chicken)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-[#4169E1] px-6 text-sm font-medium text-white hover:bg-[#000080] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
            disabled={loading}
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      {results.length > 0 && (
        <div className="mt-6 space-y-2">
          {results.map((food) => (
            <div
              key={food.fdcId}
              className="flex items-center gap-3 rounded-xl border border-[#D3D8E0] bg-white p-4 transition-colors hover:bg-[#E0E0E0] dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              <button
                onClick={() => openModal(food)}
                className="flex-1 text-left"
              >
                <div className="font-medium">{food.description}</div>
                {food.brandOwner && (
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {food.brandOwner}
                  </div>
                )}
                <div className="mt-2 flex gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                  <span>{getNutrientValue(food, "Energy")}</span>
                  <span>{getNutrientValue(food, "Protein")} protein</span>
                  <span>{getNutrientValue(food, "Carbohydrate, by difference")} carbs</span>
                  <span>{getNutrientValue(food, "Total lipid (fat)")} fat</span>
                </div>
              </button>
              <button
                onClick={() => openModal(food)}
                className="shrink-0 rounded-full bg-[#4169E1] p-2 text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
                title="Add to log"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <div className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          No results found. Try a different search.
        </div>
      )}

      {/* Modal */}
      {selectedFood && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#B0C4DE] bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">{selectedFood.description}</h2>
            
            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Serving Size
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {SERVING_SIZES.map((size) => (
                  <button
                    key={size.grams}
                    onClick={() => {
                      setServingSize(size.grams);
                      setCustomServing("");
                    }}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      servingSize === size.grams && !customServing
                        ? "border-[#4169E1] bg-[#4169E1] text-white dark:border-[#87CEEB] dark:bg-[#87CEEB] dark:text-black"
                        : "border-[#D3D8E0] hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom (grams)"
                value={customServing}
                onChange={(e) => {
                  setCustomServing(e.target.value);
                  if (e.target.value) setServingSize(parseInt(e.target.value) || 100);
                }}
                className="mt-2 h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Meal Type
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {MEAL_TYPES.map((meal) => (
                  <button
                    key={meal}
                    onClick={() => setMealType(meal)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      mealType === meal
                        ? "border-[#4169E1] bg-[#4169E1] text-white dark:border-[#87CEEB] dark:bg-[#87CEEB] dark:text-black"
                        : "border-[#D3D8E0] hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={closeModal}
                className="flex-1 rounded-full border border-[#D3D8E0] px-4 py-2 text-sm font-medium hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFood}
                disabled={adding}
                className="flex-1 rounded-full bg-[#4169E1] px-4 py-2 text-sm font-medium text-white hover:bg-[#000080] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
              >
                {adding ? "Adding..." : "Add to Log"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
