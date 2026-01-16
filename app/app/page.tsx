'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type FoodLog = {
  id: string;
  fdc_id: number;
  food_name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  sodium: number | null;
  saturated_fat: number | null;
  trans_fat: number | null;
  polyunsaturated_fat: number | null;
  monounsaturated_fat: number | null;
  cholesterol: number | null;
  sugars: number | null;
  added_sugars: number | null;
  vitamin_a: number | null;
  vitamin_c: number | null;
  vitamin_d: number | null;
  vitamin_e: number | null;
  vitamin_k: number | null;
  thiamin: number | null;
  riboflavin: number | null;
  niacin: number | null;
  vitamin_b6: number | null;
  folate: number | null;
  vitamin_b12: number | null;
  calcium: number | null;
  iron: number | null;
  magnesium: number | null;
  phosphorus: number | null;
  potassium: number | null;
  zinc: number | null;
  selenium: number | null;
  quantity: number;
  time: string;
};

type UserGoal = {
  calories_goal: number | null;
  protein_goal: number | null;
  carbs_goal: number | null;
  fat_goal: number | null;
};

export default function TodayPage() {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [goals, setGoals] = useState<UserGoal | null>(null);
  const [showAllNutrients, setShowAllNutrients] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [editingLog, setEditingLog] = useState<FoodLog | null>(null);
  const [editServingSize, setEditServingSize] = useState<number>(100);
  const [editCustomServing, setEditCustomServing] = useState("");
  const [foodData, setFoodData] = useState<any>(null);
  const [updating, setUpdating] = useState(false);

  async function handleRemoveLog(logId: string) {
    const supabase = createClient();
    const { error } = await supabase.from("food_logs").delete().eq("id", logId);
    
    if (error) {
      alert(`Failed to remove: ${error.message}`);
      return;
    }
    
    setLogs(logs.filter(log => log.id !== logId));
  }

  async function handleEditLog(log: FoodLog) {
    setEditingLog(log);
    setEditServingSize(100);
    setEditCustomServing("");
    setUpdating(false);
    
    // Fetch food data from USDA API using fdc_id
    try {
      const response = await fetch(`/api/foods/${log.fdc_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch food data");
      }
      const data = await response.json();
      setFoodData(data);
    } catch (err) {
      console.error("Failed to fetch food data:", err);
      alert("Could not load food data for editing");
    }
  }

  function closeEditModal() {
    setEditingLog(null);
    setFoodData(null);
  }

  async function handleUpdateLog() {
    if (!editingLog || !foodData) return;

    setUpdating(true);
    const multiplier = editServingSize / 100;

    function getNutrient(name: string): number {
      if (!foodData?.foodNutrients) return 0;
      return foodData.foodNutrients.find((n: any) => n.nutrientName === name)?.value || 0;
    }

    const calories = getNutrient("Energy") * multiplier;
    const protein = getNutrient("Protein") * multiplier;
    const carbs = getNutrient("Carbohydrate, by difference") * multiplier;
    const fat = getNutrient("Total lipid (fat)") * multiplier;
    const fiber = getNutrient("Fiber, total dietary") * multiplier;
    const sodium = getNutrient("Sodium, Na") * multiplier;
    const saturated_fat = getNutrient("Fatty acids, total saturated") * multiplier;
    const trans_fat = getNutrient("Fatty acids, total trans") * multiplier;
    const polyunsaturated_fat = getNutrient("Fatty acids, total polyunsaturated") * multiplier;
    const monounsaturated_fat = getNutrient("Fatty acids, total monounsaturated") * multiplier;
    const cholesterol = getNutrient("Cholesterol") * multiplier;
    const sugars = getNutrient("Sugars, total including NLEA") * multiplier;
    const added_sugars = getNutrient("Sugars, added") * multiplier;
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
    const calcium = getNutrient("Calcium, Ca") * multiplier;
    const iron = getNutrient("Iron, Fe") * multiplier;
    const magnesium = getNutrient("Magnesium, Mg") * multiplier;
    const phosphorus = getNutrient("Phosphorus, P") * multiplier;
    const potassium = getNutrient("Potassium, K") * multiplier;
    const zinc = getNutrient("Zinc, Zn") * multiplier;
    const selenium = getNutrient("Selenium, Se") * multiplier;

    const supabase = createClient();
    const { error } = await supabase
      .from("food_logs")
      .update({
        food_name: `${foodData.description} (${editServingSize}g)`,
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
      })
      .eq("id", editingLog.id);

    setUpdating(false);

    if (error) {
      alert(`Failed to update: ${error.message}`);
      return;
    }

    // Refresh the logs
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("food_logs")
      .select("*")
      .eq("date", today)
      .order("time", { ascending: false });
    
    setLogs((data || []) as FoodLog[]);
    closeEditModal();
  }

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const today = new Date().toISOString().split("T")[0];

      const [logsResult, goalsResult] = await Promise.all([
        supabase
          .from("food_logs")
          .select("*")
          .eq("date", today)
          .order("time", { ascending: false }),
        supabase.from("user_goals").select("*").single(),
      ]);

      setLogs((logsResult.data || []) as FoodLog[]);
      setGoals(goalsResult.data as UserGoal | null);
      setLoading(false);
    }

    fetchData();
  }, []);

  const totals = logs.reduce(
    (acc, log) => ({
      calories: acc.calories + (log.calories || 0) * log.quantity,
      protein: acc.protein + (log.protein || 0) * log.quantity,
      carbs: acc.carbs + (log.carbs || 0) * log.quantity,
      fat: acc.fat + (log.fat || 0) * log.quantity,
      fiber: acc.fiber + (log.fiber || 0) * log.quantity,
      sodium: acc.sodium + (log.sodium || 0) * log.quantity,
      saturated_fat: acc.saturated_fat + (log.saturated_fat || 0) * log.quantity,
      trans_fat: acc.trans_fat + (log.trans_fat || 0) * log.quantity,
      polyunsaturated_fat: acc.polyunsaturated_fat + (log.polyunsaturated_fat || 0) * log.quantity,
      monounsaturated_fat: acc.monounsaturated_fat + (log.monounsaturated_fat || 0) * log.quantity,
      cholesterol: acc.cholesterol + (log.cholesterol || 0) * log.quantity,
      sugars: acc.sugars + (log.sugars || 0) * log.quantity,
      added_sugars: acc.added_sugars + (log.added_sugars || 0) * log.quantity,
      vitamin_a: acc.vitamin_a + (log.vitamin_a || 0) * log.quantity,
      vitamin_c: acc.vitamin_c + (log.vitamin_c || 0) * log.quantity,
      vitamin_d: acc.vitamin_d + (log.vitamin_d || 0) * log.quantity,
      vitamin_e: acc.vitamin_e + (log.vitamin_e || 0) * log.quantity,
      vitamin_k: acc.vitamin_k + (log.vitamin_k || 0) * log.quantity,
      thiamin: acc.thiamin + (log.thiamin || 0) * log.quantity,
      riboflavin: acc.riboflavin + (log.riboflavin || 0) * log.quantity,
      niacin: acc.niacin + (log.niacin || 0) * log.quantity,
      vitamin_b6: acc.vitamin_b6 + (log.vitamin_b6 || 0) * log.quantity,
      folate: acc.folate + (log.folate || 0) * log.quantity,
      vitamin_b12: acc.vitamin_b12 + (log.vitamin_b12 || 0) * log.quantity,
      calcium: acc.calcium + (log.calcium || 0) * log.quantity,
      iron: acc.iron + (log.iron || 0) * log.quantity,
      magnesium: acc.magnesium + (log.magnesium || 0) * log.quantity,
      phosphorus: acc.phosphorus + (log.phosphorus || 0) * log.quantity,
      potassium: acc.potassium + (log.potassium || 0) * log.quantity,
      zinc: acc.zinc + (log.zinc || 0) * log.quantity,
      selenium: acc.selenium + (log.selenium || 0) * log.quantity,
    }),
    { 
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0,
      saturated_fat: 0, trans_fat: 0, polyunsaturated_fat: 0, monounsaturated_fat: 0,
      cholesterol: 0, sugars: 0, added_sugars: 0, 
      vitamin_a: 0, vitamin_c: 0, vitamin_d: 0, vitamin_e: 0, vitamin_k: 0,
      thiamin: 0, riboflavin: 0, niacin: 0, vitamin_b6: 0, folate: 0, vitamin_b12: 0,
      calcium: 0, iron: 0, magnesium: 0, phosphorus: 0, potassium: 0, zinc: 0, selenium: 0
    }
  );

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="text-center text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

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

      {/* Main Macros */}
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

      {/* Additional Nutrients Section */}
      <div className="mt-6 rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80">
        <button
          onClick={() => setShowAllNutrients(!showAllNutrients)}
          className="flex w-full items-center justify-between text-left"
        >
          <h3 className="text-sm font-semibold">Additional Nutrients</h3>
          <svg
            className={`h-5 w-5 transition-transform ${showAllNutrients ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Preview - Always show 4 nutrients */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <NutrientCard label="Fiber" value={totals.fiber} unit="g" goal={28} />
          <NutrientCard label="Sodium" value={totals.sodium} unit="mg" goal={2300} limit />
          <NutrientCard label="Vitamin C" value={totals.vitamin_c} unit="mg" goal={90} />
          <NutrientCard label="Calcium" value={totals.calcium} unit="mg" goal={1000} />
        </div>

        {/* Expanded - Show all nutrients */}
        {showAllNutrients && (
          <div className="mt-3 space-y-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            {/* Fats */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Fats</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <NutrientCard label="Saturated Fat" value={totals.saturated_fat} unit="g" goal={22} limit />
                <NutrientCard label="Trans Fat" value={totals.trans_fat} unit="g" goal={0} limit />
                <NutrientCard label="Polyunsaturated" value={totals.polyunsaturated_fat} unit="g" />
                <NutrientCard label="Monounsaturated" value={totals.monounsaturated_fat} unit="g" />
              </div>
            </div>

            {/* Carbs & Cholesterol */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Carbohydrates & Cholesterol</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <NutrientCard label="Total Sugars" value={totals.sugars} unit="g" />
                <NutrientCard label="Added Sugars" value={totals.added_sugars} unit="g" goal={50} limit />
                <NutrientCard label="Cholesterol" value={totals.cholesterol} unit="mg" goal={300} limit />
              </div>
            </div>

            {/* Vitamins */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Vitamins</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <NutrientCard label="Vitamin A" value={totals.vitamin_a} unit="µg" goal={900} />
                <NutrientCard label="Vitamin D" value={totals.vitamin_d} unit="µg" goal={20} />
                <NutrientCard label="Vitamin E" value={totals.vitamin_e} unit="mg" goal={15} />
                <NutrientCard label="Vitamin K" value={totals.vitamin_k} unit="µg" goal={120} />
                <NutrientCard label="Thiamin (B1)" value={totals.thiamin} unit="mg" goal={1.2} />
                <NutrientCard label="Riboflavin (B2)" value={totals.riboflavin} unit="mg" goal={1.3} />
                <NutrientCard label="Niacin (B3)" value={totals.niacin} unit="mg" goal={16} />
                <NutrientCard label="Vitamin B6" value={totals.vitamin_b6} unit="mg" goal={1.7} />
                <NutrientCard label="Folate" value={totals.folate} unit="µg" goal={400} />
                <NutrientCard label="Vitamin B12" value={totals.vitamin_b12} unit="µg" goal={2.4} />
              </div>
            </div>

            {/* Minerals */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Minerals</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <NutrientCard label="Iron" value={totals.iron} unit="mg" goal={8} />
                <NutrientCard label="Magnesium" value={totals.magnesium} unit="mg" goal={420} />
                <NutrientCard label="Phosphorus" value={totals.phosphorus} unit="mg" goal={700} />
                <NutrientCard label="Potassium" value={totals.potassium} unit="mg" goal={3400} />
                <NutrientCard label="Zinc" value={totals.zinc} unit="mg" goal={11} />
                <NutrientCard label="Selenium" value={totals.selenium} unit="µg" goal={55} />
              </div>
            </div>
          </div>
        )}
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
                <div className="flex items-center gap-3">
                  <div className="text-xs text-zinc-500">
                    {new Date(log.time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                  <button
                    onClick={() => handleEditLog(log)}
                    className="rounded-full p-1.5 text-zinc-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                    title="Edit"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRemoveLog(log.id)}
                    className="rounded-full p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                    title="Remove"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingLog && foodData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeEditModal}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#B0C4DE] bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">Edit Serving Size</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{foodData.description}</p>
            
            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Serving Size
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { label: "100g", grams: 100 },
                  { label: "150g", grams: 150 },
                  { label: "200g", grams: 200 },
                ].map((size) => (
                  <button
                    key={size.grams}
                    onClick={() => {
                      setEditServingSize(size.grams);
                      setEditCustomServing("");
                    }}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      editServingSize === size.grams && !editCustomServing
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
                value={editCustomServing}
                onChange={(e) => {
                  setEditCustomServing(e.target.value);
                  if (e.target.value) setEditServingSize(parseInt(e.target.value) || 100);
                }}
                className="mt-2 h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={closeEditModal}
                className="flex-1 rounded-full border border-[#D3D8E0] px-4 py-2 text-sm font-medium hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLog}
                disabled={updating}
                className="flex-1 rounded-full bg-[#4169E1] px-4 py-2 text-sm font-medium text-white hover:bg-[#000080] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NutrientCard({ 
  label, 
  value, 
  unit, 
  goal, 
  limit = false 
}: { 
  label: string; 
  value: number; 
  unit: string; 
  goal?: number;
  limit?: boolean;
}) {
  const percentage = goal ? Math.min((value / goal) * 100, 100) : 0;
  const isOverLimit = limit && goal && value > goal;
  
  return (
    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
      <div className="text-xs text-zinc-600 dark:text-zinc-400">{label}</div>
      <div className="mt-1 text-lg font-semibold">
        {Math.round(value * 10) / 10}{unit}
      </div>
      {goal && (
        <>
          <div className="mt-2 text-xs text-zinc-500">
            {limit ? 'Limit: ' : 'Goal: '}{goal}{unit}
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className={`h-full transition-all ${
                isOverLimit
                  ? 'bg-red-500'
                  : percentage >= 100
                  ? 'bg-green-500'
                  : percentage >= 70
                  ? 'bg-blue-500'
                  : 'bg-zinc-400'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
