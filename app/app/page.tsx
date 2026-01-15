import { createClient } from "@/lib/supabase/server";

type FoodLog = {
  id: string;
  food_name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  quantity: number;
  time: string;
};

type UserGoal = {
  calories_goal: number | null;
  protein_goal: number | null;
  carbs_goal: number | null;
  fat_goal: number | null;
};

export default async function TodayPage() {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  const [logsResult, goalsResult] = await Promise.all([
    supabase
      .from("food_logs")
      .select("*")
      .eq("date", today)
      .order("time", { ascending: false }),
    supabase.from("user_goals").select("*").single(),
  ]);

  const logs = (logsResult.data || []) as FoodLog[];
  const goals = goalsResult.data as UserGoal | null;

  const totals = logs.reduce(
    (acc, log) => ({
      calories: acc.calories + (log.calories || 0) * log.quantity,
      protein: acc.protein + (log.protein || 0) * log.quantity,
      carbs: acc.carbs + (log.carbs || 0) * log.quantity,
      fat: acc.fat + (log.fat || 0) * log.quantity,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Today&apos;s Progress</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80">
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Calories
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {Math.round(totals.calories)}
          </div>
          {goals?.calories_goal ? (
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              / {goals.calories_goal} goal
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80">
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Protein
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {Math.round(totals.protein)}g
          </div>
          {goals?.protein_goal ? (
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              / {goals.protein_goal}g goal
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80">
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Carbs
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {Math.round(totals.carbs)}g
          </div>
          {goals?.carbs_goal ? (
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              / {goals.carbs_goal}g goal
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80">
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Fat</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {Math.round(totals.fat)}g
          </div>
          {goals?.fat_goal ? (
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              / {goals.fat_goal}g goal
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Today&apos;s Meals</h2>
          <a
            href="/app/search"
            className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
          >
            + Add Food
          </a>
        </div>

        {logs.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200/70 p-8 text-center dark:border-zinc-800/80">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No meals logged yet today. Start by searching for foods!
            </p>
          </div>
        ) : (
          <div className="grid gap-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-800/80"
              >
                <div>
                  <div className="text-sm font-medium">{log.food_name}</div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {log.quantity}x serving · {Math.round((log.calories || 0) * log.quantity)}{" "}
                    cal · {Math.round((log.protein || 0) * log.quantity)}g protein
                  </div>
                </div>
                <div className="text-xs text-zinc-500">
                  {new Date(log.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
