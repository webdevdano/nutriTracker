"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

export default function MealsPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  async function loadRecipes() {
    try {
      const response = await fetch("/api/recipes");
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Failed to load recipes");
        return;
      }
      
      setRecipes(data.recipes || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }

  function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "");
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Meal Suggestions</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Healthy recipe ideas to hit your daily goals
      </p>

      {loading ? (
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading recipes...</p>
        </div>
      ) : error ? (
        <div className="mt-8 rounded-2xl border border-red-200/70 bg-red-50 p-8 text-center dark:border-red-800/80 dark:bg-red-950">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200/70 p-8 text-center dark:border-zinc-800/80">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No meal suggestions available.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
              onClick={() => setSelectedRecipe(recipe)}
            >
              {recipe.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              
              <h3 className="text-sm font-semibold">{recipe.title}</h3>
              
              <div className="mt-2 flex gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                <span>⏱️ {recipe.readyInMinutes} min</span>
                <span>🍽️ {recipe.servings} servings</span>
              </div>

              <div className="mt-3 flex gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                <span>{Math.round(recipe.calories)} cal</span>
                <span>{Math.round(recipe.protein)}g protein</span>
                <span>{Math.round(recipe.carbs)}g carbs</span>
                <span>{Math.round(recipe.fat)}g fat</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mb-4 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              ← Back to recipes
            </button>

            {selectedRecipe.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <h2 className="text-xl font-semibold">{selectedRecipe.title}</h2>
            
            <div className="mt-3 flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <span>⏱️ {selectedRecipe.readyInMinutes} minutes</span>
              <span>🍽️ {selectedRecipe.servings} servings</span>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Calories</div>
                <div className="text-sm font-semibold">{Math.round(selectedRecipe.calories)}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Protein</div>
                <div className="text-sm font-semibold">{Math.round(selectedRecipe.protein)}g</div>
              </div>
              <div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Carbs</div>
                <div className="text-sm font-semibold">{Math.round(selectedRecipe.carbs)}g</div>
              </div>
              <div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Fat</div>
                <div className="text-sm font-semibold">{Math.round(selectedRecipe.fat)}g</div>
              </div>
            </div>

            {selectedRecipe.summary && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Description</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {stripHtml(selectedRecipe.summary)}
                </p>
              </div>
            )}

            {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Ingredients</h3>
                <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i}>• {ing}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
