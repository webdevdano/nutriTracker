"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Toast from "@/components/Toast";
import {
  useGetGroceryItemsQuery,
  useAddGroceryItemMutation,
  useUpdateGroceryItemMutation,
  useDeleteGroceryItemMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
  useAddFoodLogMutation,
  useGetFoodLogsQuery,
  type GroceryItem,
  type Favorite,
} from "@/store/api";

// Superfood nutrient mapping
const SUPERFOOD_NUTRIENTS: Record<string, string[]> = {
  "Spinach": ["Iron", "Calcium", "Vitamin A", "Vitamin K", "Vitamin C", "Folate", "Magnesium"],
  "Salmon": ["Protein", "Omega-3 Fatty Acids", "Vitamin D", "Vitamin B12", "Selenium", "Niacin"],
  "Blueberries": ["Vitamin C", "Vitamin K", "Fiber", "Manganese"],
  "Sweet Potato": ["Vitamin A", "Vitamin C", "Fiber", "Potassium", "Manganese", "Vitamin B6"],
  "Almonds": ["Vitamin E", "Magnesium", "Fiber", "Protein", "Calcium", "Zinc"],
  "Greek Yogurt": ["Protein", "Calcium", "Vitamin B12", "Probiotics", "Phosphorus", "Selenium"],
  "Quinoa": ["Protein", "Fiber", "Magnesium", "Iron", "Zinc", "Folate", "Manganese"],
  "Kale": ["Vitamin K", "Vitamin A", "Vitamin C", "Calcium", "Iron", "Folate"],
  "Eggs": ["Protein", "Vitamin B12", "Vitamin D", "Selenium", "Choline", "Riboflavin"],
  "Avocado": ["Healthy Fats", "Fiber", "Potassium", "Vitamin E", "Vitamin K", "Folate"],
  "Broccoli": ["Vitamin C", "Vitamin K", "Folate", "Fiber", "Potassium", "Iron"],
  "Chia Seeds": ["Omega-3 Fatty Acids", "Fiber", "Protein", "Calcium", "Magnesium", "Phosphorus"]
};

// Main protein sources and their nutrients
const MAIN_PROTEINS: Record<string, string[]> = {
  Chicken: ["Protein", "Vitamin B6", "Niacin", "Phosphorus", "Selenium"],
  Beef: ["Protein", "Iron", "Zinc", "Vitamin B12", "Phosphorus", "Niacin"],
  Pork: ["Protein", "Thiamin", "Niacin", "Vitamin B6", "Phosphorus", "Zinc"],
  Legumes: ["Protein", "Fiber", "Iron", "Folate", "Magnesium", "Potassium"],
  Tofu: ["Protein", "Calcium", "Iron", "Magnesium", "Phosphorus"],
  Fish: ["Protein", "Omega-3 Fatty Acids", "Vitamin D", "Selenium", "Vitamin B12"],
  Eggs: ["Protein", "Vitamin B12", "Vitamin D", "Selenium", "Choline", "Riboflavin"],
  "Greek Yogurt": ["Protein", "Calcium", "Vitamin B12", "Probiotics", "Phosphorus", "Selenium"],
  Lentils: ["Protein", "Fiber", "Iron", "Folate", "Magnesium", "Potassium"],
  Tempeh: ["Protein", "Calcium", "Iron", "Magnesium", "Phosphorus", "Manganese"],
};

// Merged at module scope so useMemo deps are stable
const ALL_FOOD_NUTRIENTS: Record<string, string[]> = { ...SUPERFOOD_NUTRIENTS, ...MAIN_PROTEINS };

type MealPlanMeal = {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
};

type DayNutrients = { calories: number; protein: number; fat: number; carbohydrates: number };

type MealPlan = {
  meals: MealPlanMeal[];
  nutrients: DayNutrients;
};

const WEEK_DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"] as const;
type WeekDay = typeof WEEK_DAYS[number];
type WeeklyMealPlan = { week: Record<WeekDay, { meals: MealPlanMeal[]; nutrients: DayNutrients }> };

