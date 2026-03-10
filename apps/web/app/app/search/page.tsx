"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setSearchQuery,
  setSelectedFood,
  setServingSize,
  setCustomServing,
  setMealType,
  setShowScanner,
  setScannedBarcode,
  setAdding,
  setSavingFavorite,
} from "@/store/uiSlice";
import {
  useLazySearchFoodsQuery,
  useAddFoodLogMutation,
  useAddFavoriteMutation,
  useGetCustomFoodsQuery,
  useCreateCustomFoodMutation,
  useUpdateCustomFoodMutation,
  useDeleteCustomFoodMutation,
  type UsdaFood,
  type CustomFood,
} from "@/store/api";

const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

// ─── Types ────────────────────────────────────────────────────────────────────

type ServingSize = { label: string; grams: number };
type SearchTab = "all" | "myFoods" | "usda" | "branded";

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVING_SIZES: ServingSize[] = [
  { label: "100g", grams: 100 },
  { label: "150g", grams: 150 },
  { label: "200g", grams: 200 },
];

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

const TABS: { id: SearchTab; label: string }[] = [
  { id: "all",      label: "All"      },
  { id: "myFoods",  label: "My Foods" },
  { id: "usda",     label: "USDA"     },
  { id: "branded",  label: "Branded"  },
];

const CATEGORIES = [
  "Breakfast", "Lunch & Dinner", "Snack", "Protein",
  "Dairy", "Fruit", "Vegetable", "Grain", "Beverage", "Other",
];

// ─── Adapter: CustomFood → UsdaFood (normalises nutrients to per-100 g) ───────

function customFoodToUsdaFood(cf: CustomFood): UsdaFood {
  const per100 = (val: number | null, ss: number | null) => {
    if (val == null) return 0;
    const s = ss ?? 100;
    return s > 0 ? (val / s) * 100 : val;
  };
  const ss = cf.serving_size;
  return {
    fdcId: 0,
    description: cf.name,
    brandOwner: cf.category ?? undefined,
    source: "custom",
    customFoodId: cf.id,
    foodNutrients: [
      { nutrientName: "Energy",                       value: per100(cf.calories, ss), unitName: "kcal" },
      { nutrientName: "Protein",                      value: per100(cf.protein,  ss), unitName: "g"    },
      { nutrientName: "Carbohydrate, by difference",  value: per100(cf.carbs,    ss), unitName: "g"    },
      { nutrientName: "Total lipid (fat)",            value: per100(cf.fat,      ss), unitName: "g"    },
      { nutrientName: "Fiber, total dietary",         value: per100(cf.fiber,    ss), unitName: "g"    },
      { nutrientName: "Sodium, Na",                   value: per100(cf.sodium,   ss), unitName: "mg"   },
    ],
  };
}

// ─── Custom food form shape ───────────────────────────────────────────────────

type CustomFoodFormState = {
  name: string; serving_size: string; serving_unit: string; category: string;
  barcode: string; calories: string; protein: string; carbs: string;
  fat: string; fiber: string; sodium: string;
};

function blankForm(overrides?: Partial<CustomFoodFormState>): CustomFoodFormState {
  return {
    name: "", serving_size: "100", serving_unit: "g", category: "",
    barcode: "", calories: "", protein: "", carbs: "", fat: "",
    fiber: "", sodium: "", ...overrides,
  };
}

// ─── Reusable Custom Food Form Modal ─────────────────────────────────────────

