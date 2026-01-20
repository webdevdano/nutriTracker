"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

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

type GroceryItem = {
  id: string;
  food_name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  created_at: string;
};

type Favorite = {
  id: string;
  fdc_id: number;
  food_name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  serving_size: number;
  created_at: string;
};

type MealPlanMeal = {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
};

type MealPlan = {
  meals: MealPlanMeal[];
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
};

export default function GroceryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'grocery' | 'favorites'>('grocery');
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [addingItem, setAddingItem] = useState(false);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  // Removed unused showNutrientChecklist state

  // Get all unique nutrients from superfoods
  const ALL_SUPERFOOD_NUTRIENTS = Array.from(
    new Set(Object.values(SUPERFOOD_NUTRIENTS).flat())
  ).sort((a, b) => a.localeCompare(b));

  // Map nutrient to foods in grocery list that provide it
  const getNutrientChecklist = () => {
    const checklist: { nutrient: string; foods: string[] }[] = [];
    ALL_SUPERFOOD_NUTRIENTS.forEach((nutrient) => {
      const foods: string[] = [];
      items.forEach((item) => {
        Object.entries(SUPERFOOD_NUTRIENTS).forEach(([superfood, nutrients]) => {
          if (
            item.food_name.toLowerCase().includes(superfood.toLowerCase()) &&
            nutrients.includes(nutrient)
          ) {
            if (!foods.includes(item.food_name)) foods.push(item.food_name);
          }
        });
      });
      checklist.push({ nutrient, foods });
    });
    return checklist;
  };
  const nutrientChecklist = getNutrientChecklist();

  useEffect(() => {
    loadItems();
    loadFavorites();
  }, []);

  async function loadItems() {
    try {
      const response = await fetch("/api/grocery");
      const data = await response.json();
      if (response.ok) {
        setItems(data.items || []);
      }
    } catch (error) {
      console.error("Failed to load grocery list:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadFavorites() {
    try {
      const response = await fetch("/api/favorites");
      const data = await response.json();
      if (response.ok) {
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.trim()) return;

    setAddingItem(true);
    try {
      const response = await fetch("/api/grocery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food_name: newItem }),
      });

      if (response.ok) {
        setNewItem("");
        await loadItems();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setAddingItem(false);
    }
  }

  async function togglePurchased(item: GroceryItem) {
    try {
      const response = await fetch("/api/grocery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, purchased: !item.purchased }),
      });

      if (response.ok) {
        await loadItems();
      }
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  }

  async function deleteItem(id: string) {
    try {
      const response = await fetch(`/api/grocery?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadItems();
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  async function clearPurchased() {
    const purchasedItems = items.filter((item) => item.purchased);
    await Promise.all(purchasedItems.map((item) => deleteItem(item.id)));
  }

  async function generateMealPlan() {
    setGeneratingPlan(true);
    try {
      const response = await fetch("/api/meal-plan?timeFrame=day&targetCalories=2000");
      const data = await response.json();
      
      if (response.ok) {
        setMealPlan(data);
        setShowMealPlan(true);
      }
    } catch (error) {
      console.error("Failed to generate meal plan:", error);
    } finally {
      setGeneratingPlan(false);
    }
  }

  async function deleteFavorite(id: string) {
    try {
      const response = await fetch(`/api/favorites?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavorites(favorites.filter((fav) => fav.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete favorite:", error);
    }
  }

  async function addFavoriteToLog(favorite: Favorite) {
    try {
      const response = await fetch("/api/foods/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fdc_id: favorite.fdc_id,
          food_name: favorite.food_name,
          calories: favorite.calories,
          protein: favorite.protein,
          carbs: favorite.carbs,
          fat: favorite.fat,
          quantity: favorite.serving_size / 100,
          meal_type: "Snack",
        }),
      });

      if (response.ok) {
        setToast({ message: `${favorite.food_name} added to today's log!`, type: 'success' });
        setTimeout(() => router.push("/app"), 1500);
      }
    } catch (error) {
      console.error("Failed to add to log:", error);
    }
  }

  async function addFavoriteToGrocery(favorite: Favorite) {
    try {
      const response = await fetch("/api/grocery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food_name: favorite.food_name }),
      });

      if (response.ok) {
        await loadItems();
        setActiveTab('grocery');
        setToast({ message: `${favorite.food_name} added to grocery list!`, type: 'success' });
      }
    } catch (error) {
      console.error("Failed to add to grocery:", error);
    }
  }

  const unpurchasedItems = items.filter((item) => !item.purchased);
  const purchasedItems = items.filter((item) => item.purchased);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        {/* Nutrient Checklist - Left Column, Sticky */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 md:sticky md:top-28 mb-8 md:mb-0">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              🌟 Nutrient Checklist
            </h3>
            <div className="flex flex-col gap-2">
              {nutrientChecklist.map(({ nutrient, foods }) => (
                <div key={nutrient} className="flex items-center gap-2">
                  {foods.length > 0 ? (
                    <svg className="h-5 w-5 shrink-0 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="inline-block h-5 w-5 shrink-0 rounded-full border-2 border-zinc-300 dark:border-zinc-700"></span>
                  )}
                  <span className={`text-sm font-medium ${foods.length > 0 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-600'}`}>{nutrient}</span>
                  {foods.length > 0 && (
                    <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">({foods.join(', ')})</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Protein Sources Section */}
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              🍗 Main Protein Sources
            </h3>
            <div className="flex flex-col gap-3">
              {Object.entries(MAIN_PROTEINS).map(([protein, nutrients]) => (
                <div key={protein} className="">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">{protein}</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {nutrients.map((nutrient) => (
                      <span key={nutrient} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
        {/* Main Content Area: Header, Tabs, Grocery List */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Lists</h1>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Manage your grocery list and saved favorites
                </p>
              </div>
              {activeTab === 'grocery' && (
                <button
                  onClick={generateMealPlan}
                  disabled={generatingPlan}
                  className="h-10 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
                >
                  {generatingPlan ? "Generating..." : "📅 Meal Plan"}
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-2 rounded-lg border border-zinc-200 p-1 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab('grocery')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'grocery'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              🛒 Grocery List
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              ⭐ Saved Favorites
            </button>
          </div>

          {/* Grocery List Tab */}
          {activeTab === 'grocery' && (
            <>
              <form onSubmit={handleAddItem} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="h-11 flex-1 rounded-xl border border-zinc-300 bg-transparent px-4 text-sm dark:border-zinc-700"
                    placeholder="Add item to grocery list..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="h-11 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
                    disabled={addingItem || !newItem.trim()}
                  >
                    Add
                  </button>
                </div>
              </form>

              {loading ? (
                <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                  Loading...
                </div>
              ) : items.length === 0 ? (
                <div className="rounded-2xl border border-zinc-200/70 p-8 text-center dark:border-zinc-800/80">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Your grocery list is empty. Add items manually or from the search page.
                  </p>
                </div>
              ) : (
                <>
                  {unpurchasedItems.length > 0 && (
                    <div>
                      <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        To Buy ({unpurchasedItems.length})
                      </h2>
                      <div className="space-y-2">
                        {unpurchasedItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 rounded-xl border border-zinc-200/70 p-3 dark:border-zinc-800/80"
                          >
                            <input
                              type="checkbox"
                              checked={item.purchased}
                              onChange={() => togglePurchased(item)}
                              className="h-4 w-4 cursor-pointer rounded border-zinc-300 dark:border-zinc-700"
                            />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{item.food_name}</div>
                              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                                {item.quantity} {item.unit}
                              </div>
                            </div>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {purchasedItems.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          Purchased ({purchasedItems.length})
                        </h2>
                        <button
                          onClick={clearPurchased}
                          className="text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-2">
                        {purchasedItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 rounded-xl border border-zinc-200/70 p-3 opacity-60 dark:border-zinc-800/80"
                          >
                            <input
                              type="checkbox"
                              checked={item.purchased}
                              onChange={() => togglePurchased(item)}
                              className="h-4 w-4 cursor-pointer rounded border-zinc-300 dark:border-zinc-700"
                            />
                            <div className="flex-1">
                              <div className="text-sm font-medium line-through">{item.food_name}</div>
                              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                                {item.quantity} {item.unit}
                              </div>
                            </div>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <>
              {loading ? (
                <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                  Loading...
                </div>
              ) : favorites.length === 0 ? (
                <div className="rounded-2xl border border-zinc-200/70 p-8 text-center dark:border-zinc-800/80">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    No saved favorites yet. Add favorites from the Search page for quick access!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-800/80"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold">{favorite.food_name}</h3>
                          <div className="mt-2 flex gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                            <span>{Math.round(favorite.calories || 0)} cal</span>
                            <span>{Math.round(favorite.protein || 0)}g protein</span>
                            <span>{Math.round(favorite.carbs || 0)}g carbs</span>
                            <span>{Math.round(favorite.fat || 0)}g fat</span>
                          </div>
                          <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                            Per {favorite.serving_size}g serving
                          </div>
                        </div>
                        <button
                          onClick={() => deleteFavorite(favorite.id)}
                          className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => addFavoriteToGrocery(favorite)}
                          className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
                        >
                          Add to Grocery
                        </button>
                        <button
                          onClick={() => addFavoriteToLog(favorite)}
                          className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700 dark:bg-blue-400 dark:text-zinc-900 dark:hover:bg-blue-500"
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
      {showMealPlan && mealPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowMealPlan(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Daily Meal Plan</h2>
              <button
                onClick={() => setShowMealPlan(false)}
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <h3 className="mb-2 text-sm font-semibold">Daily Totals</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Calories</div>
                  <div className="text-sm font-semibold">{Math.round(mealPlan.nutrients.calories)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Protein</div>
                  <div className="text-sm font-semibold">{Math.round(mealPlan.nutrients.protein)}g</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Carbs</div>
                  <div className="text-sm font-semibold">{Math.round(mealPlan.nutrients.carbohydrates)}g</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Fat</div>
                  <div className="text-sm font-semibold">{Math.round(mealPlan.nutrients.fat)}g</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Meals</h3>
              {mealPlan.meals.map((meal) => (
                <div
                  key={meal.id}
                  className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <h4 className="font-medium">{meal.title}</h4>
                  <div className="mt-2 flex gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                    <span>⏱️ {meal.readyInMinutes} min</span>
                    <span>🍽️ {meal.servings} servings</span>
                  </div>
                  {meal.sourceUrl && (
                    <a
                      href={meal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                      View Recipe →
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-zinc-600 dark:text-zinc-400">
              Note: Add individual recipe ingredients to your grocery list from the Meals page
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onCloseAction={() => setToast(null)}
        />
      )}
    </div>
  );
}
