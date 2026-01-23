'use client';

import { useEffect, useState, useMemo } from "react";
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

type HistoricalData = {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function TodayPage() {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [goals, setGoals] = useState<UserGoal | null>(null);
  const [showAllNutrients, setShowAllNutrients] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeView, setTimeView] = useState<'today' | 'week' | 'month'>('today');
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  
  const [editingLog, setEditingLog] = useState<FoodLog | null>(null);
  const [editServingSize, setEditServingSize] = useState<number>(100);
  const [editCustomServing, setEditCustomServing] = useState("");
  const [foodData, setFoodData] = useState<{ description: string; foodNutrients: Array<{ nutrient?: { name: string }; nutrientName?: string; amount?: number; value?: number }> } | null>(null);
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
      console.log("Fetching food data for fdc_id:", log.fdc_id);
      const response = await fetch(`/api/foods/${log.fdc_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch food data");
      }
      const data = await response.json();
      console.log("Food data received:", data);
      console.log("Number of nutrients:", data.foodNutrients?.length);
      if (data.foodNutrients && data.foodNutrients.length > 0) {
        console.log("First few nutrients:", data.foodNutrients.slice(0, 5));
        console.log("Sample nutrient structure:", JSON.stringify(data.foodNutrients[0], null, 2));
      }
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

    console.log("=== UPDATE STARTED ===");
    console.log("editServingSize:", editServingSize);
    console.log("editCustomServing:", editCustomServing);
    console.log("foodData.description:", foodData.description);

    setUpdating(true);
    const multiplier = editServingSize / 100;

    function getNutrient(name: string): number {
      if (!foodData?.foodNutrients) return 0;
      const nutrient = foodData.foodNutrients.find((n) => 
        n.nutrient?.name === name || n.nutrientName === name
      );
      return nutrient?.amount || nutrient?.value || 0;
    }

    const calories = getNutrient("Energy") * multiplier;
    const protein = getNutrient("Protein") * multiplier;
    const carbs = getNutrient("Carbohydrate, by difference") * multiplier;
    const fat = getNutrient("Total lipid (fat)") * multiplier;
    
    console.log("Calculated values:");
    console.log("- multiplier:", multiplier);
    console.log("- calories:", calories);
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

    const newFoodName = `${foodData.description} (${editServingSize}g)`;
    console.log("New food name:", newFoodName);

    console.log("Updating log:", editingLog.id);
    console.log("New serving size:", editServingSize);
    console.log("New calories:", calories);

    const supabase = createClient();
    const { error } = await supabase
      .from("food_logs")
      .update({
        food_name: newFoodName,
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

    console.log("Update error:", error);

    if (error) {
      setUpdating(false);
      alert(`Failed to update: ${error.message}`);
      return;
    }

    // Wait a moment for database to process
    await new Promise(resolve => setTimeout(resolve, 200));

    // Refresh the logs
    const today = new Date().toISOString().split("T")[0];
    const { data, error: fetchError } = await supabase
      .from("food_logs")
      .select("*")
      .eq("date", today)
      .order("time", { ascending: false });
    
    console.log("Fetched logs:", data);
    console.log("Fetch error:", fetchError);
    
    if (data && data.length > 0) {
      console.log("First log details:");
      console.log("- food_name:", data[0].food_name);
      console.log("- calories:", data[0].calories);
      console.log("- protein:", data[0].protein);
    }

    setUpdating(false);
    
    if (data) {
      console.log("Setting new logs state:", data);
      const newLogs = [...data] as FoodLog[];
      setLogs(newLogs);
      console.log("State set, logs length:", newLogs.length);
    }
    
    // Small delay to ensure state update before closing modal
    setTimeout(() => {
      closeEditModal();
    }, 100);
  }

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const today = new Date().toISOString().split("T")[0];

      // Calculate date range based on view
      let startDate = today;
      if (timeView === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        startDate = weekAgo.toISOString().split("T")[0];
      } else if (timeView === 'month') {
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        startDate = monthAgo.toISOString().split("T")[0];
      }

      const [logsResult, goalsResult, historicalResult] = await Promise.all([
        supabase
          .from("food_logs")
          .select("*")
          .eq("date", today)
          .order("time", { ascending: false }),
        supabase.from("user_goals").select("*").single(),
        timeView !== 'today' ? supabase
          .from("food_logs")
          .select("date, calories, protein, carbs, fat, quantity")
          .gte("date", startDate)
          .lte("date", today)
          .order("date", { ascending: true }) : Promise.resolve({ data: [] })
      ]);

      setLogs((logsResult.data || []) as FoodLog[]);
      setGoals(goalsResult.data as UserGoal | null);
      
      // Aggregate historical data by date
      if (historicalResult.data && historicalResult.data.length > 0) {
        const aggregated = historicalResult.data.reduce((acc: Record<string, HistoricalData>, item: { date: string; calories: number | null; protein: number | null; carbs: number | null; fat: number | null; quantity: number }) => {
          if (!acc[item.date]) {
            acc[item.date] = { date: item.date, calories: 0, protein: 0, carbs: 0, fat: 0 };
          }
          acc[item.date].calories += (item.calories || 0) * (item.quantity || 1);
          acc[item.date].protein += (item.protein || 0) * (item.quantity || 1);
          acc[item.date].carbs += (item.carbs || 0) * (item.quantity || 1);
          acc[item.date].fat += (item.fat || 0) * (item.quantity || 1);
          return acc;
        }, {});
        setHistoricalData(Object.values(aggregated));
      } else {
        setHistoricalData([]);
      }
      
      setLoading(false);
    }

    fetchData();
  }, [timeView]);

  useEffect(() => {
    console.log("Logs state updated:", logs.length, "items");
    logs.forEach(log => {
      console.log(`- ${log.food_name}: ${log.calories} cal`);
    });
  }, [logs]);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Progress</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        
        {/* Time View Toggle */}
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
          <button
            onClick={() => setTimeView('today')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              timeView === 'today'
                ? 'bg-[#4169E1] text-white dark:bg-blue-900 dark:text-white'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-blue-950/60'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeView('week')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              timeView === 'week'
                ? 'bg-[#4169E1] text-white dark:bg-blue-900 dark:text-white'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-blue-950/60'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeView('month')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              timeView === 'month'
                ? 'bg-[#4169E1] text-white dark:bg-blue-900 dark:text-white'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-blue-950/60'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Historical Charts - Only show for week/month views */}
      {timeView !== 'today' && historicalData.length > 0 && (
        <div className="mt-6 rounded-2xl border border-zinc-200/70 p-6 dark:border-blue-950/70 bg-white dark:bg-zinc-900">
          <h3 className="text-sm font-semibold mb-4">Trend Overview</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <Chart 
              data={historicalData} 
              metric="calories" 
              label="Calories" 
              goal={goals?.calories_goal} 
              color="#4169E1"
            />
            <Chart 
              data={historicalData} 
              metric="protein" 
              label="Protein (g)" 
              goal={goals?.protein_goal}
              color="#32CD32"
            />
            <Chart 
              data={historicalData} 
              metric="carbs" 
              label="Carbs (g)" 
              goal={goals?.carbs_goal}
              color="#FFD700"
            />
            <Chart 
              data={historicalData} 
              metric="fat" 
              label="Fat (g)" 
              goal={goals?.fat_goal}
              color="#FF6347"
            />
          </div>
          
          {/* Statistics Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-4 border-t border-zinc-200 pt-6 dark:border-blue-950/70">
            <StatCard 
              label="Avg Calories"
              value={Math.round(historicalData.reduce((sum, d) => sum + d.calories, 0) / historicalData.length)}
              goal={goals?.calories_goal}
            />
            <StatCard 
              label="Avg Protein"
              value={Math.round(historicalData.reduce((sum, d) => sum + d.protein, 0) / historicalData.length)}
              goal={goals?.protein_goal}
              unit="g"
            />
            <StatCard 
              label="Avg Carbs"
              value={Math.round(historicalData.reduce((sum, d) => sum + d.carbs, 0) / historicalData.length)}
              goal={goals?.carbs_goal}
              unit="g"
            />
            <StatCard 
              label="Avg Fat"
              value={Math.round(historicalData.reduce((sum, d) => sum + d.fat, 0) / historicalData.length)}
              goal={goals?.fat_goal}
              unit="g"
            />
          </div>
        </div>
      )}

      {/* Main Macros - Use StatCard for consistency */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatCard 
          label="Calories"
          value={Math.round(totals.calories)}
          goal={goals?.calories_goal}
        />
        <StatCard 
          label="Protein"
          value={Math.round(totals.protein)}
          goal={goals?.protein_goal}
          unit="g"
        />
        <StatCard 
          label="Carbs"
          value={Math.round(totals.carbs)}
          goal={goals?.carbs_goal}
          unit="g"
        />
        <StatCard 
          label="Fat"
          value={Math.round(totals.fat)}
          goal={goals?.fat_goal}
          unit="g"
        />
      </div>

      {/* Additional Nutrients Section */}
      <div className="mt-6 rounded-2xl border border-zinc-200/70 p-5 dark:border-blue-950/70 bg-white dark:bg-zinc-900">
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
          <StatCard label="Fiber" value={Math.round(totals.fiber * 10) / 10} goal={28} unit="g" />
          <StatCard label="Sodium" value={Math.round(totals.sodium)} goal={2300} unit="mg" />
          <StatCard label="Vitamin C" value={Math.round(totals.vitamin_c)} goal={90} unit="mg" />
          <StatCard label="Calcium" value={Math.round(totals.calcium)} goal={1000} unit="mg" />
        </div>

        {/* Expanded - Show all nutrients */}
        {showAllNutrients && (
          <div className="mt-3 space-y-6 border-t border-zinc-200 pt-4 dark:border-blue-950/70">
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
                <StatCard label="Vitamin A" value={Math.round(totals.vitamin_a)} goal={900} unit="µg" />
                <StatCard label="Vitamin D" value={Math.round(totals.vitamin_d)} goal={20} unit="µg" />
                <StatCard label="Vitamin E" value={Math.round(totals.vitamin_e)} goal={15} unit="mg" />
                <StatCard label="Vitamin K" value={Math.round(totals.vitamin_k)} goal={120} unit="µg" />
                <StatCard label="Thiamin (B1)" value={Math.round(totals.thiamin * 10) / 10} goal={1.2} unit="mg" />
                <StatCard label="Riboflavin (B2)" value={Math.round(totals.riboflavin * 10) / 10} goal={1.3} unit="mg" />
                <StatCard label="Niacin (B3)" value={Math.round(totals.niacin * 10) / 10} goal={16} unit="mg" />
                <StatCard label="Vitamin B6" value={Math.round(totals.vitamin_b6 * 10) / 10} goal={1.7} unit="mg" />
                <StatCard label="Folate" value={Math.round(totals.folate)} goal={400} unit="µg" />
                <StatCard label="Vitamin B12" value={Math.round(totals.vitamin_b12 * 10) / 10} goal={2.4} unit="µg" />
              </div>
            </div>

            {/* Minerals */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Minerals</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Iron" value={Math.round(totals.iron * 10) / 10} goal={8} unit="mg" />
                <StatCard label="Magnesium" value={Math.round(totals.magnesium)} goal={420} unit="mg" />
                <StatCard label="Phosphorus" value={Math.round(totals.phosphorus)} goal={700} unit="mg" />
                <StatCard label="Potassium" value={Math.round(totals.potassium)} goal={3400} unit="mg" />
                <StatCard label="Zinc" value={Math.round(totals.zinc * 10) / 10} goal={11} unit="mg" />
                <StatCard label="Selenium" value={Math.round(totals.selenium)} goal={55} unit="µg" />
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
          <div className="rounded-2xl border border-zinc-200/70 p-8 text-center dark:border-blue-950/70 bg-white dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No meals logged yet today. Start by searching for foods!
            </p>
          </div>
        ) : (
          <div className="grid gap-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between rounded-xl border border-zinc-200/70 p-4 dark:border-blue-950/70 bg-white dark:bg-zinc-900"
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
                    className="rounded-full p-1.5 text-zinc-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-300"
                    title="Edit"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRemoveLog(log.id)}
                    className="rounded-full p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 dark:hover:text-red-300"
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
            className="w-full max-w-md rounded-2xl border border-[#B0C4DE] bg-white p-6 shadow-xl dark:border-blue-950/70 dark:bg-zinc-900"
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
                        ? "border-[#4169E1] bg-[#4169E1] text-white dark:border-blue-900 dark:bg-blue-900 dark:text-white"
                        : "border-[#D3D8E0] hover:bg-[#E0E0E0] dark:border-blue-950/70 dark:hover:bg-blue-950/60"
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

function Chart({ 
  data, 
  metric, 
  label, 
  goal,
  color = '#4169E1'
}: { 
  data: HistoricalData[]; 
  metric: keyof Omit<HistoricalData, 'date'>; 
  label: string; 
  goal?: number | null;
  color?: string;
}) {
  const maxValue = useMemo(() => {
    const dataMax = Math.max(...data.map(d => d[metric]));
    return goal && goal > dataMax ? goal * 1.1 : dataMax * 1.1;
  }, [data, metric, goal]);

  return (
    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold">{label}</h4>
        {goal && (
          <div className="text-xs text-zinc-500">Goal: {goal}</div>
        )}
      </div>
      <div className="relative h-32">
        <div className="absolute inset-0 flex items-end justify-between gap-1">
          {data.map((item, i) => {
            const height = maxValue > 0 ? (item[metric] / maxValue) * 100 : 0;
            const isGoalMet = goal ? item[metric] >= goal : false;
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                <div
                  className="w-full rounded-t transition-all hover:opacity-80"
                  style={{ 
                    height: `${height}%`,
                    backgroundColor: isGoalMet ? '#22c55e' : color,
                    minHeight: height > 0 ? '2px' : '0'
                  }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: {Math.round(item[metric])}
                </div>
              </div>
            );
          })}
        </div>
        {/* Goal line */}
        {goal && maxValue > 0 && (
          <div 
            className="absolute left-0 right-0 border-t-2 border-dashed border-zinc-400 dark:border-zinc-600"
            style={{ bottom: `${(goal / maxValue) * 100}%` }}
          />
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
        <span>{data.length > 0 ? new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
        <span>{data.length > 0 ? new Date(data[data.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  goal,
  unit = ''
}: { 
  label: string; 
  value: number; 
  goal?: number | null;
  unit?: string;
}) {
  const percentage = goal && goal > 0 ? (value / goal) * 100 : 0;
  const isOnTrack = percentage >= 90 && percentage <= 110;
  
  // Choose a color based on label, with dark mode overrides
  const colorMap: Record<string, string> = {
    Calories: 'from-yellow-200 to-yellow-400 border-yellow-300 dark:from-yellow-900 dark:to-yellow-800 dark:border-yellow-900',
    Protein: 'from-green-200 to-green-400 border-green-300 dark:from-green-900 dark:to-green-800 dark:border-green-900',
    Carbs: 'from-blue-200 to-blue-400 border-blue-300 dark:from-blue-900 dark:to-blue-800 dark:border-blue-900',
    Fat: 'from-pink-200 to-pink-400 border-pink-300 dark:from-pink-900 dark:to-pink-800 dark:border-pink-900',
    Fiber: 'from-teal-200 to-teal-400 border-teal-300 dark:from-teal-900 dark:to-teal-800 dark:border-teal-900',
    Sodium: 'from-indigo-200 to-indigo-400 border-indigo-300 dark:from-indigo-900 dark:to-indigo-800 dark:border-indigo-900',
    Calcium: 'from-purple-200 to-purple-400 border-purple-300 dark:from-purple-900 dark:to-purple-800 dark:border-purple-900',
    Iron: 'from-red-200 to-red-400 border-red-300 dark:from-red-900 dark:to-red-800 dark:border-red-900',
    'Vitamin C': 'from-orange-200 to-orange-400 border-orange-300 dark:from-orange-900 dark:to-orange-800 dark:border-orange-900',
    'Vitamin D': 'from-yellow-100 to-yellow-300 border-yellow-200 dark:from-yellow-900 dark:to-yellow-800 dark:border-yellow-900',
    'Vitamin A': 'from-orange-100 to-orange-300 border-orange-200 dark:from-orange-900 dark:to-orange-800 dark:border-orange-900',
    'Vitamin E': 'from-lime-200 to-lime-400 border-lime-300 dark:from-lime-900 dark:to-lime-800 dark:border-lime-900',
    'Vitamin K': 'from-green-100 to-green-300 border-green-200 dark:from-green-900 dark:to-green-800 dark:border-green-900',
    'Thiamin (B1)': 'from-cyan-200 to-cyan-400 border-cyan-300 dark:from-cyan-900 dark:to-cyan-800 dark:border-cyan-900',
    'Riboflavin (B2)': 'from-blue-100 to-blue-300 border-blue-200 dark:from-blue-900 dark:to-blue-800 dark:border-blue-900',
    'Niacin (B3)': 'from-pink-100 to-pink-300 border-pink-200 dark:from-pink-900 dark:to-pink-800 dark:border-pink-900',
    'Vitamin B6': 'from-yellow-200 to-yellow-400 border-yellow-300 dark:from-yellow-900 dark:to-yellow-800 dark:border-yellow-900',
    Folate: 'from-green-200 to-green-400 border-green-300 dark:from-green-900 dark:to-green-800 dark:border-green-900',
    'Vitamin B12': 'from-indigo-200 to-indigo-400 border-indigo-300 dark:from-indigo-900 dark:to-indigo-800 dark:border-indigo-900',
    Magnesium: 'from-purple-200 to-purple-400 border-purple-300 dark:from-purple-900 dark:to-purple-800 dark:border-purple-900',
    Phosphorus: 'from-teal-200 to-teal-400 border-teal-300 dark:from-teal-900 dark:to-teal-800 dark:border-teal-900',
    Potassium: 'from-pink-200 to-pink-400 border-pink-300 dark:from-pink-900 dark:to-pink-800 dark:border-pink-900',
    Zinc: 'from-gray-200 to-gray-400 border-gray-300 dark:from-gray-900 dark:to-gray-800 dark:border-gray-900',
    Selenium: 'from-blue-200 to-blue-400 border-blue-300 dark:from-blue-900 dark:to-blue-800 dark:border-blue-900',
  };
  const colorClass = colorMap[label] || 'from-zinc-50 to-zinc-100 border-zinc-200 dark:from-zinc-900 dark:to-zinc-800 dark:border-zinc-900';

  // Simple icon based on nutrient type
  const iconMap: Record<string, string> = {
    Calories: '🔥',
    Protein: '🍗',
    Carbs: '🍞',
    Fat: '🥑',
    Fiber: '🌾',
    Sodium: '🧂',
    Calcium: '🥛',
    Iron: '🩸',
    'Vitamin C': '🍊',
    'Vitamin D': '☀️',
    'Vitamin A': '🥕',
    'Vitamin E': '🥜',
    'Vitamin K': '🥬',
    'Thiamin (B1)': '🌽',
    'Riboflavin (B2)': '🥚',
    'Niacin (B3)': '🐟',
    'Vitamin B6': '🍌',
    Folate: '🥦',
    'Vitamin B12': '🥩',
    Magnesium: '🥒',
    Phosphorus: '🍖',
    Potassium: '🍌',
    Zinc: '🧀',
    Selenium: '🥚',
  };
  const icon = iconMap[label] || '🍽️';

  return (
    <div className={`rounded-xl border-2 p-4 shadow-md bg-linear-to-br ${colorClass} transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-200">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {value}{unit}
      </div>
      {goal && (
        <div className="mt-1 flex items-center gap-2">
          <div className={`text-xs font-medium ${
            isOnTrack 
              ? 'text-green-600 dark:text-green-400' 
              : percentage > 110 
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-zinc-500'
          }`}>
            {Math.round(percentage)}% of goal
          </div>
          {isOnTrack && <span className="text-green-600">✓</span>}
        </div>
      )}
    </div>
  );
}
