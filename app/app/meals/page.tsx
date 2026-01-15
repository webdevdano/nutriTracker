import { createClient } from "@/lib/supabase/server";

type MealSuggestion = {
  id: string;
  name: string;
  description: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  ingredients: string[] | null;
};

export default async function MealsPage() {
  const supabase = await createClient();

  const { data: meals } = await supabase
    .from("meal_suggestions")
    .select("*")
    .order("name");

  const suggestions = (meals || []) as MealSuggestion[];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Meal Suggestions</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Nutrient-rich meal ideas to hit your daily goals
      </p>

      {suggestions.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200/70 p-8 text-center dark:border-zinc-800/80">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No meal suggestions yet. Coming soon!
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((meal) => (
            <div
              key={meal.id}
              className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80"
            >
              <h3 className="text-sm font-semibold">{meal.name}</h3>
              {meal.description ? (
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {meal.description}
                </p>
              ) : null}

              <div className="mt-4 flex gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                <span>{meal.calories || "—"} cal</span>
                <span>{meal.protein || "—"}g protein</span>
              </div>

              {meal.ingredients && meal.ingredients.length > 0 ? (
                <div className="mt-4">
                  <div className="text-xs font-medium">Ingredients:</div>
                  <ul className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {meal.ingredients.map((ing, i) => (
                      <li key={i}>• {ing}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
