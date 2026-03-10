/**
 * Local BMI and nutrition calculations — no external API needed.
 * BMI: standard formula
 * Calories: Mifflin-St Jeor BMR × activity factor × goal adjustment
 * Macros: standard DRI percentages
 */

export type BmiResult = {
  bmi: string;
  bmi_category: string;
  healthy_bmi_range: string;
};

export type NutritionResult = {
  BMI: { bmi: string; bmi_category: string };
  Calories: { Sedentary: string; Low: string; Moderate: string; Active: string; "Very Active": string; recommended: string };
  Macronutrients: {
    Protein: { grams: string; calories: string };
    Carbohydrates: { grams: string; calories: string };
    Fat: { grams: string; calories: string };
  };
  Minerals: { Calcium: string; Iron: string; Potassium: string; Sodium: string };
  Vitamins: { "Vitamin C": string; "Vitamin D": string };
  Fiber: { grams: string };
};

const ACTIVITY_FACTORS: Record<string, number> = {
  Sedentary: 1.2,
  Low: 1.375,
  Moderate: 1.55,
  Active: 1.725,
  "Very Active": 1.9,
};

/** Mifflin-St Jeor BMR (standard units: lbs, feet, inches) */
function calcBmr(sex: string, weightLbs: number, heightIn: number, age: number): number {
  const weightKg = weightLbs * 0.453592;
  const heightCm = heightIn * 2.54;
  if (sex === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

function calcBmi(weightLbs: number, heightIn: number): number {
  return (weightLbs / (heightIn * heightIn)) * 703;
}

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function getBmi(params: {
  measurement_units: "std" | "met";
  feet?: string;
  inches?: string;
  lbs?: string;
  cm?: string;
  kilos?: string;
}): BmiResult {
  let weightLbs: number;
  let heightIn: number;

  if (params.measurement_units === "met") {
    const cm = parseFloat(params.cm ?? "0");
    const kg = parseFloat(params.kilos ?? "0");
    weightLbs = kg / 0.453592;
    heightIn = cm / 2.54;
  } else {
    const ft = parseFloat(params.feet ?? "0");
    const inc = parseFloat(params.inches ?? "0");
    weightLbs = parseFloat(params.lbs ?? "0");
    heightIn = ft * 12 + inc;
  }

  const bmi = calcBmi(weightLbs, heightIn);
  const category = bmiCategory(bmi);

  return {
    bmi: bmi.toFixed(1),
    bmi_category: category,
    healthy_bmi_range: "18.5 - 24.9",
  };
}

export function getNutritionInfo(params: {
  measurement_units: "std" | "met";
  sex: string;
  age_value: string;
  activity_level?: string;
  feet?: string;
  inches?: string;
  lbs?: string;
  cm?: string;
  kilos?: string;
  goal?: "shred" | "bulk" | "maintain";
}): NutritionResult {
  let weightLbs: number;
  let heightIn: number;

  if (params.measurement_units === "met") {
    const cm = parseFloat(params.cm ?? "0");
    const kg = parseFloat(params.kilos ?? "0");
    weightLbs = kg / 0.453592;
    heightIn = cm / 2.54;
  } else {
    const ft = parseFloat(params.feet ?? "0");
    const inc = parseFloat(params.inches ?? "0");
    weightLbs = parseFloat(params.lbs ?? "0");
    heightIn = ft * 12 + inc;
  }

  const age = parseFloat(params.age_value);
  const sex = params.sex.toLowerCase();
  const activityLevel = params.activity_level ?? "Active";
  const goal = params.goal ?? "maintain";

  const bmr = calcBmr(sex, weightLbs, heightIn, age);
  const factor = ACTIVITY_FACTORS[activityLevel] ?? 1.55;
  let tdee = bmr * factor;

  // Goal adjustment
  if (goal === "shred") tdee -= 500;
  else if (goal === "bulk") tdee += 300;

  const calories = Math.round(tdee);

  // Macros: protein 25%, carbs 45%, fat 30%
  const proteinCal = calories * 0.25;
  const carbsCal = calories * 0.45;
  const fatCal = calories * 0.30;
  const proteinG = Math.round(proteinCal / 4);
  const carbsG = Math.round(carbsCal / 4);
  const fatG = Math.round(fatCal / 9);

  // Fiber DRI
  const fiberG = sex === "male" ? (age >= 51 ? 30 : 38) : age >= 51 ? 21 : 25;

  // Sodium DRI (mg)
  const sodiumMg = age >= 51 ? 1500 : 2300;

  // Minerals (standard DRI)
  const calciumMg = (sex === "male" && age >= 71) || (sex === "female" && age >= 51) ? 1200 : 1000;
  const ironMg = sex === "female" && age < 51 ? 18 : 8;
  const potassiumMg = sex === "male" ? 3400 : 2600;

  // Vitamins
  const vitCMg = sex === "male" ? 90 : 75;
  const vitDIu = age >= 71 ? 800 : 600;

  const bmi = calcBmi(weightLbs, heightIn);

  const tdeeByLevel = Object.fromEntries(
    Object.entries(ACTIVITY_FACTORS).map(([level, f]) => [level, String(Math.round(bmr * f))])
  ) as Record<string, string>;

  return {
    BMI: { bmi: bmi.toFixed(1), bmi_category: bmiCategory(bmi) },
    Calories: { ...tdeeByLevel, recommended: String(calories) },
    Macronutrients: {
      Protein: { grams: String(proteinG), calories: String(Math.round(proteinCal)) },
      Carbohydrates: { grams: String(carbsG), calories: String(Math.round(carbsCal)) },
      Fat: { grams: String(fatG), calories: String(Math.round(fatCal)) },
    },
    Minerals: {
      Calcium: `${calciumMg} mg`,
      Iron: `${ironMg} mg`,
      Potassium: `${potassiumMg} mg`,
      Sodium: `${sodiumMg} mg`,
    },
    Vitamins: {
      "Vitamin C": `${vitCMg} mg`,
      "Vitamin D": `${vitDIu} IU`,
    },
    Fiber: { grams: String(fiberG) },
  };
}
