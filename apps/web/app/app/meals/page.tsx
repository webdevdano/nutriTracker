"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  useGetFoodLogsQuery,
  useAddFoodLogMutation,
  useGetUserRecipesQuery,
  useCreateUserRecipeMutation,
  useUpdateUserRecipeMutation,
  useDeleteUserRecipeMutation,
  useGetSavedRecipesQuery,
  useSaveRecipeMutation,
  useUnsaveRecipeMutation,
  type FoodLog,
  type UserRecipe,
  type SavedRecipe,
} from "@/store/api";
import Toast from "@/components/Toast";

// ─── Recipe types ──────────────────────────────────────────────────────────────

type Recipe = {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  summary: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
};

type RecipeDetail = {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  extendedIngredients: { id: number; original: string; name: string; amount: number; unit: string }[];
  nutrition: {
    nutrients: { name: string; amount: number; unit: string; percentOfDailyNeeds: number }[];
  };
};

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

  const [activeTab, setActiveTab]         = useState<"history" | "recipes">("history");
  const [recipes, setRecipes]             = useState<Recipe[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [recipesError, setRecipesError]   = useState<string | null>(null);
  const [recipesLoaded, setRecipesLoaded] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [recipeSubTab, setRecipeSubTab]   = useState<"discover" | "my-recipes" | "saved">("discover");
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<UserRecipe | null>(null);
  const [toast, setToast]                 = useState<{ message: string; type: "success" | "error" } | null>(null);

  const today    = new Date().toISOString().split("T")[0];
  const sevenAgo = new Date(Date.now() - 6 * 86_400_000).toISOString().split("T")[0];

  const { data: logs = [], isLoading } = useGetFoodLogsQuery(
    { start: sevenAgo, end: today },
    { skip: isGuest }
  );
  const [addFoodLog] = useAddFoodLogMutation();

  const { data: userRecipes = [], isLoading: userRecipesLoading } = useGetUserRecipesQuery(undefined, { skip: isGuest });
  const { data: savedRecipes = [] } = useGetSavedRecipesQuery(undefined, { skip: isGuest });
  const [createUserRecipe] = useCreateUserRecipeMutation();
  const [updateUserRecipe] = useUpdateUserRecipeMutation();
  const [deleteUserRecipe] = useDeleteUserRecipeMutation();
  const [saveRecipe] = useSaveRecipeMutation();
  const [unsaveRecipe] = useUnsaveRecipeMutation();

  const savedIds = useMemo(() => new Set(savedRecipes.map((s) => s.spoonacular_id)), [savedRecipes]);

  // Load recipes lazily on first Recipes tab visit
  useEffect(() => {
    if (activeTab !== "recipes" || recipesLoaded || isGuest) return;
    setRecipesLoading(true);
    fetch("/api/recipes")
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? "Failed to load recipes");
        setRecipes(data.recipes ?? []);
        setRecipesLoaded(true);
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : "Failed to load recipes";
        setRecipesError(msg);
      })
      .finally(() => setRecipesLoading(false));
  }, [activeTab, recipesLoaded, isGuest]);

  async function openRecipe(id: number) {
    setDetailLoading(true);
    try {
      const res  = await fetch(`/api/recipes/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSelectedRecipe(data);
    } catch {
      setToast({ message: "Failed to load recipe details", type: "error" });
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleLogRecipe(recipe: RecipeDetail) {
    const nutrients = recipe.nutrition?.nutrients ?? [];
    const get = (name: string) => nutrients.find((n) => n.name === name)?.amount ?? 0;
    try {
      await addFoodLog({
        fdc_id:    recipe.id,
        food_name: `${recipe.title} (1 serving)`,
        calories:  get("Calories"),
        protein:   get("Protein"),
        carbs:     get("Carbohydrates"),
        fat:       get("Fat"),
        fiber:     get("Fiber"),
        sodium:    get("Sodium"),
        quantity:  1,
        meal_type: new Date().getHours() < 11 ? "BREAKFAST" : new Date().getHours() < 15 ? "LUNCH" : new Date().getHours() < 20 ? "DINNER" : "SNACK",
        date:      today,
        time:      new Date().toISOString(),
      }).unwrap();
      setToast({ message: `${recipe.title} logged!`, type: "success" });
      setSelectedRecipe(null);
    } catch {
      setToast({ message: "Failed to log meal", type: "error" });
    }
  }

  async function handleSaveRecipe(recipe: Recipe) {
    try {
      await saveRecipe({
        spoonacular_id: recipe.id, title: recipe.title, image: recipe.image,
        servings: recipe.servings, ready_in_minutes: recipe.readyInMinutes,
        calories: recipe.calories, protein: recipe.protein, carbs: recipe.carbs, fat: recipe.fat,
      }).unwrap();
      setToast({ message: "Saved to your recipes!", type: "success" });
    } catch {
      setToast({ message: "Failed to save recipe", type: "error" });
    }
  }

  async function handleUnsaveRecipe(spoonacularId: number) {
    try {
      await unsaveRecipe(spoonacularId).unwrap();
      setToast({ message: "Removed from saved", type: "success" });
    } catch {
      setToast({ message: "Failed to remove", type: "error" });
    }
  }

  async function handleLogUserRecipe(recipe: UserRecipe) {
    const mealType = new Date().getHours() < 11 ? "BREAKFAST" : new Date().getHours() < 15 ? "LUNCH" : new Date().getHours() < 20 ? "DINNER" : "SNACK";
    try {
      await addFoodLog({
        fdc_id: 0, food_name: `${recipe.title} (1 serving)`,
        calories: recipe.calories ?? 0, protein: recipe.protein ?? 0,
        carbs: recipe.carbs ?? 0, fat: recipe.fat ?? 0,
        fiber: recipe.fiber ?? undefined, sodium: recipe.sodium ?? undefined,
        quantity: 1, meal_type: mealType, date: today, time: new Date().toISOString(),
      }).unwrap();
      setToast({ message: `${recipe.title} logged!`, type: "success" });
    } catch {
      setToast({ message: "Failed to log meal", type: "error" });
    }
  }

  async function handleLogSavedRecipe(recipe: SavedRecipe) {
    const mealType = new Date().getHours() < 11 ? "BREAKFAST" : new Date().getHours() < 15 ? "LUNCH" : new Date().getHours() < 20 ? "DINNER" : "SNACK";
    try {
      await addFoodLog({
        fdc_id: recipe.spoonacular_id, food_name: `${recipe.title} (1 serving)`,
        calories: recipe.calories ?? 0, protein: recipe.protein ?? 0,
        carbs: recipe.carbs ?? 0,     fat: recipe.fat ?? 0,
        quantity: 1, meal_type: mealType, date: today, time: new Date().toISOString(),
      }).unwrap();
      setToast({ message: `${recipe.title} logged!`, type: "success" });
    } catch {
      setToast({ message: "Failed to log meal", type: "error" });
    }
  }

  async function handleDeleteUserRecipe(id: string) {
    try {
      await deleteUserRecipe(id).unwrap();
      setToast({ message: "Recipe deleted", type: "success" });
    } catch {
      setToast({ message: "Failed to delete recipe", type: "error" });
    }
  }

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
        <h1 className="text-2xl font-semibold tracking-tight">Meals</h1>
        <div className="mt-6 rounded-2xl border border-[#4169E1]/30 bg-[#4169E1]/5 p-8 text-center dark:bg-blue-950/30">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Sign in to see your meal history and recipe suggestions.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/signup" className="rounded-full bg-[#4169E1] px-5 py-2 text-sm font-medium text-white hover:bg-[#000080]">Get started</Link>
            <Link href="/login" className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">Sign in</Link>
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
          <h1 className="text-2xl font-semibold tracking-tight">Meals</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {activeTab === "history" ? "Last 7 days" : "Healthy recipe ideas"}
          </p>
        </div>
        {activeTab === "history" && (
          <Link
            href="/app/search"
            className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
          >
            + Add Food
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-1 rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {(["history", "recipes"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {tab === "history" ? "📋 History" : "🍽️ Recipes"}
          </button>
        ))}
      </div>

      {/* ── History tab ───────────────────────────────────────────────────── */}
      {activeTab === "history" && (
        <>
          {isLoading && (
            <div className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">Loading…</div>
          )}
          {!isLoading && days.length === 0 && (
            <div className="mt-8 rounded-2xl border border-zinc-200/70 bg-white p-10 text-center dark:border-zinc-800/80 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">No meals logged in the last 7 days.</p>
              <Link href="/app/search" className="mt-4 inline-flex rounded-full bg-[#4169E1] px-5 py-2 text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black">
                Log your first meal
              </Link>
            </div>
          )}
          <div className="mt-6 space-y-6">
            {days.map((day) => <DayCard key={day.date} day={day} />)}
          </div>
        </>
      )}

      {/* ── Recipes tab ───────────────────────────────────────────────────── */}
      {activeTab === "recipes" && (
        <div className="mt-6">
          {/* Sub-tab strip */}
          <div className="mb-5 flex gap-1 rounded-full border border-zinc-200 bg-zinc-100/60 p-1 dark:border-zinc-800 dark:bg-zinc-900">
            {(["discover", "my-recipes", "saved"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setRecipeSubTab(t)}
                className={`flex-1 rounded-full py-1.5 text-xs font-medium transition-colors ${
                  recipeSubTab === t
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {t === "discover" ? "🔍 Discover" : t === "my-recipes" ? "📖 My Recipes" : "🔖 Saved"}
              </button>
            ))}
          </div>

          {/* ── Discover ─────────────────────────────────────── */}
          {recipeSubTab === "discover" && (
            <>
              {recipesLoading && <p className="text-center text-sm text-zinc-500">Loading recipes…</p>}
              {recipesError && (
                <div className="rounded-2xl border border-red-200/70 bg-red-50 p-6 text-center dark:border-red-800/70 dark:bg-red-950/30">
                  <p className="text-sm text-red-600 dark:text-red-400">{recipesError}</p>
                  <button
                    onClick={() => { setRecipesError(null); setRecipesLoaded(false); }}
                    className="mt-3 rounded-full border border-red-300 px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400"
                  >
                    Retry
                  </button>
                </div>
              )}
              {!recipesLoading && !recipesError && recipes.length === 0 && recipesLoaded && (
                <p className="mt-4 text-center text-sm text-zinc-500">No recipes found — try refreshing.</p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onOpen={openRecipe}
                    loading={detailLoading}
                    isSaved={savedIds.has(recipe.id)}
                    onSave={handleSaveRecipe}
                    onUnsave={handleUnsaveRecipe}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── My Recipes ───────────────────────────────────── */}
          {recipeSubTab === "my-recipes" && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {userRecipes.length} recipe{userRecipes.length !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={() => { setEditingRecipe(null); setShowRecipeForm(true); }}
                  className="rounded-full bg-[#4169E1] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
                >
                  + New Recipe
                </button>
              </div>
              {userRecipesLoading && <p className="text-center text-sm text-zinc-500">Loading…</p>}
              {!userRecipesLoading && userRecipes.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
                  <p className="text-sm text-zinc-500">No recipes yet. Create your first one!</p>
                  <button
                    onClick={() => { setEditingRecipe(null); setShowRecipeForm(true); }}
                    className="mt-4 rounded-full bg-[#4169E1] px-5 py-2 text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
                  >
                    Create Recipe
                  </button>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {userRecipes.map((r) => (
                  <UserRecipeCard
                    key={r.id}
                    recipe={r}
                    onLog={handleLogUserRecipe}
                    onEdit={(recipe) => { setEditingRecipe(recipe); setShowRecipeForm(true); }}
                    onDelete={handleDeleteUserRecipe}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── Saved ────────────────────────────────────────── */}
          {recipeSubTab === "saved" && (
            <>
              {savedRecipes.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
                  <p className="text-sm text-zinc-500">No saved recipes yet.</p>
                  <button
                    onClick={() => setRecipeSubTab("discover")}
                    className="mt-4 text-sm font-medium text-[#4169E1] hover:underline dark:text-[#87CEEB]"
                  >
                    Browse Discover →
                  </button>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {savedRecipes.map((r) => (
                  <SavedRecipeCard
                    key={r.id}
                    recipe={r}
                    onLog={handleLogSavedRecipe}
                    onUnsave={handleUnsaveRecipe}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Recipe detail sheet ───────────────────────────────────────────── */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onLog={handleLogRecipe}
          isSaved={savedIds.has(selectedRecipe.id)}
          onSave={() => handleSaveRecipe({
            id: selectedRecipe.id, title: selectedRecipe.title, image: selectedRecipe.image,
            servings: selectedRecipe.servings, readyInMinutes: selectedRecipe.readyInMinutes,
            summary: selectedRecipe.summary, ingredients: [],
            calories: selectedRecipe.nutrition?.nutrients?.find(n=>n.name==="Calories")?.amount ?? 0,
            protein:  selectedRecipe.nutrition?.nutrients?.find(n=>n.name==="Protein")?.amount ?? 0,
            carbs:    selectedRecipe.nutrition?.nutrients?.find(n=>n.name==="Carbohydrates")?.amount ?? 0,
            fat:      selectedRecipe.nutrition?.nutrients?.find(n=>n.name==="Fat")?.amount ?? 0,
          } as Recipe)}
          onUnsave={() => handleUnsaveRecipe(selectedRecipe.id)}
        />
      )}

      {/* ── Create / Edit recipe modal ────────────────────────────────────── */}
      {showRecipeForm && (
        <RecipeFormModal
          initial={editingRecipe}
          onCreate={async (data) => {
            try {
              await createUserRecipe(data as Parameters<typeof createUserRecipe>[0]).unwrap();
              setToast({ message: "Recipe created!", type: "success" });
              setShowRecipeForm(false);
            } catch { setToast({ message: "Failed to save recipe", type: "error" }); }
          }}
          onUpdate={async (data) => {
            if (!editingRecipe) return;
            try {
              await updateUserRecipe({ id: editingRecipe.id, ...data } as Parameters<typeof updateUserRecipe>[0]).unwrap();
              setToast({ message: "Recipe updated!", type: "success" });
              setShowRecipeForm(false);
            } catch { setToast({ message: "Failed to update recipe", type: "error" }); }
          }}
          onClose={() => setShowRecipeForm(false)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onCloseAction={() => setToast(null)} />}
    </div>
  );
}

// ─── RecipeCard ───────────────────────────────────────────────────────────────

function RecipeCard({
  recipe,
  onOpen,
  loading,
  isSaved = false,
  onSave,
  onUnsave,
}: {
  recipe: Recipe;
  onOpen: (id: number) => void;
  loading: boolean;
  isSaved?: boolean;
  onSave?: (recipe: Recipe) => void;
  onUnsave?: (id: number) => void;
}) {
  function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, "");
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white dark:border-zinc-800/80 dark:bg-zinc-900">
      {/* Save heart */}
      <button
        onClick={(e) => { e.stopPropagation(); if (isSaved) { onUnsave?.(recipe.id); } else { onSave?.(recipe); } }}
        aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-lg shadow backdrop-blur-sm transition hover:scale-110 dark:bg-zinc-900/80"
      >
        {isSaved ? "♥️" : "🤍"}
      </button>
      <button
        onClick={() => !loading && onOpen(recipe.id)}
        disabled={loading}
        className="w-full cursor-pointer text-left disabled:opacity-60"
      >
        {recipe.image && (
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              unoptimized
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-sm font-semibold leading-snug">{recipe.title}</p>
          {recipe.summary && (
            <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
              {stripHtml(recipe.summary)}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span>⏱️ {recipe.readyInMinutes} min</span>
            <span>🍽️ {recipe.servings} serv</span>
          </div>
          <div className="mt-2 flex gap-3 text-xs font-medium">
            <span className="text-zinc-700 dark:text-zinc-300">{Math.round(recipe.calories)} kcal</span>
            <span className="text-zinc-500">P {Math.round(recipe.protein)}g</span>
            <span className="text-zinc-500">C {Math.round(recipe.carbs)}g</span>
            <span className="text-zinc-500">F {Math.round(recipe.fat)}g</span>
          </div>
        </div>
      </button>
    </div>
  );
}

// ─── RecipeDetailModal ────────────────────────────────────────────────────────

function RecipeDetailModal({
  recipe,
  onClose,
  onLog,
  isSaved = false,
  onSave,
  onUnsave,
}: {
  recipe: RecipeDetail;
  onClose: () => void;
  onLog: (recipe: RecipeDetail) => void;
  isSaved?: boolean;
  onSave?: () => void;
  onUnsave?: () => void;
}) {
  const nutrients = recipe.nutrition?.nutrients ?? [];
  const get = (name: string) => nutrients.find((n) => n.name === name)?.amount ?? 0;

  const mainNutrients = [
    { label: "Calories",  value: Math.round(get("Calories")),          unit: "kcal" },
    { label: "Protein",   value: Math.round(get("Protein") * 10) / 10, unit: "g" },
    { label: "Carbs",     value: Math.round(get("Carbohydrates") * 10) / 10, unit: "g" },
    { label: "Fat",       value: Math.round(get("Fat") * 10) / 10,     unit: "g" },
    { label: "Fiber",     value: Math.round(get("Fiber") * 10) / 10,   unit: "g" },
    { label: "Sugar",     value: Math.round(get("Sugar") * 10) / 10,   unit: "g" },
    { label: "Sodium",    value: Math.round(get("Sodium")),             unit: "mg" },
    { label: "Sat. Fat",  value: Math.round(get("Saturated Fat") * 10) / 10, unit: "g" },
  ];

  const tags = [...(recipe.cuisines ?? []), ...(recipe.diets ?? []), ...(recipe.dishTypes ?? [])];

  function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, "");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        {recipe.image && (
          <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
            <Image src={recipe.image} alt={recipe.title} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              ✕
            </button>
            {/* Save button */}
            <button
              onClick={() => isSaved ? onUnsave?.() : onSave?.()}
              aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
              className="absolute right-14 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-lg hover:bg-black/60"
            >
              {isSaved ? "♥️" : "🤍"}
            </button>
            <div className="absolute bottom-0 left-0 p-4">
              <h2 className="text-lg font-bold text-white leading-snug">{recipe.title}</h2>
              <div className="mt-1 flex gap-3 text-xs text-white/80">
                <span>⏱️ {recipe.readyInMinutes} min</span>
                <span>🍽️ {recipe.servings} servings</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-5">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {tags.slice(0, 6).map((tag) => (
                <span key={tag} className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs capitalize text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Nutrition grid */}
          <div className="mb-5 grid grid-cols-4 gap-2 rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-800">
            {mainNutrients.map(({ label, value, unit }) => (
              <div key={label} className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
                <p className="text-sm font-semibold">{value}<span className="ml-0.5 text-xs font-normal text-zinc-400">{unit}</span></p>
              </div>
            ))}
          </div>

          {/* Description */}
          {recipe.summary && (
            <div className="mb-5">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">About</p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-4">
                {stripHtml(recipe.summary)}
              </p>
            </div>
          )}

          {/* Ingredients */}
          {recipe.extendedIngredients?.length > 0 && (
            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Ingredients ({recipe.extendedIngredients.length})
              </p>
              <ul className="space-y-1.5">
                {recipe.extendedIngredients.map((ing) => (
                  <li key={ing.id} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4169E1] dark:bg-[#87CEEB]" />
                    {ing.original}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA row */}
          <div className="flex gap-2">
            <button
              onClick={() => onLog(recipe)}
              className="flex-1 rounded-full bg-[#4169E1] py-2.5 text-sm font-semibold text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
            >
              Log this meal
            </button>
            {recipe.sourceUrl && (
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Recipe →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── UserRecipeCard ───────────────────────────────────────────────────────────

function UserRecipeCard({
  recipe,
  onLog,
  onEdit,
  onDelete,
}: {
  recipe: UserRecipe;
  onLog: (r: UserRecipe) => void;
  onEdit: (r: UserRecipe) => void;
  onDelete: (id: string) => void;
}) {
  const totalTime = (recipe.prep_time ?? 0) + (recipe.cook_time ?? 0);
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white dark:border-zinc-800/80 dark:bg-zinc-900">
      {recipe.image_url && (
        <div className="relative h-36 w-full overflow-hidden">
          <Image src={recipe.image_url} alt={recipe.title} fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="p-4">
        <p className="text-sm font-semibold leading-snug">{recipe.title}</p>
        {recipe.description && (
          <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">{recipe.description}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          {totalTime > 0 && <span>⏱️ {totalTime} min</span>}
          <span>🍽️ {recipe.servings} serving{recipe.servings !== 1 ? "s" : ""}</span>
          {recipe.ingredients.length > 0 && <span>🧄 {recipe.ingredients.length} ingredients</span>}
        </div>
        {(recipe.calories != null) && (
          <div className="mt-2 flex gap-3 text-xs font-medium">
            <span className="text-zinc-700 dark:text-zinc-300">{Math.round(recipe.calories ?? 0)} kcal</span>
            {recipe.protein  != null && <span className="text-zinc-500">P {Math.round(recipe.protein)}g</span>}
            {recipe.carbs    != null && <span className="text-zinc-500">C {Math.round(recipe.carbs)}g</span>}
            {recipe.fat      != null && <span className="text-zinc-500">F {Math.round(recipe.fat)}g</span>}
          </div>
        )}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onLog(recipe)}
            className="flex-1 rounded-full bg-[#4169E1] py-1.5 text-xs font-semibold text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
          >
            Log meal
          </button>
          <button
            onClick={() => onEdit(recipe)}
            className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SavedRecipeCard ──────────────────────────────────────────────────────────

function SavedRecipeCard({
  recipe,
  onLog,
  onUnsave,
}: {
  recipe: SavedRecipe;
  onLog: (r: SavedRecipe) => void;
  onUnsave: (id: number) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white dark:border-zinc-800/80 dark:bg-zinc-900">
      {recipe.image && (
        <div className="relative h-36 w-full overflow-hidden">
          <Image src={recipe.image} alt={recipe.title} fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="p-4">
        <p className="text-sm font-semibold leading-snug">{recipe.title}</p>
        <div className="mt-2 flex gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          {recipe.ready_in_minutes && <span>⏱️ {recipe.ready_in_minutes} min</span>}
          {recipe.servings && <span>🍽️ {recipe.servings} serv</span>}
        </div>
        {recipe.calories != null && (
          <div className="mt-2 flex gap-3 text-xs font-medium">
            <span className="text-zinc-700 dark:text-zinc-300">{Math.round(recipe.calories ?? 0)} kcal</span>
            {recipe.protein != null && <span className="text-zinc-500">P {Math.round(recipe.protein)}g</span>}
            {recipe.carbs   != null && <span className="text-zinc-500">C {Math.round(recipe.carbs)}g</span>}
            {recipe.fat     != null && <span className="text-zinc-500">F {Math.round(recipe.fat)}g</span>}
          </div>
        )}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onLog(recipe)}
            className="flex-1 rounded-full bg-[#4169E1] py-1.5 text-xs font-semibold text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
          >
            Log meal
          </button>
          <button
            onClick={() => onUnsave(recipe.spoonacular_id)}
            className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── RecipeFormModal ──────────────────────────────────────────────────────────

type RecipeFormData = {
  title: string; description: string; servings: number;
  prep_time: number; cook_time: number;
  calories: string; protein: string; carbs: string; fat: string; fiber: string; sodium: string;
  ingredients: string; instructions: string;
};

function RecipeFormModal({
  initial,
  onCreate,
  onUpdate,
  onClose,
}: {
  initial: UserRecipe | null;
  onCreate: (data: Partial<UserRecipe>) => void;
  onUpdate: (data: Partial<UserRecipe>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<RecipeFormData>({
    title:        initial?.title        ?? "",
    description:  initial?.description  ?? "",
    servings:     initial?.servings     ?? 1,
    prep_time:    initial?.prep_time    ?? 0,
    cook_time:    initial?.cook_time    ?? 0,
    calories:     initial?.calories != null ? String(initial.calories) : "",
    protein:      initial?.protein  != null ? String(initial.protein)  : "",
    carbs:        initial?.carbs    != null ? String(initial.carbs)    : "",
    fat:          initial?.fat      != null ? String(initial.fat)      : "",
    fiber:        initial?.fiber    != null ? String(initial.fiber)    : "",
    sodium:       initial?.sodium   != null ? String(initial.sodium)   : "",
    ingredients:  initial?.ingredients?.join("\n") ?? "",
    instructions: initial?.instructions ?? "",
  });

  function set<K extends keyof RecipeFormData>(key: K, val: RecipeFormData[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleSubmit() {
    if (!form.title.trim()) return;
    const payload: Partial<UserRecipe> = {
      title:        form.title.trim(),
      description:  form.description || null,
      servings:     form.servings,
      prep_time:    form.prep_time || null,
      cook_time:    form.cook_time || null,
      ingredients:  form.ingredients.split("\n").map((s) => s.trim()).filter(Boolean),
      instructions: form.instructions || null,
      calories: form.calories ? Number(form.calories) : null,
      protein:  form.protein  ? Number(form.protein)  : null,
      carbs:    form.carbs    ? Number(form.carbs)    : null,
      fat:      form.fat      ? Number(form.fat)      : null,
      fiber:    form.fiber    ? Number(form.fiber)    : null,
      sodium:   form.sodium   ? Number(form.sodium)   : null,
    };
    if (initial) { onUpdate(payload); } else { onCreate(payload); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold">{initial ? "Edit Recipe" : "New Recipe"}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">✕</button>
        </div>
        <div className="space-y-4 p-5">
          {/* Title */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Title *</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Chicken Stir Fry"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          {/* Description */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={2}
              placeholder="Short description…"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          {/* Servings + times */}
          <div className="grid grid-cols-3 gap-3">
            {([ ["servings","Servings","number"], ["prep_time","Prep (min)","number"], ["cook_time","Cook (min)","number"] ] as const).map(([k, label]) => (
              <div key={k}>
                <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</label>
                <input
                  type="number" min="0"
                  value={form[k]}
                  onChange={(e) => set(k, Number(e.target.value))}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
            ))}
          </div>
          {/* Nutrition */}
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500 uppercase tracking-wide">Nutrition (per serving)</p>
            <div className="grid grid-cols-3 gap-3">
              {([ ["calories","Calories"], ["protein","Protein (g)"], ["carbs","Carbs (g)"], ["fat","Fat (g)"], ["fiber","Fiber (g)"], ["sodium","Sodium (mg)"] ] as const).map(([k, label]) => (
                <div key={k}>
                  <label className="mb-1 block text-xs text-zinc-500">{label}</label>
                  <input
                    type="number" min="0" step="0.1"
                    value={form[k]}
                    onChange={(e) => set(k, e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Ingredients */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Ingredients (one per line)</label>
            <textarea
              value={form.ingredients}
              onChange={(e) => set("ingredients", e.target.value)}
              rows={4}
              placeholder={"2 cups rice\n1 lb chicken breast\n…"}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          {/* Instructions */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Instructions</label>
            <textarea
              value={form.instructions}
              onChange={(e) => set("instructions", e.target.value)}
              rows={4}
              placeholder="Step-by-step directions…"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSubmit}
              disabled={!form.title.trim()}
              className="flex-1 rounded-full bg-[#4169E1] py-2.5 text-sm font-semibold text-white hover:bg-[#000080] disabled:opacity-50 dark:bg-[#87CEEB] dark:text-black"
            >
              {initial ? "Save Changes" : "Create Recipe"}
            </button>
            <button
              onClick={onClose}
              className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
