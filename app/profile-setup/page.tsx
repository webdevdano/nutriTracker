"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type CalculatedNeeds = {
  bmi: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function ProfileSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(false);

  const [age, setAge] = useState("");
  const [sex, setSex] = useState("female");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("0");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("Active");

  const [calculated, setCalculated] = useState<CalculatedNeeds | null>(null);

  useEffect(() => {
    async function checkProfile() {
      const supabase = createClient();
      const { data } = await supabase.from("profiles").select("age").single();
      if (data?.age) {
        setHasProfile(true);
      }
    }
    checkProfile();
  }, []);

  async function handleCalculate(event: React.FormEvent) {
    event.preventDefault();
    setCalculating(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        measurement_units: "std",
        sex,
        age_value: age,
        age_type: "yrs",
        activity_level: activityLevel,
        feet,
        inches,
        lbs: weight,
      });

      const [bmiRes, nutritionRes] = await Promise.all([
        fetch(`/api/bmi?${params.toString()}`),
        fetch(`/api/nutrition-info?${params.toString()}`),
      ]);

      const bmiData = await bmiRes.json();
      const nutritionData = await nutritionRes.json();

      if (!bmiRes.ok) {
        setError(bmiData.error || "Failed to calculate BMI");
        setCalculating(false);
        return;
      }

      // Parse nutrition data
      const calories = parseInt(
        nutritionData.BMI_EER?.["Estimated Daily Caloric Needs"]?.replace(/,/g, "") || "2000"
      );
      
      const macros = nutritionData.macronutrients_table?.["macronutrients-table"] || [];
      const proteinRow = macros.find((row: string[]) => row[0] === "Protein");
      const carbsRow = macros.find((row: string[]) => row[0] === "Carbohydrate");
      const fatRow = macros.find((row: string[]) => row[0] === "Fat");

      const protein = parseInt(proteinRow?.[1] || "150");
      const carbs = parseInt(carbsRow?.[1]?.split("-")[0] || "200");
      const fat = parseInt(fatRow?.[1]?.split("-")[0] || "65");

      setCalculated({
        bmi: bmiData.bmi || nutritionData.BMI_EER?.BMI || "0",
        calories,
        protein,
        carbs,
        fat,
      });
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

    const supabase = createClient();

    // Update profile with health metrics
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        age: parseInt(age),
        sex,
        height_feet: parseInt(feet),
        height_inches: parseInt(inches),
        weight_lbs: parseInt(weight),
        activity_level: activityLevel,
        bmi: parseFloat(calculated.bmi),
        recommended_calories: calculated.calories,
        recommended_protein: calculated.protein,
        recommended_carbs: calculated.carbs,
        recommended_fat: calculated.fat,
      })
      .eq("id", (await supabase.auth.getUser()).data.user?.id || "");

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    // Create/update goals based on recommendations
    const { error: goalsError } = await supabase.from("user_goals").upsert(
      {
        calories_goal: calculated.calories,
        protein_goal: calculated.protein,
        carbs_goal: calculated.carbs,
        fat_goal: calculated.fat,
      },
      { onConflict: "user_id" }
    );

    if (goalsError) {
      setError(goalsError.message);
      setLoading(false);
      return;
    }

    router.push("/app");
  }

  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            {hasProfile ? "Update Your Profile" : "Set Up Your Profile"}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Calculate your daily nutritional needs and set personalized goals
          </p>
        </div>

        <form
          onSubmit={handleCalculate}
          className="rounded-2xl border border-zinc-200/70 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900"
        >
          <div className="grid gap-4 sm:grid-cols-2">
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

            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Weight (lbs)</span>
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

          {error ? (
            <div className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</div>
          ) : null}

          <button
            type="submit"
            className="mt-6 h-11 w-full rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
            disabled={calculating}
          >
            {calculating ? "Calculating..." : "Calculate My Needs"}
          </button>
        </form>

        {calculated ? (
          <div className="mt-6">
            <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold tracking-tight">
                Your Recommended Daily Targets
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    BMI
                  </div>
                  <div className="mt-1 text-xl font-semibold">{calculated.bmi}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Calories
                  </div>
                  <div className="mt-1 text-xl font-semibold">
                    {calculated.calories} cal
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Protein
                  </div>
                  <div className="mt-1 text-xl font-semibold">{calculated.protein}g</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Carbs
                  </div>
                  <div className="mt-1 text-xl font-semibold">{calculated.carbs}g</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Fat
                  </div>
                  <div className="mt-1 text-xl font-semibold">{calculated.fat}g</div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="mt-6 h-11 w-full rounded-full bg-green-900 px-5 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-60 dark:bg-green-50 dark:text-green-900 dark:hover:bg-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save & Set Goals"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