function CustomFoodModal({
  initial, onClose, onSave, saving, title,
}: {
  initial: CustomFoodFormState;
  onClose: () => void;
  onSave: (form: CustomFoodFormState) => Promise<void>;
  saving: boolean;
  title: string;
}) {
  const [form, setForm] = useState<CustomFoodFormState>(initial);
  const set = (k: keyof CustomFoodFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-y-auto max-h-[90vh] rounded-2xl border border-[#B0C4DE] bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Name *</label>
        <input
          className="mb-3 h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
          placeholder="e.g. Homemade Granola"
          value={form.name}
          onChange={set("name")}
        />

        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Serving size</label>
            <input
              className="h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
              type="number" min="1" value={form.serving_size} onChange={set("serving_size")}
            />
          </div>
          <div className="w-24">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Unit</label>
            <input
              className="h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
              placeholder="g / ml" value={form.serving_unit} onChange={set("serving_unit")}
            />
          </div>
        </div>

        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Nutrients per serving</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {(["calories","protein","carbs","fat","fiber","sodium"] as const).map((k) => (
            <div key={k}>
              <label className="block text-[11px] text-zinc-500 capitalize mb-0.5">{k}</label>
              <input
                className="h-9 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
                type="number" min="0" placeholder="—" value={form[k]} onChange={set(k)}
              />
            </div>
          ))}
        </div>

        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Category</label>
        <select
          className="mb-3 h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
          value={form.category} onChange={set("category")}
        >
          <option value="">— none —</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Barcode (optional)</label>
        <input
          className="mb-5 h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
          placeholder="e.g. 0123456789012" value={form.barcode} onChange={set("barcode")}
        />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-[#D3D8E0] px-4 py-2 text-sm font-medium hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800"
          >Cancel</button>
          <button
            disabled={saving || !form.name.trim()}
            onClick={() => onSave(form)}
            className="flex-1 rounded-full bg-[#4169E1] px-4 py-2 text-sm font-medium text-white hover:bg-[#000080] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
          >{saving ? "Saving…" : "Save"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useSession();
  const isGuest = status === "unauthenticated";

  const { query, selectedFood, servingSize, customServing, mealType, showScanner, adding, savingFavorite } =
    useAppSelector((s) => s.ui.search);

  // ── Server queries / mutations ──────────────────────────────────────────────
  const [triggerSearch, { data: usdaResults = [] as UsdaFood[], isFetching: loading }] =
    useLazySearchFoodsQuery();
  const [addFoodLog]   = useAddFoodLogMutation();
  const [addFavorite]  = useAddFavoriteMutation();
  const { data: customFoods = [] } = useGetCustomFoodsQuery(query, { skip: isGuest });
  const [createCustomFood] = useCreateCustomFoodMutation();
  const [updateCustomFood] = useUpdateCustomFoodMutation();
  const [deleteCustomFood] = useDeleteCustomFoodMutation();

  // ── Local UI state ──────────────────────────────────────────────────────────
  const [barcodeResults, setBarcodeResults]   = useState<UsdaFood[]>([]);
  const [error, setError]                     = useState<string | null>(null);
  const [activeTab, setActiveTab]             = useState<SearchTab>("all");
  const [showCreateForm, setShowCreateForm]   = useState(false);
  const [editingCf, setEditingCf]             = useState<CustomFood | null>(null);
  const [barcodeNotFound, setBarcodeNotFound] = useState(false);
  const [pendingBarcode, setPendingBarcode]   = useState("");
  const [cfSaving, setCfSaving]               = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 300 ms debounced auto-search ────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) return;
    debounceRef.current = setTimeout(() => {
      setBarcodeResults([]);
      setError(null);
      triggerSearch(query);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Barcode scan ────────────────────────────────────────────────────────────
  async function handleBarcodeDetected(barcode: string) {
    dispatch(setShowScanner(false));
    dispatch(setScannedBarcode(barcode));
    dispatch(setSearchQuery(barcode));
    setError(null);
    setBarcodeNotFound(false);
    try {
      const res  = await fetch(`/api/foods/search?query=${encodeURIComponent(barcode)}`);
      const data = await res.json();
      const foods: UsdaFood[] = data.foods ?? [];
      if (foods.length > 0) {
        setBarcodeResults(foods);
        setActiveTab("all");
      } else {
        setPendingBarcode(barcode);
        setBarcodeNotFound(true);
      }
    } catch {
      setError("Failed to fetch product info.");
    }
  }

  // ── Tab-filtered results ────────────────────────────────────────────────────
  const rawUsda      = barcodeResults.length > 0 ? barcodeResults : usdaResults;
  const adaptedCustom = customFoods.map(customFoodToUsdaFood);

  const filteredResults: UsdaFood[] = (() => {
    switch (activeTab) {
      case "myFoods":
        return adaptedCustom.filter((f) =>
          !query.trim() || f.description.toLowerCase().includes(query.toLowerCase()));
      case "usda":
        return rawUsda.filter((f) => f.dataType !== "Branded");
      case "branded":
        return rawUsda.filter((f) => f.dataType === "Branded");
      default: {
        const cf = adaptedCustom.filter((f) =>
          !query.trim() || f.description.toLowerCase().includes(query.toLowerCase()));
        return [...cf, ...rawUsda];
      }
    }
  })();

  // ── Modal helpers ───────────────────────────────────────────────────────────
  function openModal(food: UsdaFood) {
    dispatch(setSelectedFood(food));
    dispatch(setServingSize(100));
    dispatch(setCustomServing(""));
    const hour = new Date().getHours();
    dispatch(setMealType(hour < 11 ? "Breakfast" : hour < 15 ? "Lunch" : hour < 20 ? "Dinner" : "Snack"));
  }
  function closeModal() { dispatch(setSelectedFood(null)); }

  function getNutrient(name: string): number {
    return selectedFood?.foodNutrients?.find((n) => n.nutrientName === name)?.value ?? 0;
  }
  function getNutrientValue(food: UsdaFood, name: string): string {
    const n = food.foodNutrients?.find((n) => n.nutrientName === name);
    if (!n) return "—";
    return `${Math.round(n.value)}${n.unitName}`;
  }

  // ── Add food to log ─────────────────────────────────────────────────────────
  async function handleAddFood() {
    if (!selectedFood) return;
    if (isGuest) { router.push("/signup"); return; }
    dispatch(setAdding(true));
    const m = servingSize / 100;
    const logResult = await addFoodLog({
      date:        new Date().toISOString().split("T")[0],
      fdc_id:      selectedFood.fdcId,
      food_name:   `${selectedFood.description} (${servingSize}g)`,
      calories:    getNutrient("Energy") * m,
      protein:     getNutrient("Protein") * m,
      carbs:       getNutrient("Carbohydrate, by difference") * m,
      fat:         getNutrient("Total lipid (fat)") * m,
      fiber:       getNutrient("Fiber, total dietary") * m,
      sodium:      getNutrient("Sodium, Na") * m,
      saturated_fat:       getNutrient("Fatty acids, total saturated") * m,
      trans_fat:           getNutrient("Fatty acids, total trans") * m,
      polyunsaturated_fat: getNutrient("Fatty acids, total polyunsaturated") * m,
      monounsaturated_fat: getNutrient("Fatty acids, total monounsaturated") * m,
      cholesterol:         getNutrient("Cholesterol") * m,
      sugars:              getNutrient("Sugars, total including NLEA") * m,
      added_sugars:        getNutrient("Sugars, added") * m,
      vitamin_a:   getNutrient("Vitamin A, RAE") * m,
      vitamin_c:   getNutrient("Vitamin C, total ascorbic acid") * m,
      vitamin_d:   getNutrient("Vitamin D (D2 + D3)") * m,
      vitamin_e:   getNutrient("Vitamin E (alpha-tocopherol)") * m,
      vitamin_k:   getNutrient("Vitamin K (phylloquinone)") * m,
      thiamin:     getNutrient("Thiamin") * m,
      riboflavin:  getNutrient("Riboflavin") * m,
      niacin:      getNutrient("Niacin") * m,
      vitamin_b6:  getNutrient("Vitamin B-6") * m,
      folate:      getNutrient("Folate, total") * m,
      vitamin_b12: getNutrient("Vitamin B-12") * m,
      calcium:     getNutrient("Calcium, Ca") * m,
      iron:        getNutrient("Iron, Fe") * m,
      magnesium:   getNutrient("Magnesium, Mg") * m,
      phosphorus:  getNutrient("Phosphorus, P") * m,
      potassium:   getNutrient("Potassium, K") * m,
      zinc:        getNutrient("Zinc, Zn") * m,
      selenium:    getNutrient("Selenium, Se") * m,
      quantity: 1,
      time:     new Date().toISOString(),
      meal_type: mealType.toUpperCase(),
    });
    dispatch(setAdding(false));
    if ("error" in logResult) { alert("Failed to log food"); return; }
    closeModal();
    router.push("/app");
  }

  // ── Save favourite ──────────────────────────────────────────────────────────
  async function handleSaveFavorite() {
    if (!selectedFood) return;
    if (isGuest) { router.push("/signup"); return; }
    dispatch(setSavingFavorite(true));
    const m = servingSize / 100;
    try {
      const result = await addFavorite({
        fdc_id: selectedFood.fdcId, food_name: selectedFood.description,
        calories: getNutrient("Energy") * m, protein: getNutrient("Protein") * m,
        carbs: getNutrient("Carbohydrate, by difference") * m, fat: getNutrient("Total lipid (fat)") * m,
      });
      if ("error" in result) alert("Failed to save favourite");
      else { alert(`${selectedFood.description} saved to favourites!`); closeModal(); }
    } catch { alert("Failed to save favourite"); }
    finally { dispatch(setSavingFavorite(false)); }
  }

  // ── Custom food CRUD ────────────────────────────────────────────────────────
  async function handleCreateCustomFood(form: CustomFoodFormState) {
    setCfSaving(true);
    try {
      await createCustomFood({
        name: form.name, serving_size: parseFloat(form.serving_size) || 100,
        serving_unit: form.serving_unit || "g", category: form.category || null,
        barcode: form.barcode || null,
        calories: parseFloat(form.calories) || null, protein: parseFloat(form.protein) || null,
        carbs: parseFloat(form.carbs) || null,       fat: parseFloat(form.fat) || null,
        fiber: parseFloat(form.fiber) || null,       sodium: parseFloat(form.sodium) || null,
      }).unwrap();
      setShowCreateForm(false);
      setBarcodeNotFound(false);
      setPendingBarcode("");
    } catch { alert("Failed to save food"); }
    finally { setCfSaving(false); }
  }

  async function handleUpdateCustomFood(form: CustomFoodFormState) {
    if (!editingCf) return;
    setCfSaving(true);
    try {
      await updateCustomFood({
        id: editingCf.id, name: form.name,
        serving_size: parseFloat(form.serving_size) || 100, serving_unit: form.serving_unit || "g",
        category: form.category || null, barcode: form.barcode || null,
        calories: parseFloat(form.calories) || null, protein: parseFloat(form.protein) || null,
        carbs: parseFloat(form.carbs) || null,       fat: parseFloat(form.fat) || null,
        fiber: parseFloat(form.fiber) || null,       sodium: parseFloat(form.sodium) || null,
      }).unwrap();
      setEditingCf(null);
    } catch { alert("Failed to update food"); }
    finally { setCfSaving(false); }
  }

  async function handleDeleteCustomFood(id: string, name: string) {
    if (!confirm(`Delete "${name}" from your library?`)) return;
    try { await deleteCustomFood(id).unwrap(); }
    catch { alert("Failed to delete food"); }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Search Foods</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Search and add to your daily log</p>
        </div>
        {!isGuest && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="rounded-full bg-[#4169E1] px-4 py-2 text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
          >
            + Custom Food
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          className="h-12 flex-1 rounded-xl border border-[#B0C4DE] bg-white px-4 text-sm dark:border-gray-700 dark:bg-black"
          placeholder="Type a food (e.g., chicken breast)…"
          value={query}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          autoFocus
        />
        <button
          type="button"
          className="h-12 rounded-full bg-emerald-500 px-5 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 transition-colors"
          onClick={() => dispatch(setShowScanner(true))}
        >
          <svg className="inline-block mr-1.5 -mt-0.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="2" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="2" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="2" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="2" strokeWidth="2"/>
          </svg>
          Scan
        </button>
      </div>

      {/* Category tabs */}
      <div className="mt-4 flex gap-1 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#4169E1] text-white dark:bg-[#87CEEB] dark:text-black"
                : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
        {loading && <span className="ml-auto self-center text-xs text-zinc-400 animate-pulse">Searching…</span>}
      </div>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {/* Barcode not found — graceful fallback */}
      {barcodeNotFound && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Barcode <span className="font-mono">{pendingBarcode}</span> wasn&apos;t found in USDA or Open Food Facts.
          </p>
          <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
            Add it manually to your personal library — next time you scan it, it&apos;ll appear instantly.
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="mt-3 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
          >
            Add manually
          </button>
        </div>
      )}

      {/* Results list */}
      {filteredResults.length > 0 && (
        <div className="mt-6 space-y-2">
          {filteredResults.map((food, i) => {
            const isCustom = food.source === "custom";
            const cf = isCustom ? customFoods.find((c) => c.id === food.customFoodId) ?? null : null;
            return (
              <div
                key={food.customFoodId ?? `${food.fdcId}-${i}`}
                className={`flex items-center gap-3 rounded-xl border bg-white p-4 transition-colors dark:bg-gray-900 ${
                  isCustom
                    ? "border-[#4169E1]/30 hover:bg-zinc-100 dark:border-[#87CEEB]/20 dark:hover:bg-zinc-800"
                    : "border-[#D3D8E0] hover:bg-[#E0E0E0] dark:border-gray-800 dark:hover:bg-gray-800"
                }`}
              >
                <button onClick={() => openModal(food)} className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{food.description}</span>
                    {isCustom && (
                      <span className="rounded-full bg-[#4169E1]/10 px-2 py-0.5 text-[10px] font-semibold text-[#4169E1] dark:bg-[#87CEEB]/10 dark:text-[#87CEEB]">
                        My Food
                      </span>
                    )}
                  </div>
                  {food.brandOwner && (
                    <div className="mt-0.5 text-xs text-zinc-500">{food.brandOwner}</div>
                  )}
                  <div className="mt-2 flex gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                    <span>{getNutrientValue(food, "Energy")}</span>
                    <span>{getNutrientValue(food, "Protein")} protein</span>
                    <span>{getNutrientValue(food, "Carbohydrate, by difference")} carbs</span>
                    <span>{getNutrientValue(food, "Total lipid (fat)")} fat</span>
                  </div>
                </button>

                {/* Custom food edit / delete */}
                {isCustom && cf && (
                  <div className="flex shrink-0 gap-1">
                    <button
                      onClick={() => setEditingCf(cf)}
                      className="rounded-full border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16H8v-2a2 2 0 01.586-1.414z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteCustomFood(cf.id, cf.name)}
                      className="rounded-full border border-red-200 p-1.5 text-red-400 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
                      title="Delete from library"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 001-1h4a1 1 0 001 1m-7 0H5" />
                      </svg>
                    </button>
                  </div>
                )}

                <button
                  onClick={() => openModal(food)}
                  className="shrink-0 rounded-full bg-[#4169E1] p-2 text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
                  title="Add to log"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty states */}
      {!loading && filteredResults.length === 0 && query && !barcodeNotFound && (
        <div className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          No results found.{" "}
          {!isGuest && (
            <button onClick={() => setShowCreateForm(true)} className="underline hover:text-[#4169E1]">
              Add a custom food?
            </button>
          )}
        </div>
      )}

      {activeTab === "myFoods" && !query && customFoods.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500">Your personal food library is empty.</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="mt-3 rounded-full bg-[#4169E1] px-4 py-2 text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
          >
            + Add your first food
          </button>
        </div>
      )}

      {/* ── Log-entry modal ────────────────────────────────────────────────── */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
          <div
            className="w-full max-w-md rounded-2xl border border-[#B0C4DE] bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">{selectedFood.description}</h2>
            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Serving Size</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {SERVING_SIZES.map((size) => (
                  <button
                    key={size.grams}
                    onClick={() => { dispatch(setServingSize(size.grams)); dispatch(setCustomServing("")); }}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      servingSize === size.grams && !customServing
                        ? "border-[#4169E1] bg-[#4169E1] text-white dark:border-[#87CEEB] dark:bg-[#87CEEB] dark:text-black"
                        : "border-[#D3D8E0] hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >{size.label}</button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom (grams)"
                value={customServing}
                onChange={(e) => {
                  dispatch(setCustomServing(e.target.value));
                  if (e.target.value) dispatch(setServingSize(parseInt(e.target.value) || 100));
                }}
                className="mt-2 h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Meal Type</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {MEAL_TYPES.map((meal) => (
                  <button
                    key={meal}
                    onClick={() => dispatch(setMealType(meal))}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      mealType === meal
                        ? "border-[#4169E1] bg-[#4169E1] text-white dark:border-[#87CEEB] dark:bg-[#87CEEB] dark:text-black"
                        : "border-[#D3D8E0] hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >{meal}</button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              {isGuest ? (
                <a href="/signup" className="flex-1 rounded-full bg-[#4169E1] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black">
                  Sign up to save this food
                </a>
              ) : (
                <>
                  <button onClick={closeModal} className="rounded-full border border-[#D3D8E0] px-4 py-2 text-sm font-medium hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800">
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFavorite} disabled={savingFavorite}
                    className="rounded-full border border-yellow-500 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-100 disabled:opacity-60 dark:border-yellow-600 dark:bg-yellow-950 dark:text-yellow-300 dark:hover:bg-yellow-900"
                  >{savingFavorite ? "Saving…" : "⭐ Save"}</button>
                  <button
                    onClick={handleAddFood} disabled={adding}
                    className="flex-1 rounded-full bg-[#4169E1] px-4 py-2 text-sm font-medium text-white hover:bg-[#000080] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
                  >{adding ? "Adding…" : "Add to Log"}</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Barcode scanner ────────────────────────────────────────────────── */}
      {showScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative rounded-xl bg-white p-4 shadow-xl">
            <button
              className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-2xl font-extrabold text-white hover:bg-red-600"
              onClick={() => dispatch(setShowScanner(false))}
              aria-label="Close scanner"
            >×</button>
            <BarcodeScannerComponent
              width={400} height={300}
              onUpdate={(err, result) => {
                if (result) handleBarcodeDetected((result as unknown as { text: string }).text);
              }}
            />
            <p className="mt-2 text-center text-sm text-zinc-600">Point your camera at a barcode</p>
          </div>
        </div>
      )}

      {/* ── Create custom food ─────────────────────────────────────────────── */}
      {showCreateForm && (
        <CustomFoodModal
          title="Add Custom Food"
          initial={blankForm(pendingBarcode ? { barcode: pendingBarcode } : {})}
          onClose={() => setShowCreateForm(false)}
          onSave={handleCreateCustomFood}
          saving={cfSaving}
        />
      )}

      {/* ── Edit custom food ───────────────────────────────────────────────── */}
      {editingCf && (
        <CustomFoodModal
          title={`Edit — ${editingCf.name}`}
          initial={blankForm({
            name:         editingCf.name,
            serving_size: String(editingCf.serving_size ?? 100),
            serving_unit: editingCf.serving_unit,
            category:     editingCf.category ?? "",
            barcode:      editingCf.barcode   ?? "",
            calories:     String(editingCf.calories ?? ""),
            protein:      String(editingCf.protein  ?? ""),
            carbs:        String(editingCf.carbs    ?? ""),
            fat:          String(editingCf.fat      ?? ""),
            fiber:        String(editingCf.fiber    ?? ""),
            sodium:       String(editingCf.sodium   ?? ""),
          })}
          onClose={() => setEditingCf(null)}
          onSave={handleUpdateCustomFood}
          saving={cfSaving}
        />
      )}
    </div>
  );
}


