"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CalculatedNeeds = {
  bmi: string;
  bmiCategory: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  calcium: number;
  iron: number;
  vitamin_c: number;
  vitamin_d: number;
  potassium: number;
};

export default function ProfileSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(false);

  // Personal info
  const [fullName, setFullName] = useState("");

  // Physical stats
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("female");
  // Units toggle — imperial (ft/in, lbs) or metric (cm, kg)
  const [useMetric, setUseMetric] = useState(false);
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("0");
  const [cm, setCm] = useState("");
  const [weight, setWeight] = useState("");  // lbs in imperial, kg in metric
  const [activityLevel, setActivityLevel] = useState("Active");
  const [fitnessGoal, setFitnessGoal] = useState<"shred" | "bulk" | "maintain">("maintain");

  // Calculated results (kept in state so user can edit before saving)
  const [calculated, setCalculated] = useState<CalculatedNeeds | null>(null);
  const [editedCalories, setEditedCalories] = useState("");
  const [editedProtein, setEditedProtein] = useState("");
  const [editedCarbs, setEditedCarbs] = useState("");
  const [editedFat, setEditedFat] = useState("");
  const [editedFiber, setEditedFiber] = useState("");
  const [editedSodium, setEditedSodium] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    async function checkProfile() {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const { profile } = await res.json();
        if (profile?.age) {
          setHasProfile(true);
          // Pre-populate all form fields with existing data
          if (profile.full_name) setFullName(profile.full_name);
          if (profile.age) setAge(String(profile.age));
          if (profile.sex) setSex(profile.sex);
          if (profile.height_feet != null) setFeet(String(profile.height_feet));
          if (profile.height_inches != null) setInches(String(profile.height_inches));
          if (profile.weight_lbs) setWeight(String(profile.weight_lbs));
          if (profile.activity_level) setActivityLevel(profile.activity_level);
          if (profile.fitness_goal) setFitnessGoal(profile.fitness_goal as "shred" | "bulk" | "maintain");
        }
      }
    }
    checkProfile();
  }, []);

  async function handleCalculate(event: React.FormEvent) {
    event.preventDefault();
    setCalculating(true);
    setError(null);

    // Convert metric → imperial if needed (API always expects std units)
    let apiFeet = feet;
    let apiInches = inches;
    let apiLbs = weight;
    if (useMetric) {
      const totalInches = parseFloat(cm) / 2.54;
      apiFeet = String(Math.floor(totalInches / 12));
      apiInches = String(Math.round(totalInches % 12));
      apiLbs = String(Math.round(parseFloat(weight) * 2.20462));
    }

    try {
      const params = new URLSearchParams({
        measurement_units: "std",
        sex,
        age_value: age,
        age_type: "yrs",
        activity_level: activityLevel,
        feet: apiFeet,
        inches: apiInches,
        lbs: apiLbs,
      });

      const [bmiRes, nutritionRes] = await Promise.all([
        fetch(`/api/bmi?${params.toString()}`),
        fetch(`/api/nutrition-info?${params.toString()}`),
      ]);

      const bmiData = await bmiRes.json();

      if (!bmiRes.ok) {
        setError(
          bmiData.error ||
            bmiData.message ||
            bmiData.detail ||
            `BMI service error (${bmiRes.status})`,
        );
        setCalculating(false);
        return;
      }

      // Nutrition-info may 502 when the upstream USDA DRI Calculator is down.
      // In that case we continue with safe defaults and show a soft warning.
      let nutritionData: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
      if (nutritionRes.ok) {
        nutritionData = await nutritionRes.json();
      } else {
        console.warn(
          `Nutrition-info unavailable (${nutritionRes.status}). Using default macro targets.`,
        );
      }

      // Parse nutrition data (local calculations format)
      const baseCal = parseInt(nutritionData.Calories?.recommended || "2000");

      // Adjust calories based on fitness goal
      let adjustedCalories = baseCal;
      if (fitnessGoal === "shred") {
        adjustedCalories = baseCal - 500;
      } else if (fitnessGoal === "bulk") {
        adjustedCalories = baseCal + 300;
      }

      const protein = parseInt(nutritionData.Macronutrients?.Protein?.grams || "150");
      const carbs = parseInt(nutritionData.Macronutrients?.Carbohydrates?.grams || "200");
      const fat = parseInt(nutritionData.Macronutrients?.Fat?.grams || "65");
      const fiber = parseInt(nutritionData.Fiber?.grams || "28");
      const vitamin_c = parseInt(nutritionData.Vitamins?.["Vitamin C"] || "90");
      const vitamin_d = parseInt(nutritionData.Vitamins?.["Vitamin D"] || "15");
      const calcium = parseInt(nutritionData.Minerals?.Calcium || "1000");
      const iron = parseInt(nutritionData.Minerals?.Iron || "8");
      const sodium = parseInt(nutritionData.Minerals?.Sodium || "2300");
      const potassium = parseInt(nutritionData.Minerals?.Potassium || "3400");

      // Get BMI
      const bmiValue = parseFloat(bmiData.bmi || nutritionData.BMI?.bmi || "0");
      const bmiCategoryStr: string = bmiData.bmi_category || nutritionData.BMI?.bmi_category || "Normal weight";

      const result: CalculatedNeeds = {
        bmi: bmiValue.toFixed(1),
        bmiCategory: bmiCategoryStr,
        calories: adjustedCalories,
        protein,
        carbs,
        fat,
        fiber,
        sodium,
        calcium,
        iron,
        vitamin_c,
        vitamin_d,
        potassium,
      };

      setCalculated(result);

      // Seed editable goal inputs with calculated values
      setEditedCalories(String(adjustedCalories));
      setEditedProtein(String(protein));
      setEditedCarbs(String(carbs));
      setEditedFat(String(fat));
      setEditedFiber(String(fiber));
      setEditedSodium(String(sodium));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed");
    } finally {
      setCalculating(false);
    }
  }

  async function handleSave() {
    if (!calculated) return;

    setLoading(true);
    setError(null);

    // Convert metric → imperial for storage (DB always stores imperial)
    let saveFeet = parseInt(feet);
    let saveInches = parseInt(inches);
    let saveLbs = parseInt(weight);
    if (useMetric) {
      const totalIn = parseFloat(cm) / 2.54;
      saveFeet = Math.floor(totalIn / 12);
      saveInches = Math.round(totalIn % 12);
      saveLbs = Math.round(parseFloat(weight) * 2.20462);
    }

    try {
      // Save profile (personal info + physical stats + recommendations)
      const profileRes = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim() || undefined,
          age: parseInt(age),
          sex,
          height_feet: saveFeet,
          height_inches: saveInches,
          weight_lbs: saveLbs,
          activity_level: activityLevel,
          fitness_goal: fitnessGoal,
          bmi: parseFloat(calculated.bmi),
          recommended_calories: calculated.calories,
          recommended_protein: calculated.protein,
          recommended_carbs: calculated.carbs,
          recommended_fat: calculated.fat,
        }),
      });

      if (!profileRes.ok) {
        const body = await profileRes.json().catch(() => ({}));
        setError(body.error || body.message || "Failed to save profile");
        setLoading(false);
        return;
      }

      // Save goals (user-editable targets)
      const goalsRes = await fetch("/api/user-goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calories_goal: parseInt(editedCalories) || calculated.calories,
          protein_goal: parseInt(editedProtein) || calculated.protein,
          carbs_goal: parseInt(editedCarbs) || calculated.carbs,
          fat_goal: parseInt(editedFat) || calculated.fat,
          fiber_goal: parseInt(editedFiber) || calculated.fiber,
          sodium_goal: parseInt(editedSodium) || calculated.sodium,
          target_weight: targetWeight ? parseFloat(targetWeight) : undefined,
          target_date: targetDate || undefined,
        }),
      });

      if (!goalsRes.ok) {
        const body = await goalsRes.json().catch(() => ({}));
        setError(body.error || body.message || "Failed to save goals");
        setLoading(false);
        return;
      }

      router.push("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            {hasProfile ? "Update Your Profile" : "Set Up Your Profile"}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your details to get personalised nutrition targets, then fine-tune them before saving.
          </p>
        </div>

        <form
          onSubmit={handleCalculate}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          {/* ── Personal Information ── */}
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Personal Information
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="col-span-full grid gap-1.5">
              <span className="text-sm font-medium">Full Name <span className="font-normal text-zinc-400">(optional)</span></span>
              <input
                type="text"
                placeholder="e.g. Alex Johnson"
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Age</span>
              <input
                type="number"
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Sex</span>
              <select
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>
          </div>

          {/* ── Physical Stats ── */}
          <div className="mb-4 mt-8 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Physical Stats
            </h2>
            {/* Units toggle */}
            <div className="flex items-center gap-1 rounded-full border border-zinc-300 p-0.5 text-xs dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setUseMetric(false)}
                className={`rounded-full px-3 py-1 font-medium transition-colors ${
                  !useMetric
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                Imperial
              </button>
              <button
                type="button"
                onClick={() => setUseMetric(true)}
                className={`rounded-full px-3 py-1 font-medium transition-colors ${
                  useMetric
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                Metric
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {useMetric ? (
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Height (cm)</span>
                <input
                  type="number"
                  placeholder="e.g. 175"
                  className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                  value={cm}
                  onChange={(e) => setCm(e.target.value)}
                  required
                />
              </label>
            ) : (
              <>
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium">Height (feet)</span>
                  <input
                    type="number"
                    className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium">Height (inches)</span>
                  <input
                    type="number"
                    className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                  />
                </label>
              </>
            )}

            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Weight ({useMetric ? "kg" : "lbs"})</span>
              <input
                type="number"
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Activity Level</span>
              <select
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="Inactive">Inactive</option>
                <option value="Low Active">Low Active</option>
                <option value="Active">Active</option>
                <option value="Very Active">Very Active</option>
              </select>
            </label>
          </div>

          {/* ── Fitness Goal ── */}
          <h2 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Fitness Goal
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setFitnessGoal("shred")}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                fitnessGoal === "shred"
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-300"
                  : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
            >
              <div className="text-xs opacity-70">🔥</div>
              <div className="mt-1">Shred</div>
              <div className="mt-0.5 text-xs opacity-60">−500 cal/day</div>
            </button>
            <button
              type="button"
              onClick={() => setFitnessGoal("maintain")}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                fitnessGoal === "maintain"
                  ? "border-green-500 bg-green-50 text-green-700 dark:border-green-400 dark:bg-green-950 dark:text-green-300"
                  : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
            >
              <div className="text-xs opacity-70">⚖️</div>
              <div className="mt-1">Maintain</div>
              <div className="mt-0.5 text-xs opacity-60">base TDEE</div>
            </button>
            <button
              type="button"
              onClick={() => setFitnessGoal("bulk")}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                fitnessGoal === "bulk"
                  ? "border-purple-500 bg-purple-50 text-purple-700 dark:border-purple-400 dark:bg-purple-950 dark:text-purple-300"
                  : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
            >
              <div className="text-xs opacity-70">💪</div>
              <div className="mt-1">Bulk</div>
              <div className="mt-0.5 text-xs opacity-60">+500 cal/day</div>
            </button>
          </div>

          {error ? (
            <div className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</div>
          ) : null}

          <button
            type="submit"
            className="mt-6 h-11 w-full rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
            disabled={calculating}
          >
            {calculating ? "Calculating…" : "Calculate My Needs"}
          </button>
          <div className="mt-3 text-center">
            <a href="/app" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 underline underline-offset-2">
              Skip for now →
            </a>
          </div>
        </form>

        {calculated ? (
          <div className="mt-6">
            <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold tracking-tight">
                Your Health Profile &amp; Recommendations
              </h2>

              {/* BMI */}
              <div className="mt-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      Body Mass Index (BMI)
                    </div>
                    <div className="mt-1 text-2xl font-semibold">{calculated.bmi}</div>
                  </div>
                  <div className="rounded-full bg-zinc-200 px-3 py-1 text-sm font-medium dark:bg-zinc-700">
                    {calculated.bmiCategory}
                  </div>
                </div>
              </div>

              {/* Editable macronutrient goals */}
              <div className="mt-6 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Daily Goal Targets</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Edit any value before saving</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {/* Calories */}
                <label className="grid gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Calories (cal)</span>
                  <input
                    type="number"
                    className="w-full bg-transparent text-xl font-semibold outline-none"
                    value={editedCalories}
                    onChange={(e) => setEditedCalories(e.target.value)}
                  />
                </label>
                {/* Protein */}
                <label className="grid gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Protein (g)</span>
                  <input
                    type="number"
                    className="w-full bg-transparent text-xl font-semibold outline-none"
                    value={editedProtein}
                    onChange={(e) => setEditedProtein(e.target.value)}
                  />
                </label>
                {/* Carbs */}
                <label className="grid gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Carbs (g)</span>
                  <input
                    type="number"
                    className="w-full bg-transparent text-xl font-semibold outline-none"
                    value={editedCarbs}
                    onChange={(e) => setEditedCarbs(e.target.value)}
                  />
                </label>
                {/* Fat */}
                <label className="grid gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Fat (g)</span>
                  <input
                    type="number"
                    className="w-full bg-transparent text-xl font-semibold outline-none"
                    value={editedFat}
                    onChange={(e) => setEditedFat(e.target.value)}
                  />
                </label>
                {/* Fiber */}
                <label className="grid gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Fiber (g)</span>
                  <input
                    type="number"
                    className="w-full bg-transparent text-xl font-semibold outline-none"
                    value={editedFiber}
                    onChange={(e) => setEditedFiber(e.target.value)}
                  />
                </label>
                {/* Sodium */}
                <label className="grid gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Sodium limit (mg)</span>
                  <input
                    type="number"
                    className="w-full bg-transparent text-xl font-semibold outline-none"
                    value={editedSodium}
                    onChange={(e) => setEditedSodium(e.target.value)}
                  />
                </label>
                {/* Target weight */}
                <label className="grid gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Target weight ({useMetric ? "kg" : "lbs"})</span>
                  <input
                    type="number"
                    placeholder="e.g. 165"
                    className="w-full bg-transparent text-xl font-semibold outline-none placeholder:font-normal placeholder:text-zinc-400"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                  />
                </label>
                {/* Target date */}
                <label className="grid gap-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Goal deadline</span>
                  <input
                    type="date"
                    className="w-full bg-transparent text-xl font-semibold outline-none"
                    value={targetDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </label>
              </div>

              {/* Micronutrients — read-only reference */}
              <h3 className="mt-6 text-sm font-semibold">Key Micronutrient Reference</h3>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Recommended daily intake based on your profile — tracked automatically from logged meals.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/30">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Vitamin C</div>
                  <div className="mt-1 text-lg font-semibold">{calculated.vitamin_c} mg</div>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/30">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Vitamin D</div>
                  <div className="mt-1 text-lg font-semibold">{calculated.vitamin_d} µg</div>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/30">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Calcium</div>
                  <div className="mt-1 text-lg font-semibold">{calculated.calcium} mg</div>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/30">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Iron</div>
                  <div className="mt-1 text-lg font-semibold">{calculated.iron} mg</div>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/30">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Potassium</div>
                  <div className="mt-1 text-lg font-semibold">{calculated.potassium} mg</div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="mt-6 h-11 w-full rounded-full bg-green-900 px-5 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-60 dark:bg-green-50 dark:text-green-900 dark:hover:bg-white"
                disabled={loading}
              >
                {loading ? "Saving…" : "Save Profile & Set Goals"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