function MealPlanCard({ meal }: { meal: MealPlanMeal }) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-sm font-semibold">{meal.title}</p>
      <div className="mt-1.5 flex gap-3 text-xs text-zinc-500">
        <span>⏱️ {meal.readyInMinutes} min</span>
        <span>🍽️ {meal.servings} servings</span>
      </div>
      {meal.sourceUrl && (
        <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-xs text-[#4169E1] hover:underline dark:text-[#87CEEB]">
          View Recipe →
        </a>
      )}
    </div>
  );
}

export default function GroceryPage() {
  const router = useRouter();
  const { status } = useSession();
  const isGuest = status === "unauthenticated";

  const [activeTab, setActiveTab]         = useState<"grocery" | "favorites">("grocery");
  const [newItem, setNewItem]              = useState("");
  const [showMealPlan, setShowMealPlan]    = useState(false);
  const [mealPlanFrame, setMealPlanFrame]  = useState<"day" | "week">("day");
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [mealPlan, setMealPlan]            = useState<MealPlan | null>(null);
  const [weeklyPlan, setWeeklyPlan]        = useState<WeeklyMealPlan | null>(null);
  const [activePlanDay, setActivePlanDay]  = useState<WeekDay>("monday");
  const [toast, setToast]                  = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // ── RTK Query ────────────────────────────────────────────────────────────
  const { data: items = [],     isLoading: loadingItems } = useGetGroceryItemsQuery(undefined, { skip: isGuest });
  const { data: favorites = [], isLoading: loadingFavs  } = useGetFavoritesQuery(undefined,     { skip: isGuest });
  const loading = loadingItems || loadingFavs;

  const today    = new Date().toISOString().split("T")[0];
  const sevenAgo = new Date(Date.now() - 6 * 86_400_000).toISOString().split("T")[0];
  const { data: recentLogs = [] } = useGetFoodLogsQuery(
    { start: sevenAgo, end: today },
    { skip: isGuest }
  );

  const [addItem,    { isLoading: addingItem }]  = useAddGroceryItemMutation();
  const [updateItem]                              = useUpdateGroceryItemMutation();
  const [deleteItem]                              = useDeleteGroceryItemMutation();
  const [deleteFav]                               = useDeleteFavoriteMutation();
  const [addFoodLog]                              = useAddFoodLogMutation();

  // ── Suggested from recent logs ──────────────────────────────────────────
  const suggestions = useMemo(() => {
    const inList = new Set(items.map((i) => i.food_name.toLowerCase()));
    const seen   = new Set<string>();
    const result: string[] = [];
    for (const log of recentLogs) {
      const name = log.food_name.replace(/\s*\(\d+g\)$/, "").trim();
      const key  = name.toLowerCase();
      if (!seen.has(key) && !inList.has(key)) {
        seen.add(key);
        result.push(name);
        if (result.length === 8) break;
      }
    }
    return result;
  }, [recentLogs, items]);

  // ── Nutrient Checklist ──────────────────────────────────────────────────
  const ALL_NUTRIENTS = useMemo(
    () => Array.from(new Set(Object.values(ALL_FOOD_NUTRIENTS).flat())).sort(),
    []
  );
  const nutrientChecklist = useMemo(
    () =>
      ALL_NUTRIENTS.map((nutrient) => {
        const foods: string[] = [];
        items.forEach((item) => {
          Object.entries(ALL_FOOD_NUTRIENTS).forEach(([knownFood, nutrients]) => {
            if (
              item.food_name.toLowerCase().includes(knownFood.toLowerCase()) &&
              nutrients.includes(nutrient) &&
              !foods.includes(item.food_name)
            ) {
              foods.push(item.food_name);
            }
          });
        });
        return { nutrient, foods };
      }),
    [ALL_NUTRIENTS, items]
  );

  // ── Handlers ─────────────────────────────────────────────────────────────
  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    const name = newItem.trim();
    if (!name) return;
    try {
      await addItem({ food_name: name }).unwrap();
      setNewItem("");
    } catch {
      setToast({ message: "Failed to add item", type: "error" });
    }
  }

  async function handleSuggestion(name: string) {
    try {
      await addItem({ food_name: name }).unwrap();
      setToast({ message: `${name} added`, type: "success" });
    } catch {
      setToast({ message: "Failed to add item", type: "error" });
    }
  }

  async function togglePurchased(item: GroceryItem) {
    try {
      await updateItem({ id: item.id, purchased: !item.purchased }).unwrap();
    } catch {
      setToast({ message: "Failed to update item", type: "error" });
    }
  }

  async function handleDeleteItem(id: string) {
    try {
      await deleteItem(id).unwrap();
    } catch {
      setToast({ message: "Failed to remove item", type: "error" });
    }
  }

  async function clearPurchased() {
    const purchased = items.filter((i) => i.purchased);
    await Promise.all(purchased.map((i) => deleteItem(i.id)));
  }

  async function generateMealPlan(frame: "day" | "week" = "day") {
    setMealPlanFrame(frame);
    setGeneratingPlan(true);
    try {
      const res  = await fetch(`/api/meal-plan?timeFrame=${frame}&targetCalories=2000`);
      const data = await res.json();
      if (res.ok) {
        if (frame === "week") {
          setWeeklyPlan(data as WeeklyMealPlan);
          setMealPlan(null);
          setActivePlanDay("monday");
        } else {
          setMealPlan(data as MealPlan);
          setWeeklyPlan(null);
        }
        setShowMealPlan(true);
      }
    } catch { /* silent */ }
    finally { setGeneratingPlan(false); }
  }

  async function handleDeleteFav(id: string) {
    try {
      await deleteFav(id).unwrap();
    } catch {
      setToast({ message: "Failed to remove favourite", type: "error" });
    }
  }

  async function addFavToLog(fav: Favorite) {
    try {
      await addFoodLog({
        fdc_id:     fav.fdc_id,
        food_name:  fav.food_name,
        calories:   fav.calories ?? 0,
        protein:    fav.protein  ?? 0,
        carbs:      fav.carbs    ?? 0,
        fat:        fav.fat      ?? 0,
        quantity:   (fav.serving_size ?? 100) / 100,
        meal_type:  "SNACK",
        date:       today,
        time:       new Date().toISOString(),
      }).unwrap();
      setToast({ message: `${fav.food_name} added to today's log`, type: "success" });
      setTimeout(() => router.push("/app"), 1500);
    } catch {
      setToast({ message: "Failed to log food", type: "error" });
    }
  }

  async function addFavToGrocery(fav: Favorite) {
    try {
      await addItem({ food_name: fav.food_name }).unwrap();
      setActiveTab("grocery");
      setToast({ message: `${fav.food_name} added to grocery list`, type: "success" });
    } catch {
      setToast({ message: "Failed to add to grocery list", type: "error" });
    }
  }

  const unpurchased = items.filter((i) => !i.purchased);
  const purchased   = items.filter((i) =>  i.purchased);

  // ── Guest guard ──────────────────────────────────────────────────────────
  if (isGuest) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Lists</h1>
        <div className="mt-6 rounded-2xl border border-[#4169E1]/30 bg-[#4169E1]/5 p-8 text-center dark:bg-blue-950/30">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Sign in to manage your grocery list and favourites.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/signup" className="rounded-full bg-[#4169E1] px-5 py-2 text-sm font-medium text-white hover:bg-[#000080]">Get started</Link>
            <Link href="/login" className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">Sign in</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">

        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 md:sticky md:top-28 mb-8 md:mb-0 space-y-6">
          {/* Nutrient Checklist */}
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-zinc-800/80 dark:bg-zinc-900">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">🌟 Nutrient Checklist</h3>
            <div className="flex flex-col gap-2">
              {nutrientChecklist.map(({ nutrient, foods }) => (
                <div key={nutrient} className="flex items-start gap-2">
                  {foods.length > 0 ? (
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />
                  )}
                  <span className={`text-xs leading-snug ${foods.length > 0 ? "font-medium" : "text-zinc-400 dark:text-zinc-600"}`}>
                    {nutrient}
                    {foods.length > 0 && (
                      <span className="ml-1 font-normal text-zinc-400 dark:text-zinc-500">({foods.join(", ")})</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Proteins */}
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-zinc-800/80 dark:bg-zinc-900">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">🍗 Protein Sources</h3>
            <div className="flex flex-col gap-3">
              {Object.entries(MAIN_PROTEINS).map(([protein, nutrients]) => (
                <div key={protein}>
                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{protein}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {nutrients.map((n) => (
                      <span key={n} className="rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Lists</h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Grocery list &amp; saved favourites</p>
            </div>
            {activeTab === "grocery" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateMealPlan("day")}
                  disabled={generatingPlan}
                  className="h-9 rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {generatingPlan && mealPlanFrame === "day" ? "…" : "📅 Day"}
                </button>
                <button
                  onClick={() => generateMealPlan("week")}
                  disabled={generatingPlan}
                  className="h-9 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
                >
                  {generatingPlan && mealPlanFrame === "week" ? "Generating…" : "🗓️ Week Plan"}
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-1 rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
            {(["grocery", "favorites"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {tab === "grocery" ? "🛒 Grocery" : "⭐ Favourites"}
              </button>
            ))}
          </div>

          {/* ── Grocery tab ────────────────────────────────────────────────── */}
          {activeTab === "grocery" && (
            <>
              {/* Add item form */}
              <form onSubmit={handleAddItem} className="mb-5 flex gap-2">
                <input
                  type="text"
                  className="h-10 flex-1 rounded-xl border border-zinc-200 bg-transparent px-4 text-sm focus:border-[#4169E1] focus:outline-none dark:border-zinc-700 dark:focus:border-[#87CEEB]"
                  placeholder="Add item to grocery list…"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={addingItem || !newItem.trim()}
                  className="h-10 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
                >
                  Add
                </button>
              </form>

              {/* Suggested from recent logs */}
              {suggestions.length > 0 && (
                <div className="mb-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    From your recent logs
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((name) => (
                      <button
                        key={name}
                        onClick={() => handleSuggestion(name)}
                        className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-[#4169E1]/40 hover:bg-[#4169E1]/5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[#87CEEB]/40 dark:hover:bg-[#87CEEB]/5"
                      >
                        <span>+</span>
                        <span className="max-w-[160px] truncate">{name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {loading ? (
                <div className="mt-8 text-center text-sm text-zinc-500">Loading…</div>
              ) : items.length === 0 ? (
                <div className="rounded-2xl border border-zinc-200/70 bg-white p-8 text-center dark:border-zinc-800/80 dark:bg-zinc-900">
                  <p className="text-sm text-zinc-500">Your grocery list is empty. Add items above or from the Search page.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* To Buy */}
                  {unpurchased.length > 0 && (
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        To Buy ({unpurchased.length})
                      </p>
                      <div className="space-y-2">
                        {unpurchased.map((item) => (
                          <GroceryRow key={item.id} item={item} onToggle={togglePurchased} onDelete={handleDeleteItem} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Purchased */}
                  {purchased.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          Purchased ({purchased.length})
                        </p>
                        <button
                          onClick={clearPurchased}
                          className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="space-y-2 opacity-60">
                        {purchased.map((item) => (
                          <GroceryRow key={item.id} item={item} onToggle={togglePurchased} onDelete={handleDeleteItem} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ── Favourites tab ─────────────────────────────────────────────── */}
          {activeTab === "favorites" && (
            <>
              {loading ? (
                <div className="mt-8 text-center text-sm text-zinc-500">Loading…</div>
              ) : favorites.length === 0 ? (
                <div className="rounded-2xl border border-zinc-200/70 bg-white p-8 text-center dark:border-zinc-800/80 dark:bg-zinc-900">
                  <p className="text-sm text-zinc-500">No saved favourites yet. Star foods from the Search page.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((fav) => (
                    <div key={fav.id} className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-zinc-800/80 dark:bg-zinc-900">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">{fav.food_name}</p>
                          <div className="mt-1 flex gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                            <span>{Math.round(fav.calories || 0)} kcal</span>
                            <span>P {Math.round(fav.protein || 0)}g</span>
                            <span>C {Math.round(fav.carbs || 0)}g</span>
                            <span>F {Math.round(fav.fat || 0)}g</span>
                          </div>
                          <p className="mt-0.5 text-xs text-zinc-400">Per {fav.serving_size ?? 100}g serving</p>
                        </div>
                        <button onClick={() => handleDeleteFav(fav.id)} className="shrink-0 text-xs text-red-500 hover:text-red-700 dark:text-red-400">
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => addFavToGrocery(fav)}
                          className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
                        >
                          + Grocery
                        </button>
                        <button
                          onClick={() => addFavToLog(fav)}
                          className="rounded-full bg-[#4169E1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-zinc-900"
                        >
                          Log Today
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Meal Plan Modal */}
      {showMealPlan && (mealPlan || weeklyPlan) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowMealPlan(false)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{weeklyPlan ? "Weekly Meal Plan" : "Daily Meal Plan"}</h2>
              <button onClick={() => setShowMealPlan(false)} className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">✕</button>
            </div>

            {/* ── Daily view ── */}
            {mealPlan && (
              <>
                <div className="mb-4 grid grid-cols-4 gap-3 rounded-xl border border-zinc-200 p-4 text-center dark:border-zinc-800">
                  {[
                    { label: "Calories", value: Math.round(mealPlan.nutrients.calories) },
                    { label: "Protein",  value: `${Math.round(mealPlan.nutrients.protein)}g` },
                    { label: "Carbs",    value: `${Math.round(mealPlan.nutrients.carbohydrates)}g` },
                    { label: "Fat",      value: `${Math.round(mealPlan.nutrients.fat)}g` },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-zinc-500">{label}</p>
                      <p className="text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {mealPlan.meals.map((meal) => (
                    <MealPlanCard key={meal.id} meal={meal} />
                  ))}
                </div>
              </>
            )}

            {/* ── Weekly calendar view ── */}
            {weeklyPlan && (
              <>
                {/* Day-of-week pill nav */}
                <div className="mb-4 flex gap-1 overflow-x-auto rounded-full border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900">
                  {WEEK_DAYS.map((day) => (
                    <button
                      key={day}
                      onClick={() => setActivePlanDay(day)}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                        activePlanDay === day
                          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      }`}
                    >
                      {day.slice(0, 3).charAt(0).toUpperCase() + day.slice(0, 3).slice(1)}
                    </button>
                  ))}
                </div>

                {/* Active day nutrients */}
                {weeklyPlan.week[activePlanDay] && (
                  <>
                    <div className="mb-4 grid grid-cols-4 gap-3 rounded-xl border border-zinc-200 p-4 text-center dark:border-zinc-800">
                      {[
                        { label: "Calories", value: Math.round(weeklyPlan.week[activePlanDay].nutrients.calories) },
                        { label: "Protein",  value: `${Math.round(weeklyPlan.week[activePlanDay].nutrients.protein)}g` },
                        { label: "Carbs",    value: `${Math.round(weeklyPlan.week[activePlanDay].nutrients.carbohydrates)}g` },
                        { label: "Fat",      value: `${Math.round(weeklyPlan.week[activePlanDay].nutrients.fat)}g` },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-xs text-zinc-500">{label}</p>
                          <p className="text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {weeklyPlan.week[activePlanDay].meals.map((meal) => (
                        <MealPlanCard key={meal.id} meal={meal} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onCloseAction={() => setToast(null)} />}
    </div>
  );
}

// ─── GroceryRow ───────────────────────────────────────────────────────────────

function GroceryRow({
  item,
  onToggle,
  onDelete,
}: {
  item: GroceryItem;
  onToggle: (item: GroceryItem) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200/70 bg-white px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900">
      <input
        type="checkbox"
        checked={item.purchased}
        onChange={() => onToggle(item)}
        className="h-4 w-4 cursor-pointer rounded accent-[#4169E1]"
      />
      <div className="flex-1 min-w-0">
        <p className={`truncate text-sm font-medium ${item.purchased ? "line-through text-zinc-400" : ""}`}>{item.food_name}</p>
        {(item.quantity !== 1 || item.unit) && (
          <p className="text-xs text-zinc-400">{item.quantity} {item.unit ?? "serving"}</p>
        )}
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="shrink-0 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800 dark:hover:text-red-400"
        aria-label="Remove"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
