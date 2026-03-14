'use client';

import { useMemo, useState, useEffect } from "react";
import { Skeleton } from "@/components/Skeleton";
import { useSession } from "next-auth/react";
import { useQuery, useApolloClient } from "@apollo/client/react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setTimeView,
  toggleShowAllNutrients,
  setEditingLog,
  setEditServingSize,
  setEditCustomServing,
  setUpdating,
} from "@/store/uiSlice";
import {
  // RTK Query: mutations + historical range query
  useGetFoodLogsQuery,
  useUpdateFoodLogMutation,
  useAddFoodLogMutation,
  useLazyGetFoodDetailQuery,
  useGetStreakQuery,
  type FoodLog,
} from "@/store/api";
import {
  // Apollo Client: today's dashboard aggregate (one round-trip for logs + goals + profile)
  DASHBOARD_QUERY,
} from "@/graphql/queries";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import Toast from "@/components/Toast";
import WeightWidget from "@/components/WeightWidget";
import WaterWidget from "@/components/WaterWidget";
import VerifyEmailBanner from "@/components/VerifyEmailBanner";

type UserGoal = {
  calories_goal: number | null;
  protein_goal: number | null;
  carbs_goal: number | null;
  fat_goal: number | null;
  target_weight?: number | null;
  target_date?: string | null;
};

