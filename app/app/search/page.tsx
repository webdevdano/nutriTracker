"use client";

import { useState } from "react";
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
  type UsdaFood,
} from "@/store/api";
const BarcodeScannerComponent = dynamic(() => import("react-qr-barcode-scanner"), { ssr: false });

type ServingSize = {
  label: string;
  grams: number;
};

const SERVING_SIZES: ServingSize[] = [
  { label: "100g", grams: 100 },
  { label: "150g", grams: 150 },
  { label: "200g", grams: 200 },
];

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function SearchPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useSession();
  const isGuest = status === 'unauthenticated';
  const { query, selectedFood, servingSize, customServing, mealType, showScanner, adding, savingFavorite } =
    useAppSelector((s) => s.ui.search);

  // RTK Query lazy search hook — triggered manually on form submit
  const [triggerSearch, { data: searchResults = [] as UsdaFood[], isFetching: loading, error: searchError }] =
    useLazySearchFoodsQuery();
  const [addFoodLog] = useAddFoodLogMutation();
  const [addFavorite] = useAddFavoriteMutation();

  // Barcode results live in local state since they come from a 3rd-party API
  const [barcodeResults, setBarcodeResults] = useState<UsdaFood[]>([]);
  const [error, setError] = useState<string | null>(
    searchError ? "Search failed" : null
  );

  const results = barcodeResults.length > 0 ? barcodeResults : searchResults;

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setBarcodeResults([]);
    setError(null);
    try {
      await triggerSearch(query).unwrap();
    } catch {
      setError("Search failed");
    }
  }

  async function handleBarcodeDetected(barcode: string) {
    dispatch(setShowScanner(false));
    dispatch(setScannedBarcode(barcode));
    setError(null);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      if (data.status === 1 && data.product) {
        const food: UsdaFood = {
          fdcId: parseInt(barcode) || 0,
          description: data.product.product_name || "Unknown Product",
          brandOwner: data.product.brands,
          foodNutrients: [
            { nutrientName: "Energy", value: data.product.nutriments.energy_100g || 0, unitName: "kcal" },
            { nutrientName: "Protein", value: data.product.nutriments.proteins_100g || 0, unitName: "g" },
            { nutrientName: "Carbohydrate, by difference", value: data.product.nutriments.carbohydrates_100g || 0, unitName: "g" },
            { nutrientName: "Total lipid (fat)", value: data.product.nutriments.fat_100g || 0, unitName: "g" },
          ],
        };
        setBarcodeResults([food]);
      } else {
        setError("No product found for this barcode.");
        setBarcodeResults([]);
      }
    } catch {
      setError("Failed to fetch product info.");
      setBarcodeResults([]);
    }
  }

  function openModal(food: UsdaFood) {
    dispatch(setSelectedFood(food));
    dispatch(setServingSize(100));
    dispatch(setCustomServing(""));
    dispatch(setMealType("Lunch"));
  }

  function closeModal() {
    dispatch(setSelectedFood(null));
  }

  function getNutrient(name: string): number {
    if (!selectedFood?.foodNutrients) return 0;
    return selectedFood.foodNutrients.find((n) => n.nutrientName === name)?.value || 0;
  }

  async function handleAddFood() {
    if (!selectedFood) return;
    if (isGuest) {
      router.push("/signup");
      return;
    }

    dispatch(setAdding(true));
    const multiplier = servingSize / 100; // USDA values are per 100g

    // Extract all nutrients from USDA API
    const calories = getNutrient("Energy") * multiplier;
    const protein = getNutrient("Protein") * multiplier;
    const carbs = getNutrient("Carbohydrate, by difference") * multiplier;
    const fat = getNutrient("Total lipid (fat)") * multiplier;
    const fiber = getNutrient("Fiber, total dietary") * multiplier;
    const sodium = getNutrient("Sodium, Na") * multiplier;
    
    // Fat breakdown
    const saturated_fat = getNutrient("Fatty acids, total saturated") * multiplier;
    const trans_fat = getNutrient("Fatty acids, total trans") * multiplier;
    const polyunsaturated_fat = getNutrient("Fatty acids, total polyunsaturated") * multiplier;
    const monounsaturated_fat = getNutrient("Fatty acids, total monounsaturated") * multiplier;
    const cholesterol = getNutrient("Cholesterol") * multiplier;
    
    // Sugars
    const sugars = getNutrient("Sugars, total including NLEA") * multiplier;
    const added_sugars = getNutrient("Sugars, added") * multiplier;
    
    // Vitamins
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
    
    // Minerals
    const calcium = getNutrient("Calcium, Ca") * multiplier;
    const iron = getNutrient("Iron, Fe") * multiplier;
    const magnesium = getNutrient("Magnesium, Mg") * multiplier;
    const phosphorus = getNutrient("Phosphorus, P") * multiplier;
    const potassium = getNutrient("Potassium, K") * multiplier;
    const zinc = getNutrient("Zinc, Zn") * multiplier;
    const selenium = getNutrient("Selenium, Se") * multiplier;

    const today = new Date().toISOString().split("T")[0];

    const logResult = await addFoodLog({
        date: today,
        fdc_id: selectedFood.fdcId,
        food_name: `${selectedFood.description} (${servingSize}g)`,
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
      quantity: 1,
      time: new Date().toISOString(),
    });

    dispatch(setAdding(false));
    if ('error' in logResult) {
      alert("Failed to log food");
      return;
    }

    closeModal();
    router.push("/app");
  }

  async function handleSaveFavorite() {
    if (!selectedFood) return;
    if (isGuest) {
      router.push("/signup");
      return;
    }

    dispatch(setSavingFavorite(true));
    const multiplier = servingSize / 100;

    const calories = getNutrient("Energy") * multiplier;
    const protein = getNutrient("Protein") * multiplier;
    const carbs = getNutrient("Carbohydrate, by difference") * multiplier;
    const fat = getNutrient("Total lipid (fat)") * multiplier;

    try {
      const result = await addFavorite({
          fdc_id: selectedFood.fdcId,
          food_name: selectedFood.description,
          calories,
          protein,
          carbs,
          fat,
        });

      if ('error' in result) {
        alert("Failed to save favorite");
      } else {
        alert(`${selectedFood.description} saved to favorites!`);
        closeModal();
      }
    } catch {
      alert("Failed to save favorite");
    } finally {
      dispatch(setSavingFavorite(false));
    }
  }

  function getNutrientValue(food: UsdaFood, name: string): string {
    const nutrient = food.foodNutrients?.find((n) => n.nutrientName === name);
    if (!nutrient) return "—";
    return `${Math.round(nutrient.value)}${nutrient.unitName}`;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Search Foods</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Search and add to your daily log
      </p>

      <form onSubmit={handleSearch} className="mt-6">
        <div className="flex gap-2">
          <input
            type="text"
            className="h-12 flex-1 rounded-xl border border-[#B0C4DE] bg-white px-4 text-sm dark:border-gray-700 dark:bg-black"
            placeholder="Type a food (e.g., chicken)"
            value={query}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            autoFocus
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-[#4169E1] px-6 text-sm font-medium text-white hover:bg-[#000080] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
            disabled={loading}
          >
            {loading ? "Searching…" : "Search"}
          </button>
          <button
            type="button"
            className="h-12 rounded-full bg-emerald-500 px-6 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-60 ml-2 transition-colors duration-150"
            onClick={() => dispatch(setShowScanner(true))}
            style={{ boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)' }}
          >
            <svg className="inline-block mr-2 -mt-1" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="2" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="2" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="2" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="2" strokeWidth="2"/></svg>
            Scan Barcode
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      {results.length > 0 && (
        <div className="mt-6 space-y-2">
          {results.map((food) => (
            <div
              key={food.fdcId}
              className="flex items-center gap-3 rounded-xl border border-[#D3D8E0] bg-white p-4 transition-colors hover:bg-[#E0E0E0] dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              <button
                onClick={() => openModal(food)}
                className="flex-1 text-left"
              >
                <div className="font-medium">{food.description}</div>
                {food.brandOwner && (
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {food.brandOwner}
                  </div>
                )}
                <div className="mt-2 flex gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                  <span>{getNutrientValue(food, "Energy")}</span>
                  <span>{getNutrientValue(food, "Protein")} protein</span>
                  <span>{getNutrientValue(food, "Carbohydrate, by difference")} carbs</span>
                  <span>{getNutrientValue(food, "Total lipid (fat)")} fat</span>
                </div>
              </button>
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
          ))}
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <div className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          No results found. Try a different search.
        </div>
      )}

      {/* Modal */}
      {selectedFood && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#B0C4DE] bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">{selectedFood.description}</h2>
            
            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Serving Size
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {SERVING_SIZES.map((size) => (
                  <button
                    key={size.grams}
                    onClick={() => {
                      dispatch(setServingSize(size.grams));
                      dispatch(setCustomServing(""));
                    }}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      servingSize === size.grams && !customServing
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
                value={customServing}
                onChange={(e) => {
                  dispatch(setCustomServing(e.target.value));
                  if (e.target.value) dispatch(setServingSize(parseInt(e.target.value) || 100));
                }}
                className="mt-2 h-10 w-full rounded-lg border border-[#D3D8E0] px-3 text-sm dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Meal Type
              </label>
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
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {isGuest ? (
                <a
                  href="/signup"
                  className="flex-1 rounded-full bg-[#4169E1] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black"
                >
                  Sign up to save this food
                </a>
              ) : (
                <>
                  <button
                    onClick={closeModal}
                    className="rounded-full border border-[#D3D8E0] px-4 py-2 text-sm font-medium hover:bg-[#E0E0E0] dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFavorite}
                    disabled={savingFavorite}
                    className="rounded-full border border-yellow-500 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-100 disabled:opacity-60 dark:border-yellow-600 dark:bg-yellow-950 dark:text-yellow-300 dark:hover:bg-yellow-900"
                  >
                    {savingFavorite ? "Saving..." : "⭐ Save"}
                  </button>
                  <button
                    onClick={handleAddFood}
                    disabled={adding}
                    className="flex-1 rounded-full bg-[#4169E1] px-4 py-2 text-sm font-medium text-white hover:bg-[#000080] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
                  >
                    {adding ? "Adding..." : "Add to Log"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white p-4 rounded-xl shadow-xl relative">
            <button
              className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/80 text-white text-2xl font-extrabold shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              style={{ zIndex: 10, position: 'absolute', padding: 0 }}
              onClick={() => dispatch(setShowScanner(false))}
              aria-label="Close scanner"
            >
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1
                }}
              >
                ×
              </span>
            </button>
            <BarcodeScannerComponent
              width={400}
              height={300}
              onUpdate={(err, result) => {
                if (result) {
                  handleBarcodeDetected((result as unknown as { text: string }).text);
                }
              }}
            />
            <div className="mt-2 text-center text-sm text-zinc-600">Point your camera at a barcode</div>
          </div>
        </div>
      )}
    </div>
  );
}