type HistoricalData = {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

/** Shape returned by the GraphQL DASHBOARD_QUERY */
type DashboardQueryResult = {
  dashboard: {
    logs: Array<FoodLog & { foodName: string }>;
    summary: { calories: number; protein: number; carbs: number; fat: number; fiber: number; sodium: number };
    goals: { caloriesGoal: number | null; proteinGoal: number | null; carbsGoal: number | null; fatGoal: number | null; targetWeight?: number | null; targetDate?: string | null } | null;
    profile: { fullName: string | null; fitnessGoal: string | null } | null;
  };
};

export default function TodayPage() {
  const dispatch = useAppDispatch();
  const { status, data: sessionData } = useSession();
  const isGuest = status === 'unauthenticated';
  const { timeView, showAllNutrients, editingLog, editServingSize, editCustomServing, updating } =
    useAppSelector((s) => s.ui.dashboard);

  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(); monthAgo.setDate(monthAgo.getDate() - 30);
  const startDate =
    timeView === "week" ? weekAgo.toISOString().split("T")[0] :
    timeView === "month" ? monthAgo.toISOString().split("T")[0] : today;

  // ── GraphQL: today's logs + goals in a single request ────────────────────
  const { data: gqlData, loading: gqlLoading } = useQuery<DashboardQueryResult>(
    DASHBOARD_QUERY,
    { variables: { date: today }, fetchPolicy: "cache-and-network", skip: isGuest }
  );

  // ── RTK Query: historical range (only for week/month views) ───────────────────────
  const { data: historicalLogs = [] } = useGetFoodLogsQuery(
    { start: startDate, end: today },
    { skip: timeView === "today" || isGuest }
  );
  // Always fetch the last 7 days for Quick Add (independent of timeView)
  const { data: recentLogs = [] } = useGetFoodLogsQuery(
    { start: weekAgo.toISOString().split("T")[0], end: today },
    { skip: isGuest }
  );
  const [updateFoodLog] = useUpdateFoodLogMutation();
  const [addFoodLog]    = useAddFoodLogMutation();
  const [triggerFoodDetail, { data: foodData }] = useLazyGetFoodDetailQuery();
  const apolloClient = useApolloClient(); // used to refetch GraphQL after RTK mutations
  const { data: streakData } = useGetStreakQuery(undefined, { skip: isGuest });
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Listen for service-worker offline queue / sync events
  useEffect(() => {
    const onQueued = () => setToast({ message: "📡 You're offline — meal saved locally and will sync when you reconnect.", type: "info" });
    const onSynced = (e: Event) => {
      const count = (e as CustomEvent<{ count: number }>).detail?.count ?? 0;
      setToast({ message: `✅ ${count} offline meal${count !== 1 ? "s" : ""} synced!`, type: "success" });
    };
    window.addEventListener("sw:food-log-queued", onQueued);
    window.addEventListener("sw:offline-logs-synced", onSynced);
    return () => {
      window.removeEventListener("sw:food-log-queued", onQueued);
      window.removeEventListener("sw:offline-logs-synced", onSynced);
    };
  }, []);

  // Normalise GraphQL response → same shape the rest of the page expects
  const rawGqlLogs = gqlData?.dashboard?.logs ?? [];
  const logs: FoodLog[] = rawGqlLogs.map((l: FoodLog & { foodName?: string; fdcId?: number }) => ({
    ...l,
    food_name: l.foodName ?? (l as unknown as FoodLog).food_name,
    fdc_id:    l.fdcId    ?? (l as unknown as FoodLog).fdc_id,
  }));
  const goals: UserGoal | null = gqlData?.dashboard?.goals
    ? {
        calories_goal: gqlData.dashboard.goals.caloriesGoal,
        protein_goal:  gqlData.dashboard.goals.proteinGoal,
        carbs_goal:    gqlData.dashboard.goals.carbsGoal,
        fat_goal:      gqlData.dashboard.goals.fatGoal,
        target_weight: gqlData.dashboard.goals.targetWeight ?? null,
        target_date:   gqlData.dashboard.goals.targetDate ?? null,
      }
    : null;
  const loading = gqlLoading && !gqlData;

  // Aggregate raw historical logs by date for charting
  const historicalData: HistoricalData[] = useMemo(() => {
    if (!historicalLogs.length) return [];
    const agg = historicalLogs.reduce((acc: Record<string, HistoricalData>, item) => {
      const key = (item as FoodLog & { date?: string }).date ?? today;
      if (!acc[key]) acc[key] = { date: key, calories: 0, protein: 0, carbs: 0, fat: 0 };
      acc[key].calories += (item.calories || 0) * (item.quantity || 1);
      acc[key].protein  += (item.protein  || 0) * (item.quantity || 1);
      acc[key].carbs    += (item.carbs    || 0) * (item.quantity || 1);
      acc[key].fat      += (item.fat      || 0) * (item.quantity || 1);
      return acc;
    }, {});
    return Object.values(agg).sort((a, b) => a.date.localeCompare(b.date));
  }, [historicalLogs, today]);

  // Last 5 distinct recently-logged foods (newest first) for Quick Add chips
  const recentFoods: FoodLog[] = useMemo(() => {
    const seen = new Set<string>();
    const result: FoodLog[] = [];
    const sorted = [...recentLogs].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    for (const log of sorted) {
      const key = `${log.fdc_id}-${log.food_name}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(log);
        if (result.length === 5) break;
      }
    }
    return result;
  }, [recentLogs]);

  async function handleRemoveLog(logId: string) {
    try {
      const { getApolloClient } = await import("@/lib/apollo-client");
      const { DELETE_FOOD_LOG_MUTATION } = await import("@/graphql/queries");
      await getApolloClient().mutate({
        mutation: DELETE_FOOD_LOG_MUTATION,
        variables: { id: logId },
        refetchQueries: [{ query: DASHBOARD_QUERY, variables: { date: today } }],
      });
      setToast({ message: "Food removed", type: "success" });
    } catch {
      setToast({ message: "Failed to remove food log", type: "error" });
    }
  }

  async function handleQuickAdd(log: FoodLog) {
    const hour = new Date().getHours();
    const mealType = hour < 11 ? "BREAKFAST" : hour < 15 ? "LUNCH" : hour < 20 ? "DINNER" : "SNACK";
    try {
      await addFoodLog({ ...log, id: undefined, date: today, time: new Date().toISOString(), meal_type: mealType });
      await apolloClient.refetchQueries({ include: [DASHBOARD_QUERY] });
      setToast({ message: `${log.food_name.replace(/\s*\(\d+g\)$/, "")} added`, type: "success" });
    } catch {
      setToast({ message: "Failed to quick-add food", type: "error" });
    }
  }

  async function handleCopyYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const yesterdayLogs = recentLogs.filter(
      (log) => ((log as FoodLog & { date?: string }).date ?? "") === yesterdayStr
    );
    if (yesterdayLogs.length === 0) {
      setToast({ message: "No meals logged yesterday to copy", type: "info" });
      return;
    }
    try {
      await Promise.all(
        yesterdayLogs.map((log) =>
          addFoodLog({ ...log, id: undefined, date: today, time: new Date().toISOString() })
        )
      );
      await apolloClient.refetchQueries({ include: [DASHBOARD_QUERY] });
      setToast({ message: `Copied ${yesterdayLogs.length} meal${yesterdayLogs.length !== 1 ? "s" : ""} from yesterday`, type: "success" });
    } catch {
      setToast({ message: "Failed to copy yesterday's meals", type: "error" });
    }
  }

  function handleExportCSV() {
    const url = `/api/food-logs/export?start=${startDate}&end=${today}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = `food-log-${startDate}-to-${today}.csv`;
    a.click();
  }

  async function handleEditLog(log: FoodLog) {
    dispatch(setEditingLog(log));
    try {
      await triggerFoodDetail(log.fdc_id);
    } catch {
      setToast({ message: "Could not load food data for editing", type: "error" });
    }
  }

  function closeEditModal() {
    dispatch(setEditingLog(null));
  }

  async function handleUpdateLog() {
    if (!editingLog || !foodData) return;

    console.log("=== UPDATE STARTED ===");
    console.log("editServingSize:", editServingSize);
    console.log("editCustomServing:", editCustomServing);
    console.log("foodData.description:", foodData.description);

    dispatch(setUpdating(true));
    const multiplier = editServingSize / 100;

    function getNutrient(name: string): number {
      if (!foodData?.foodNutrients) return 0;
      const nutrient = foodData.foodNutrients.find((n: { nutrient?: { name: string }; nutrientName?: string; amount?: number; value?: number }) => 
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

    const patchRes = await updateFoodLog({
        id: editingLog.id,
        food_name: newFoodName,
        calories, protein, carbs, fat, fiber, sodium,
        saturated_fat, trans_fat, polyunsaturated_fat, monounsaturated_fat,
        cholesterol, sugars, added_sugars,
        vitamin_a, vitamin_c, vitamin_d, vitamin_e, vitamin_k,
        thiamin, riboflavin, niacin, vitamin_b6, folate, vitamin_b12,
        calcium, iron, magnesium, phosphorus, potassium, zinc, selenium,
      });

    dispatch(setUpdating(false));
    if ('error' in patchRes) {
      setToast({ message: "Failed to update log", type: "error" });
      return;
    }
    // Sync the Apollo cache with the updated data
    await apolloClient.refetchQueries({ include: [DASHBOARD_QUERY] });
    setToast({ message: "Log updated", type: "success" });
    setTimeout(() => { closeEditModal(); }, 100);
  }

  // ── Totals: use GraphQL pre-computed summary for basics; compute extended from logs ──
  const gqlSummary = gqlData?.dashboard?.summary;
  const extendedTotals = logs.reduce(
    (acc, log) => ({
      saturated_fat:       acc.saturated_fat       + (log.saturated_fat       || 0) * log.quantity,
      trans_fat:           acc.trans_fat           + (log.trans_fat           || 0) * log.quantity,
      polyunsaturated_fat: acc.polyunsaturated_fat + (log.polyunsaturated_fat || 0) * log.quantity,
      monounsaturated_fat: acc.monounsaturated_fat + (log.monounsaturated_fat || 0) * log.quantity,
      cholesterol:         acc.cholesterol         + (log.cholesterol         || 0) * log.quantity,
      sugars:              acc.sugars              + (log.sugars              || 0) * log.quantity,
      added_sugars:        acc.added_sugars        + (log.added_sugars        || 0) * log.quantity,
      vitamin_a:           acc.vitamin_a           + (log.vitamin_a           || 0) * log.quantity,
      vitamin_c:           acc.vitamin_c           + (log.vitamin_c           || 0) * log.quantity,
      vitamin_d:           acc.vitamin_d           + (log.vitamin_d           || 0) * log.quantity,
      vitamin_e:           acc.vitamin_e           + (log.vitamin_e           || 0) * log.quantity,
      vitamin_k:           acc.vitamin_k           + (log.vitamin_k           || 0) * log.quantity,
      thiamin:             acc.thiamin             + (log.thiamin             || 0) * log.quantity,
      riboflavin:          acc.riboflavin          + (log.riboflavin          || 0) * log.quantity,
      niacin:              acc.niacin              + (log.niacin              || 0) * log.quantity,
      vitamin_b6:          acc.vitamin_b6          + (log.vitamin_b6          || 0) * log.quantity,
      folate:              acc.folate              + (log.folate              || 0) * log.quantity,
      vitamin_b12:         acc.vitamin_b12         + (log.vitamin_b12         || 0) * log.quantity,
      calcium:             acc.calcium             + (log.calcium             || 0) * log.quantity,
      iron:                acc.iron                + (log.iron                || 0) * log.quantity,
      magnesium:           acc.magnesium           + (log.magnesium           || 0) * log.quantity,
      phosphorus:          acc.phosphorus          + (log.phosphorus          || 0) * log.quantity,
      potassium:           acc.potassium           + (log.potassium           || 0) * log.quantity,
      zinc:                acc.zinc                + (log.zinc                || 0) * log.quantity,
      selenium:            acc.selenium            + (log.selenium            || 0) * log.quantity,
    }),
    {
      saturated_fat: 0, trans_fat: 0, polyunsaturated_fat: 0, monounsaturated_fat: 0,
      cholesterol: 0, sugars: 0, added_sugars: 0,
      vitamin_a: 0, vitamin_c: 0, vitamin_d: 0, vitamin_e: 0, vitamin_k: 0,
      thiamin: 0, riboflavin: 0, niacin: 0, vitamin_b6: 0, folate: 0, vitamin_b12: 0,
      calcium: 0, iron: 0, magnesium: 0, phosphorus: 0, potassium: 0, zinc: 0, selenium: 0,
    }
  );

  // Merge GraphQL summary (server-aggregated) + client-computed extended nutrients
  const totals = {
    calories: gqlSummary?.calories ?? 0,
    protein:  gqlSummary?.protein  ?? 0,
    carbs:    gqlSummary?.carbs    ?? 0,
    fat:      gqlSummary?.fat      ?? 0,
    fiber:    gqlSummary?.fiber    ?? 0,
    sodium:   gqlSummary?.sodium   ?? 0,
    ...extendedTotals,
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-8 space-y-6">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-5">
              <Skeleton className="h-3 w-16 mb-3" />
              <Skeleton className="h-7 w-20" />
            </div>
          ))}
        </div>
        {/* Meals skeleton */}
        <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-5 space-y-4">
          <Skeleton className="h-4 w-32" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-zinc-100 dark:border-zinc-800 p-4">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-40" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-3.5 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      {isGuest && (
        <div className="mb-6 rounded-2xl border border-[#4169E1]/30 bg-[#4169E1]/5 dark:bg-blue-950/30 p-6 text-center">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            📈 This is a live preview of the NutriTracker dashboard.
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Sign up to track your meals, set goals, and see your progress here.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <a
              href="/signup"
              className="rounded-full bg-[#4169E1] px-5 py-2 text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
            >
              Get started — it&apos;s free
            </a>
            <a
              href="/login"
              className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Sign in
            </a>
          </div>
        </div>
      )}
      {/* Daily Summary Card — only meaningful in today view */}
      {/* Onboarding banner — shown to new users who haven't set up a profile */}
      {!isGuest && !loading && !gqlData?.dashboard?.profile?.fitnessGoal && (
        <OnboardingBanner />
      )}
      {/* Email verification banner — shown until user verifies */}
      {!isGuest && sessionData?.user && !sessionData.user.emailVerified && (
        <VerifyEmailBanner />
      )}
      {/* Tip of the Day — today only, above summary card */}
      {timeView === 'today' && !isGuest && (
        <div className="mb-6">
          <TipOfTheDay totals={totals} />
        </div>
      )}

      {timeView === 'today' && !isGuest && (
        <div className="mb-6 grid gap-4 lg:grid-cols-[3fr_1fr_1fr] lg:items-stretch">
          <DailySummaryCard totals={totals} goals={goals} logCount={logs.length} />
          <WeightWidget />
          <WaterWidget />
        </div>
      )}

      {timeView === 'today' && !isGuest && logs.length > 0 && (
        <NutrientDeficiencyAlerts totals={totals} logCount={logs.length} />
      )}

      {timeView === 'today' && !isGuest && goals?.target_weight && (
        <GoalProgressWidget goals={goals} />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Progress</h1>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-400" suppressHydrationWarning>
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
            {streakData && streakData.streak > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-600 dark:bg-orange-950/30 dark:text-orange-400">
                🔥 {streakData.streak} day{streakData.streak !== 1 ? "s" : ""}
                {streakData.longestStreak > streakData.streak && (
                  <span className="ml-1 font-normal text-orange-400 dark:text-orange-500">(best {streakData.longestStreak})</span>
                )}
              </span>
            )}
            {(() => {
              const MILESTONES = [
                { days: 100, icon: "🏆", label: "Century" },
                { days: 60,  icon: "💎", label: "Diamond" },
                { days: 30,  icon: "🥇", label: "Gold" },
                { days: 14,  icon: "🥈", label: "Silver" },
                { days: 7,   icon: "🥉", label: "Bronze" },
              ];
              const milestone = MILESTONES.find((m) => (streakData?.streak ?? 0) >= m.days);
              if (!milestone) return null;
              return (
                <span
                  title={`${milestone.label} milestone — ${milestone.days}+ day streak!`}
                  className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
                >
                  {milestone.icon} {milestone.label}
                </span>
              );
            })()}
          </div>
        </div>
        
        {/* Time View Toggle */}
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
          <button
            onClick={() => dispatch(setTimeView('today'))}
            data-active={timeView === 'today'}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              timeView === 'today'
                ? 'bg-[#4169E1] text-white dark:bg-blue-900 dark:text-white'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-blue-950/60'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => dispatch(setTimeView('week'))}
            data-active={timeView === 'week'}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              timeView === 'week'
                ? 'bg-[#4169E1] text-white dark:bg-blue-900 dark:text-white'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-blue-950/60'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => dispatch(setTimeView('month'))}
            data-active={timeView === 'month'}
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

          {goals?.calories_goal && (
            <div className="mt-4">
              <DeficitSurplusChart data={historicalData} goal={goals.calories_goal} />
            </div>
          )}

          {/* Week-over-week comparison — shown in week view */}
          {timeView === 'week' && !isGuest && (
            <div className="mt-4">
              <WeekComparisonWidget />
            </div>
          )}

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

      {/* Weight trend — shown in week/month view as full-width standalone card */}
      {timeView !== 'today' && !isGuest && (
        <div className="mt-4">
          <WeightWidget />
        </div>
      )}

      {/* Main Macros */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="Calories" value={Math.round(totals.calories)} goal={goals?.calories_goal} />
        <StatCard label="Protein"  value={Math.round(totals.protein)}  goal={goals?.protein_goal}  unit="g" />
        <StatCard label="Carbs"    value={Math.round(totals.carbs)}    goal={goals?.carbs_goal}    unit="g" />
        <StatCard label="Fat"      value={Math.round(totals.fat)}      goal={goals?.fat_goal}      unit="g" />
      </div>

      {/* Micronutrient snapshot — today only */}
      {timeView === 'today' && !isGuest && (
        <NutrientMiniWidget totals={totals} />
      )}

      {/* Meal Breakdown — today only, needs at least one log */}
      {timeView === 'today' && logs.length > 0 && (
        <>
          <MealPieChart logs={logs} />
          <MealMacroChart logs={logs} />
        </>
      )}

      {/* Additional Nutrients Section */}
      <div className="mt-6 rounded-2xl border border-zinc-200/70 p-5 dark:border-blue-950/70 bg-white dark:bg-zinc-900">
        <button
          onClick={() => dispatch(toggleShowAllNutrients())}
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
        {/* Quick Add recents — today only */}
        {timeView === 'today' && !isGuest && recentFoods.length > 0 && (
          <QuickAddRecents foods={recentFoods} onAdd={handleQuickAdd} />
        )}

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Today&apos;s Meals</h2>
          <div className="flex items-center gap-2">
            {timeView === 'today' && !isGuest && (
              <button
                onClick={handleCopyYesterday}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-zinc-300 px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                title="Copy all meals from yesterday to today"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Yesterday
              </button>
            )}
            {!isGuest && logs.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-zinc-300 px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                title="Download food log as CSV"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            )}
            <a
              href="/app/search"
              className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
            >
              + Add Food
            </a>
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200/70 p-10 text-center dark:border-blue-950/70 bg-white dark:bg-zinc-900">
            <div className="text-4xl mb-3">🍽️</div>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Nothing logged today yet</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Search for a food to start tracking your nutrition</p>
            <a
              href="/app/search"
              className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-full bg-[#4169E1] px-5 text-sm font-medium text-white hover:bg-[#3558c4] dark:bg-[#87CEEB] dark:text-black"
            >
              + Search Foods
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {(["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const).map((meal) => {
              const mealLogs = logs.filter((l) => (l.meal_type ?? "SNACK") === meal);
              if (mealLogs.length === 0) return null;

              const mealMeta: Record<string, { label: string; emoji: string; color: string }> = {
                BREAKFAST: { label: "Breakfast", emoji: "🌅", color: "text-amber-600 dark:text-amber-400" },
                LUNCH:     { label: "Lunch",     emoji: "☀️",  color: "text-blue-600 dark:text-blue-400" },
                DINNER:    { label: "Dinner",    emoji: "🌙", color: "text-indigo-600 dark:text-indigo-400" },
                SNACK:     { label: "Snack",     emoji: "🍎", color: "text-emerald-600 dark:text-emerald-400" },
              };
              const { label, emoji, color } = mealMeta[meal];
              const mealCals = mealLogs.reduce((s, l) => s + (l.calories || 0) * l.quantity, 0);

              return (
                <div key={meal}>
                  {/* Section header */}
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className={`flex items-center gap-1.5 text-sm font-semibold ${color}`}>
                      <span>{emoji}</span> {label}
                    </h3>
                    <span className="text-xs text-zinc-400">{Math.round(mealCals)} kcal</span>
                  </div>

                  <div className="grid gap-2">
                    {mealLogs.map((log) => (
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
                </div>
              );
            })}
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
                      dispatch(setEditServingSize(size.grams));
                      dispatch(setEditCustomServing(""));
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
                  dispatch(setEditCustomServing(e.target.value));
                  if (e.target.value) dispatch(setEditServingSize(parseInt(e.target.value) || 100));
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

      {/* Toast notifications */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onCloseAction={() => setToast(null)} />
      )}
    </div>
  );
}

// ─── Tips data ───────────────────────────────────────────────────────────────

const TIPS: { nutrients: string[]; tip: string }[] = [
  { nutrients: ["iron"],       tip: "Low on iron? Pair spinach or lentils with vitamin C (lemon juice, bell pepper) to boost absorption by up to 3×." },
  { nutrients: ["iron"],       tip: "Cast-iron skillets can add meaningful iron to acidic dishes like tomato sauce — a simple passive boost." },
  { nutrients: ["vitamin_d"],  tip: "Vitamin D deficiency is linked to fatigue and low mood. Fatty fish like salmon is one of the best dietary sources." },
  { nutrients: ["vitamin_d"],  tip: "UV-treated mushrooms can generate meaningful vitamin D. Look for 'sun-exposed' on the label." },
  { nutrients: ["calcium"],    tip: "Calcium needs vitamin D to absorb properly. Track both together if you're focused on bone health." },
  { nutrients: ["calcium"],    tip: "Sardines (with bones), kale, and almonds are strong non-dairy calcium sources worth adding to your rotation." },
  { nutrients: ["protein"],    tip: "Spreading protein across meals ('protein distribution') improves muscle synthesis more than loading it all at dinner." },
  { nutrients: ["protein"],    tip: "Greek yogurt packs roughly twice the protein of regular yogurt with the same gut-friendly probiotics." },
  { nutrients: ["fiber"],      tip: "Aim for variety: soluble fiber (oats, beans) feeds gut bacteria; insoluble fiber (wheat bran, vegetables) aids transit." },
  { nutrients: ["fiber"],      tip: "A half-cup of cooked lentils delivers ~8 g fiber and ~9 g protein — one of the best satiety combinations per calorie." },
  { nutrients: ["potassium"],  tip: "Potassium offsets the blood-pressure effect of sodium. Avocados, bananas, beet greens, and white beans are top sources." },
  { nutrients: ["potassium"],  tip: "Most people get less than half the recommended potassium daily. Tomato paste is a concentrated, easy-to-add source." },
  { nutrients: ["magnesium"],  tip: "Magnesium supports 300+ enzymatic reactions. Dark chocolate (70%+), pumpkin seeds, and spinach are rich sources." },
  { nutrients: ["magnesium"],  tip: "Stress and alcohol both deplete magnesium faster. If either applies, prioritising magnesium intake is especially worth it." },
  { nutrients: ["vitamin_c"],  tip: "Bell peppers actually contain more vitamin C than oranges — and they survive light cooking better than many other sources." },
  { nutrients: ["vitamin_c"],  tip: "Boiling destroys most vitamin C. Raw or lightly steamed vegetables preserve significantly more than fully cooked ones." },
  { nutrients: ["vitamin_b12"], tip: "B12 is only found reliably in animal products and fortified foods. Eggs, meat, and dairy are the primary dietary sources." },
  { nutrients: ["vitamin_b12"], tip: "Low B12 can cause fatigue and neurological symptoms long before a clinical deficiency appears on blood panels." },
  { nutrients: ["folate"],     tip: "Folate and B12 work together in DNA synthesis. Dark leafy greens, beans, and fortified cereals are the best sources." },
  { nutrients: ["zinc"],       tip: "Zinc is critical for immune function and wound healing. Oysters have more zinc per serving than any other food." },
  { nutrients: ["zinc"],       tip: "Plant-based eaters need ~50% more zinc than the RDA because phytates in grains reduce its absorption." },
  { nutrients: ["selenium"],   tip: "Just 1–2 Brazil nuts can meet your daily selenium requirement. More than 4 regularly risks toxicity." },
  { nutrients: ["vitamin_k"],  tip: "Vitamin K activates clotting proteins and supports bone mineralisation. Dark leafy greens are by far the richest source." },
  { nutrients: ["vitamin_e"],  tip: "Vitamin E is a fat-soluble antioxidant. Sunflower seeds, almonds, and avocado provide it alongside healthy fats." },
  { nutrients: ["vitamin_a"],  tip: "Beta-carotene in orange and yellow vegetables converts to vitamin A more effectively when eaten with some fat." },
  { nutrients: [],             tip: "Logging consistently — even on 'bad' days — gives you better data to learn from than only tracking your best days." },
  { nutrients: [],             tip: "Hydration affects hunger signals. Drinking water before a meal can reduce unintended overconsumption by 10–15%." },
  { nutrients: [],             tip: "Sleep deprivation raises ghrelin (hunger hormone) and lowers leptin (satiety hormone). Consistent sleep supports weight goals." },
  { nutrients: [],             tip: "Total daily intake of calories and nutrients drives outcomes far more than specific meal timing windows." },
  { nutrients: [],             tip: "Eating slowly and chewing more thoroughly gives your gut-brain satiety signal (~20 min lag) time to kick in before you overeat." },
  { nutrients: [],             tip: "Protein is the most satiating macronutrient per calorie. Prioritising it at breakfast can reduce total intake for the day." },
  { nutrients: [],             tip: "A food log isn't just about restriction — it's a mirror. Patterns you've never noticed become visible within a week of consistent tracking." },
  { nutrients: [],             tip: "Whole foods are typically more satiating than processed ones with the same calorie count, due to fiber, water content, and chewing time." },
  { nutrients: [],             tip: "Colour variety in vegetables generally correlates with nutrient diversity. Aim for 3+ distinct colours per day." },
  { nutrients: [],             tip: "Fermented foods (yogurt, kimchi, kefir) support gut microbiome diversity, which influences nutrient absorption and immunity." },
  { nutrients: [],             tip: "Omega-3 fatty acids from fatty fish, walnuts, and flaxseed are consistently linked to reduced cardiovascular inflammation." },
  { nutrients: [],             tip: "A 20-minute walk after a high-carb meal meaningfully blunts the post-meal glucose spike compared to sitting." },
  { nutrients: [],             tip: "Consistency over weeks matters more than perfection on any single day. A rough day doesn't erase a strong week." },
  { nutrients: [],             tip: "Ultra-processed foods often have high calorie density per unit weight — tracking them precisely tends to surface surprising totals." },
  { nutrients: [],             tip: "Meal prepping even two or three consistent meals a week reduces decision fatigue and unplanned high-calorie choices." },
];

// ─── QuickAddRecents ──────────────────────────────────────────────────────────

function QuickAddRecents({ foods, onAdd }: { foods: FoodLog[]; onAdd: (log: FoodLog) => void }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Quick Add</p>
      <div className="flex flex-wrap gap-2">
        {foods.map((log) => {
          const name = log.food_name.replace(/\s*\(\d+g\)$/, "");
          const kcal = Math.round((log.calories || 0) * log.quantity);
          return (
            <button
              key={log.id}
              onClick={() => onAdd(log)}
              className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:border-[#4169E1]/40 hover:bg-[#4169E1]/5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[#87CEEB]/40 dark:hover:bg-[#87CEEB]/5"
            >
              <span className="max-w-32.5 truncate">{name}</span>
              <span className="shrink-0 text-zinc-400">{kcal} kcal</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── TipOfTheDay ──────────────────────────────────────────────────────────────

type TipTotals = {
  iron: number; vitamin_d: number; calcium: number; protein: number; fiber: number;
  potassium: number; magnesium: number; vitamin_c: number; vitamin_b12: number;
  folate: number; zinc: number; selenium: number; vitamin_k: number;
  vitamin_e: number; vitamin_a: number;
};

function TipOfTheDay({ totals }: { totals: TipTotals & Record<string, number> }) {
  const RDAS: Record<string, number> = {
    iron: 8, vitamin_d: 20, calcium: 1000, protein: 50, fiber: 28,
    potassium: 3400, magnesium: 420, vitamin_c: 90, vitamin_b12: 2.4,
    folate: 400, zinc: 11, selenium: 55, vitamin_k: 120, vitamin_e: 15, vitamin_a: 900,
  };

  const low = Object.entries(RDAS)
    .filter(([k, rda]) => (totals[k] ?? 0) < rda * 0.5)
    .map(([k]) => k);

  const relevant = TIPS.filter(
    (t) => t.nutrients.length === 0 || t.nutrients.some((n) => low.includes(n))
  );
  const pool = relevant.length > 0 ? relevant : TIPS;

  // Deterministic pick: same tip all day, rotates daily
  const dayOfYear = useMemo(() => Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000 // eslint-disable-line react-hooks/purity
  ), []);
  const tip = pool[dayOfYear % pool.length];

  const taggedNutrient = tip.nutrients[0];
  const isPersonalised = taggedNutrient && low.includes(taggedNutrient);

  return (
    <div className="mt-6 rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-blue-950/70 dark:bg-zinc-900">
      <div className="flex items-start gap-3">
        <span className="text-xl leading-none">💡</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {isPersonalised
              ? `Low on ${taggedNutrient.replace(/_/g, " ")} · Tip of the Day`
              : "Tip of the Day"}
          </p>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{tip.tip}</p>
        </div>
      </div>
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
  // Icon and color by nutrient
  let icon = null;
  let color = 'bg-zinc-400';
  let barColor = color;
  let labelType = 'none';
  if (label.toLowerCase().includes('saturated')) {
    icon = '🥩'; color = 'bg-orange-100 dark:bg-orange-900'; barColor = 'bg-orange-400'; labelType = 'limit';
  } else if (label.toLowerCase().includes('trans')) {
    icon = '🍟'; color = 'bg-pink-100 dark:bg-pink-900'; barColor = 'bg-pink-500'; labelType = 'limit';
  } else if (label.toLowerCase().includes('poly')) {
    icon = '🌻'; color = 'bg-yellow-100 dark:bg-yellow-900'; barColor = 'bg-yellow-400';
  } else if (label.toLowerCase().includes('mono')) {
    icon = '🥑'; color = 'bg-green-100 dark:bg-green-900'; barColor = 'bg-green-500';
  } else if (label.toLowerCase().includes('sugar')) {
    icon = '🍬'; color = 'bg-pink-50 dark:bg-pink-950'; barColor = 'bg-pink-400';
    if (label.toLowerCase().includes('added')) labelType = 'limit';
  } else if (label.toLowerCase().includes('cholesterol')) {
    icon = '🩸'; color = 'bg-rose-100 dark:bg-rose-900'; barColor = 'bg-rose-500'; labelType = 'limit';
  }
  return (
    <div className={`rounded-lg p-3 ${color} dark:bg-opacity-60`}>
      <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
        {icon && <span className="text-lg">{icon}</span>}
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold">
        {Math.round(value * 10) / 10}{unit}
      </div>
      <div className="mt-2 text-xs text-zinc-500">
        {goal ? (
          <>
            {labelType === 'limit' || limit ? 'Limit: ' : 'Goal: '}{goal}{unit}
            {isOverLimit && <span className="ml-1 font-bold text-red-600 dark:text-red-400">Over!</span>}
          </>
        ) : (
          <span className="italic text-red-600 dark:text-red-400">Limit: 0 (avoid if possible)</span>
        )}
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className={`h-full transition-all ${isOverLimit ? 'bg-red-500' : barColor}`}
          style={{ width: `${goal ? Math.min(percentage, 100) : 100}%` }}
        />
      </div>
    </div>
  );
}

function MealPieChart({ logs }: { logs: FoodLog[] }) {
  const MEALS = [
    { key: 'BREAKFAST', label: 'Breakfast', color: '#f59e0b' },
    { key: 'LUNCH',     label: 'Lunch',     color: '#4169E1' },
    { key: 'DINNER',    label: 'Dinner',    color: '#6366f1' },
    { key: 'SNACK',     label: 'Snack',     color: '#22c55e' },
  ];

  const data = MEALS.map(({ key, label, color }) => ({
    name: label,
    color,
    value: Math.round(
      logs
        .filter((l) => (l.meal_type ?? 'SNACK') === key)
        .reduce((s, l) => s + (l.calories || 0) * l.quantity, 0)
    ),
  })).filter((d) => d.value > 0);

  if (data.length === 0) return null;

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="mt-6 rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-blue-950/70 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold">Meal Breakdown</h3>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <PieChart width={180} height={180}>
          <Pie
            data={data}
            cx={85} cy={85}
            innerRadius={52} outerRadius={80}
            dataKey="value"
            strokeWidth={2}
            stroke="transparent"
            isAnimationActive
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val) => [`${val} kcal`, '']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
        </PieChart>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{d.name}</span>
              <span className="text-xs font-semibold tabular-nums">{d.value} kcal</span>
              <span className="text-xs text-zinc-400">({Math.round((d.value / total) * 100)}%)</span>
            </div>
          ))}
        </div>
      </div>
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
  const formatted = data.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold">{label}</h4>
        {goal && <div className="text-xs text-zinc-500">Goal: {goal}</div>}
      </div>
      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={formatted} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(val) => [typeof val === 'number' ? Math.round(val) : val, label]}
          />
          {goal && (
            <ReferenceLine
              y={goal}
              stroke="#9ca3af"
              strokeDasharray="4 4"
              label={{ value: 'Goal', position: 'insideTopRight', fontSize: 10, fill: '#9ca3af' }}
            />
          )}
          <Line
            type="monotone"
            dataKey={metric}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── NutrientMiniWidget ──────────────────────────────────────────────────────
const MICRO_ITEMS = [
  { key: "fiber",     label: "Fiber",     unit: "g",  rdi: 28   },
  { key: "vitamin_c", label: "Vitamin C", unit: "mg", rdi: 90   },
  { key: "vitamin_d", label: "Vitamin D", unit: "µg", rdi: 20   },
  { key: "calcium",   label: "Calcium",   unit: "mg", rdi: 1000 },
  { key: "iron",      label: "Iron",      unit: "mg", rdi: 18   },
  { key: "potassium", label: "Potassium", unit: "mg", rdi: 4700 },
];

function NutrientMiniWidget({ totals }: { totals: Record<string, number> }) {
  return (
    <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-blue-950/70 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Micronutrient Snapshot</h3>
        <a
          href="/app/nutrients"
          className="flex items-center gap-1 text-xs font-medium text-[#4169E1] hover:underline dark:text-[#87CEEB]"
        >
          Full breakdown
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MICRO_ITEMS.map(({ key, label, unit, rdi }) => {
          const val = totals[key] ?? 0;
          const pct = rdi > 0 ? Math.min(100, Math.round((val / rdi) * 100)) : 0;
          const barColor =
            pct >= 80 ? "bg-green-500" :
            pct >= 50 ? "bg-yellow-400" :
            pct > 0   ? "bg-red-400" :
            "bg-zinc-200 dark:bg-zinc-700";
          const textColor =
            pct >= 80 ? "text-green-700 dark:text-green-400" :
            pct >= 50 ? "text-yellow-700 dark:text-yellow-400" :
            pct > 0   ? "text-red-600 dark:text-red-400" :
            "text-zinc-400 dark:text-zinc-500";
          const display = val < 1 ? val.toFixed(1) : val < 10 ? val.toFixed(1) : String(Math.round(val));
          return (
            <div key={key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
                <span className={`font-semibold tabular-nums ${textColor}`}>{display}{unit} <span className="font-normal text-zinc-400">/ {rdi}{unit}</span></span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
              </div>
              <p className={`mt-0.5 text-[10px] ${textColor}`}>{pct}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DailySummaryCard({
  totals,
  goals,
  logCount,
}: {
  totals: { calories: number; protein: number; carbs: number; fat: number; fiber: number; sodium: number };
  goals: UserGoal | null;
  logCount: number;
}) {
  const calGoal = goals?.calories_goal ?? 0;
  const calRemaining = calGoal > 0 ? Math.max(0, calGoal - Math.round(totals.calories)) : null;
  const calOver = calGoal > 0 && totals.calories > calGoal;

  // Data-driven insight: find the macro closest to goal without going over
  const macros = [
    { name: "Protein",  value: totals.protein, goal: goals?.protein_goal },
    { name: "Carbs",    value: totals.carbs,   goal: goals?.carbs_goal },
    { name: "Fat",      value: totals.fat,     goal: goals?.fat_goal },
    { name: "Fiber",    value: totals.fiber,   goal: 28 },
  ];
  const withPct = macros
    .filter((m) => m.goal && m.goal > 0 && m.value > 0)
    .map((m) => ({ ...m, pct: Math.round((m.value / m.goal!) * 100) }));
  const best = withPct.filter((m) => m.pct <= 100).sort((a, b) => b.pct - a.pct)[0] ?? null;
  const over  = withPct.filter((m) => m.pct > 100);

  let insight = "Start logging to see your progress today.";
  if (logCount === 0) {
    insight = "No meals logged yet: add your first food to get started.";
  } else if (calOver) {
    insight = `You've gone over your calorie goal today by ${Math.round(totals.calories - calGoal)} kcal.`;
  } else if (over.length > 0) {
    insight = `${over.map((m) => m.name).join(" & ")} ${over.length === 1 ? "is" : "are"} over the daily goal.`;
  } else if (best) {
    insight = `Best macro today: ${best.name} at ${best.pct}% of goal.`;
  } else if (calGoal > 0 && calRemaining !== null) {
    insight = `${calRemaining} kcal remaining — you're on track.`;
  }

  // Progress colour
  const calPct = calGoal > 0 ? Math.min(100, (totals.calories / calGoal) * 100) : 0;
  const barColor =
    calOver ? "bg-red-500" :
    calPct >= 80 ? "bg-amber-400" :
    "bg-emerald-500";

  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-blue-950/70 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Calories remaining */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {calOver ? "Calories over goal" : calGoal > 0 ? "Calories remaining" : "Calories logged"}
          </p>
          <p className={`mt-1 text-4xl font-bold tabular-nums ${
            calOver ? "text-red-500" : "text-zinc-900 dark:text-zinc-50"
          }`}>
            {calGoal > 0
              ? `${calOver ? "+" : ""}${Math.abs(calGoal - Math.round(totals.calories))}`
              : Math.round(totals.calories)}
            <span className="ml-1 text-base font-normal text-zinc-500">kcal</span>
          </p>
          {calGoal > 0 && (
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {Math.round(totals.calories)} consumed · {calGoal} goal
            </p>
          )}
        </div>

        {/* Insight */}
        <div className="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800 sm:max-w-xs">
          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{insight}</p>
        </div>
      </div>

      {/* Calorie progress bar */}
      {calGoal > 0 && (
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className={`h-full rounded-full transition-all ${barColor}`}
              style={{ width: `${calPct}%`, minWidth: calPct > 0 ? "4px" : undefined }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-zinc-400">
            <span>0</span>
            <span className={calPct >= 80 && !calOver ? "font-medium text-amber-500" : calOver ? "font-medium text-red-500" : ""}>
              {Math.round(calPct)}%
            </span>
            <span>{calGoal}</span>
          </div>
        </div>
      )}
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
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {value} / {goal} {unit}
          </div>
        </div>
      )}
      {/* Progress Bar - always visible, even at 0% */}
      {goal && (
        <div className="mt-3">
          <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className={`h-2 rounded-full transition-all ${
                percentage > 100
                  ? "bg-red-500 dark:bg-red-400"
                  : percentage >= 80
                  ? "bg-amber-400 dark:bg-amber-300"
                  : "bg-emerald-500 dark:bg-emerald-400"
              }`}
              style={{ width: `${Math.min(100, percentage)}%`, minWidth: percentage === 0 ? '8px' : undefined }}
            />
          </div>
          <div className={`mt-1 text-xs transition-colors ${
            percentage > 100
              ? "font-medium text-red-500 dark:text-red-400"
              : percentage >= 80
              ? "font-medium text-amber-500 dark:text-amber-400"
              : "text-zinc-500 dark:text-zinc-400"
          }`}>{Math.round(percentage)}% of goal</div>
        </div>
      )}
    </div>
  );
}

// ─── OnboardingBanner ────────────────────────────────────────────────────────

const ONBOARDING_STEPS = [
  { num: 1, href: "/profile-setup", label: "Set up your profile & nutrition goals" },
  { num: 2, href: "/app/search",    label: "Search and log your first meal" },
  { num: 3, href: "/app/grocery",   label: "Generate a personalised meal plan" },
  { num: 4, href: "/app/measurements", label: "Log your starting body measurements" },
];

function OnboardingBanner() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("onboarding_dismissed") === "1";
  });
  if (dismissed) return null;

  return (
    <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/40 dark:bg-blue-950/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-blue-900 dark:text-blue-200">Welcome to NutriTracker! 👋</h2>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            Complete a few steps to personalise your experience:
          </p>
        </div>
        <button
          onClick={() => { localStorage.setItem("onboarding_dismissed", "1"); setDismissed(true); }}
          className="shrink-0 text-blue-400 hover:text-blue-600 dark:hover:text-blue-200"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
      <ol className="mt-4 space-y-2">
        {ONBOARDING_STEPS.map(({ num, href, label }) => (
          <li key={num}>
            <a
              href={href}
              className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-medium text-blue-800 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800/40 dark:bg-zinc-900 dark:text-blue-300 dark:hover:border-blue-600"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white dark:bg-blue-500">
                {num}
              </span>
              {label}
              <span className="ml-auto text-blue-400">→</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── GoalProgressWidget ──────────────────────────────────────────────────────

function GoalProgressWidget({ goals }: { goals: UserGoal }) {
  const targetWeight = goals.target_weight;
  const targetDate   = goals.target_date;

  const daysLeft = useMemo(() => {
    if (!targetDate) return null;
    const diff = new Date(targetDate).getTime() - Date.now();
    return Math.ceil(diff / 86_400_000);
  }, [targetDate]);

  if (!targetWeight) return null;

  return (
    <div className="mb-6 rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-blue-950/70 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">🎯 Goal</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-sm font-medium dark:bg-zinc-800">
            {targetWeight} lbs target weight
          </span>
        </div>
        {daysLeft !== null && (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
            daysLeft < 0
              ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
              : daysLeft <= 14
              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
          }`}>
            {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : daysLeft === 0 ? "Target day!" : `${daysLeft} days left`}
          </span>
        )}
        <a href="/profile-setup" className="ml-auto text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 underline">
          Edit goal
        </a>
      </div>
    </div>
  );
}

// ─── NutrientDeficiencyAlerts ─────────────────────────────────────────────────

const DEFICIENCY_CHECKS = [
  { key: "vitamin_d",   label: "Vitamin D",   rdi: 20,   unit: "µg", food: "salmon, eggs, fortified milk" },
  { key: "iron",        label: "Iron",         rdi: 18,   unit: "mg", food: "lean meat, lentils, spinach" },
  { key: "calcium",     label: "Calcium",      rdi: 1000, unit: "mg", food: "dairy, kale, almonds" },
  { key: "potassium",   label: "Potassium",    rdi: 4700, unit: "mg", food: "banana, sweet potato, avocado" },
  { key: "magnesium",   label: "Magnesium",    rdi: 420,  unit: "mg", food: "pumpkin seeds, dark chocolate, spinach" },
  { key: "vitamin_b12", label: "Vitamin B12",  rdi: 2.4,  unit: "µg", food: "meat, fish, dairy, fortified foods" },
  { key: "zinc",        label: "Zinc",         rdi: 11,   unit: "mg", food: "oysters, beef, pumpkin seeds" },
  { key: "fiber",       label: "Fiber",        rdi: 28,   unit: "g",  food: "oats, beans, fruits, vegetables" },
  { key: "vitamin_c",   label: "Vitamin C",    rdi: 90,   unit: "mg", food: "bell peppers, citrus, broccoli" },
];

function NutrientDeficiencyAlerts({
  totals,
  logCount,
}: {
  totals: Record<string, number>;
  logCount: number;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || logCount === 0) return null;

  const deficient = DEFICIENCY_CHECKS.filter(({ key, rdi }) => (totals[key] ?? 0) < rdi * 0.3);
  if (deficient.length < 2) return null;

  const shown = deficient.slice(0, 4);

  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            Low on {deficient.length} nutrient{deficient.length !== 1 ? "s" : ""} today
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded p-0.5 text-amber-500 hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-900/40 dark:hover:text-amber-300"
          title="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {shown.map(({ key, label, rdi, unit, food }) => {
          const val = totals[key] ?? 0;
          const pct = Math.round((val / rdi) * 100);
          return (
            <div key={key} className="flex items-start gap-2 rounded-lg bg-white/60 px-3 py-2 dark:bg-zinc-900/40">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">{label}</span>
                  <span className="text-xs tabular-nums text-amber-600 dark:text-amber-400">{pct}% of RDI</span>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  Try: <span className="italic">{food}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {deficient.length > 4 && (
        <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
          +{deficient.length - 4} more low nutrients —{" "}
          <a href="/app/nutrients" className="underline hover:text-amber-800 dark:hover:text-amber-200">
            see full breakdown
          </a>
        </p>
      )}
    </div>
  );
}

// ─── WeekComparisonWidget ────────────────────────────────────────────────────

type WeekAvg = { calories: number; protein: number; carbs: number; fat: number; days: number };

function WeekComparisonWidget() {
  const [data, setData] = useState<{ thisWeek: WeekAvg; lastWeek: WeekAvg } | null>(null);

  useEffect(() => {
    const today  = new Date();
    const d = (offset: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() - offset);
      return d.toISOString().split("T")[0];
    };
    const thisStart = d(6);
    const lastStart = d(13);
    const lastEnd   = d(7);

    async function fetchRange(start: string, end: string): Promise<WeekAvg> {
      const res  = await fetch(`/api/food-logs?start=${start}&end=${end}`);
      const json = await res.json();
      const logs: Array<{ calories: number; protein: number; carbs: number; fat: number; quantity: number; date: string }> = json.logs ?? [];
      const byDate: Record<string, { cal: number; pro: number; car: number; fat: number }> = {};
      for (const l of logs) {
        const q = l.quantity || 1;
        if (!byDate[l.date]) byDate[l.date] = { cal:0, pro:0, car:0, fat:0 };
        byDate[l.date].cal += (l.calories || 0) * q;
        byDate[l.date].pro += (l.protein  || 0) * q;
        byDate[l.date].car += (l.carbs    || 0) * q;
        byDate[l.date].fat += (l.fat      || 0) * q;
      }
      const days = Object.values(byDate);
      if (!days.length) return { calories: 0, protein: 0, carbs: 0, fat: 0, days: 0 };
      const n = days.length;
      return {
        calories: Math.round(days.reduce((s, d) => s + d.cal, 0) / n),
        protein:  Math.round(days.reduce((s, d) => s + d.pro, 0) / n),
        carbs:    Math.round(days.reduce((s, d) => s + d.car, 0) / n),
        fat:      Math.round(days.reduce((s, d) => s + d.fat, 0) / n),
        days:     n,
      };
    }

    Promise.all([
      fetchRange(thisStart, d(0)),
      fetchRange(lastStart, lastEnd),
    ]).then(([thisWeek, lastWeek]) => setData({ thisWeek, lastWeek }));
  }, []);

  if (!data) return null;
  if (data.thisWeek.days === 0 && data.lastWeek.days === 0) return null;

  const metrics: { key: keyof WeekAvg; label: string; unit: string }[] = [
    { key: "calories", label: "Avg Calories", unit: "kcal" },
    { key: "protein",  label: "Avg Protein",  unit: "g" },
    { key: "carbs",    label: "Avg Carbs",    unit: "g" },
    { key: "fat",      label: "Avg Fat",      unit: "g" },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-blue-950/70 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold">📊 This Week vs Last Week</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map(({ key, label, unit }) => {
          const thisVal = data.thisWeek[key] as number;
          const lastVal = data.lastWeek[key] as number;
          const delta   = lastVal > 0 ? Math.round(((thisVal - lastVal) / lastVal) * 100) : null;
          return (
            <div key={key} className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">{label}</p>
              <p className="text-lg font-semibold">{thisVal}<span className="ml-0.5 text-xs font-normal">{unit}</span></p>
              {delta !== null && (
                <span className={`mt-0.5 inline-block text-xs font-medium ${
                  delta > 0 ? "text-red-500" : delta < 0 ? "text-emerald-500" : "text-zinc-400"
                }`}>
                  {delta > 0 ? "+" : ""}{delta}% vs last wk
                </span>
              )}
              <p className="text-xs text-zinc-400">Last: {lastVal}{unit}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DeficitSurplusChart ──────────────────────────────────────────────────────

function DeficitSurplusChart({ data, goal }: { data: HistoricalData[]; goal: number }) {
  if (!data.length) return null;

  const chartData = data.map((d) => ({
    date: new Date(d.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    diff: Math.round(d.calories - goal),
  }));

  return (
    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold">Daily Calorie Surplus / Deficit vs. Goal</h4>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-red-400" /> Surplus
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-emerald-500" /> Deficit
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(val) => [`${Number(val) > 0 ? "+" : ""}${val} kcal`, "vs. goal"]}
          />
          <ReferenceLine y={0} stroke="#9ca3af" strokeWidth={1} />
          <Bar dataKey="diff" radius={[3, 3, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.diff > 0 ? "#f87171" : "#22c55e"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── MealMacroChart ───────────────────────────────────────────────────────────

const MEAL_COLORS = {
  protein: "#22c55e",
  carbs: "#4169E1",
  fat: "#f59e0b",
};

function MealMacroChart({ logs }: { logs: FoodLog[] }) {
  const data = (["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const)
    .map((meal) => {
      const ml = logs.filter((l) => (l.meal_type ?? "SNACK") === meal);
      return {
        name: meal.charAt(0) + meal.slice(1).toLowerCase(),
        protein: Math.round(ml.reduce((s, l) => s + (l.protein || 0) * l.quantity, 0)),
        carbs: Math.round(ml.reduce((s, l) => s + (l.carbs || 0) * l.quantity, 0)),
        fat: Math.round(ml.reduce((s, l) => s + (l.fat || 0) * l.quantity, 0)),
      };
    })
    .filter((d) => d.protein > 0 || d.carbs > 0 || d.fat > 0);

  if (data.length === 0) return null;

  return (
    <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-blue-950/70 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Macros by Meal</h3>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: MEAL_COLORS.protein }} /> Protein
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: MEAL_COLORS.carbs }} /> Carbs
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: MEAL_COLORS.fat }} /> Fat
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} unit="g" />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(val, name) => [`${val}g`, String(name).charAt(0).toUpperCase() + String(name).slice(1)]}
          />
          <Bar dataKey="protein" stackId="a" fill={MEAL_COLORS.protein} radius={[0, 0, 0, 0]} />
          <Bar dataKey="carbs"   stackId="a" fill={MEAL_COLORS.carbs}   radius={[0, 0, 0, 0]} />
          <Bar dataKey="fat"     stackId="a" fill={MEAL_COLORS.fat}     radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

