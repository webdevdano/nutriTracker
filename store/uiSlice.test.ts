import { uiSlice } from "./uiSlice";
import type { FoodLog } from "./api";

// Minimal valid FoodLog for tests
function makeFoodLog(overrides: Partial<FoodLog> = {}): FoodLog {
  return {
    id: "log-1",
    fdc_id: 123,
    food_name: "Apple",
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    sodium: 1,
    saturated_fat: null,
    trans_fat: null,
    polyunsaturated_fat: null,
    monounsaturated_fat: null,
    cholesterol: null,
    sugars: null,
    added_sugars: null,
    vitamin_a: null,
    vitamin_c: null,
    vitamin_d: null,
    vitamin_e: null,
    vitamin_k: null,
    thiamin: null,
    riboflavin: null,
    niacin: null,
    vitamin_b6: null,
    folate: null,
    vitamin_b12: null,
    calcium: null,
    iron: null,
    magnesium: null,
    phosphorus: null,
    potassium: null,
    zinc: null,
    selenium: null,
    quantity: 1,
    time: "12:00",
    date: "2026-01-01",
    ...overrides,
  };
}

const {
  setTimeView,
  toggleShowAllNutrients,
  setEditingLog,
  setEditServingSize,
  setEditCustomServing,
  setUpdating,
  setSearchQuery,
  setSelectedFood,
  setServingSize,
  setMealType,
  setShowScanner,
  setAdding,
  setSavingFavorite,
  setActiveTab,
  setNewItem,
  setShowMealPlan,
} = uiSlice.actions;

const reducer = uiSlice.reducer;

// ─── Dashboard slice ──────────────────────────────────────────────────────────

describe("uiSlice — dashboard", () => {
  it("has correct initial state", () => {
    const state = reducer(undefined, { type: "@@init" });
    expect(state.dashboard.timeView).toBe("today");
    expect(state.dashboard.showAllNutrients).toBe(false);
    expect(state.dashboard.editingLog).toBeNull();
    expect(state.dashboard.editServingSize).toBe(100);
    expect(state.dashboard.updating).toBe(false);
  });

  it("setTimeView changes the time view", () => {
    const next = reducer(undefined, setTimeView("week"));
    expect(next.dashboard.timeView).toBe("week");

    const next2 = reducer(next, setTimeView("month"));
    expect(next2.dashboard.timeView).toBe("month");
  });

  it("toggleShowAllNutrients flips the boolean", () => {
    const s1 = reducer(undefined, toggleShowAllNutrients());
    expect(s1.dashboard.showAllNutrients).toBe(true);

    const s2 = reducer(s1, toggleShowAllNutrients());
    expect(s2.dashboard.showAllNutrients).toBe(false);
  });

  it("setEditingLog stores the log and resets edit fields", () => {
    const log = makeFoodLog();

    // Pre-dirty the state
    let state = reducer(undefined, setEditServingSize(250));
    state = reducer(state, setEditCustomServing("2 cups"));
    state = reducer(state, setUpdating(true));

    const next = reducer(state, setEditingLog(log));
    expect(next.dashboard.editingLog).toEqual(log);
    expect(next.dashboard.editServingSize).toBe(100);
    expect(next.dashboard.editCustomServing).toBe("");
    expect(next.dashboard.updating).toBe(false);
  });

  it("setEditingLog(null) clears the editing log", () => {
    let state = reducer(undefined, setEditingLog(makeFoodLog()));
    const next = reducer(state, setEditingLog(null));
    expect(next.dashboard.editingLog).toBeNull();
  });

  it("setEditServingSize updates the serving size", () => {
    const next = reducer(undefined, setEditServingSize(150));
    expect(next.dashboard.editServingSize).toBe(150);
  });

  it("setUpdating toggles the updating flag", () => {
    const s1 = reducer(undefined, setUpdating(true));
    expect(s1.dashboard.updating).toBe(true);
    const s2 = reducer(s1, setUpdating(false));
    expect(s2.dashboard.updating).toBe(false);
  });
});

// ─── Search slice ─────────────────────────────────────────────────────────────

describe("uiSlice — search", () => {
  it("has correct initial state", () => {
    const state = reducer(undefined, { type: "@@init" });
    expect(state.search.query).toBe("");
    expect(state.search.selectedFood).toBeNull();
    expect(state.search.servingSize).toBe(100);
    expect(state.search.mealType).toBe("Lunch");
    expect(state.search.adding).toBe(false);
  });

  it("setSearchQuery updates the query", () => {
    const next = reducer(undefined, setSearchQuery("chicken"));
    expect(next.search.query).toBe("chicken");
  });

  it("setSelectedFood stores food and resets servingSize + customServing", () => {
    let state = reducer(undefined, setServingSize(250));
    state = reducer(state, { type: uiSlice.actions.setCustomServing.type, payload: "2 cups" });

    const food = { fdcId: 789, description: "Chicken breast", dataType: "Foundation" };
    const next = reducer(state, setSelectedFood(food));
    expect(next.search.selectedFood).toEqual(food);
    expect(next.search.servingSize).toBe(100);
    expect(next.search.customServing).toBe("");
  });

  it("setSelectedFood(null) clears the selection", () => {
    const food = { fdcId: 789, description: "Chicken breast", dataType: "Foundation" };
    let state = reducer(undefined, setSelectedFood(food));
    const next = reducer(state, setSelectedFood(null));
    expect(next.search.selectedFood).toBeNull();
  });

  it("setMealType changes the meal type", () => {
    const next = reducer(undefined, setMealType("Breakfast"));
    expect(next.search.mealType).toBe("Breakfast");
  });

  it("setShowScanner toggles scanner", () => {
    const next = reducer(undefined, setShowScanner(true));
    expect(next.search.showScanner).toBe(true);
  });

  it("setAdding sets the adding flag", () => {
    const next = reducer(undefined, setAdding(true));
    expect(next.search.adding).toBe(true);
  });

  it("setSavingFavorite sets the savingFavorite flag", () => {
    const next = reducer(undefined, setSavingFavorite(true));
    expect(next.search.savingFavorite).toBe(true);
  });
});

// ─── Grocery slice ────────────────────────────────────────────────────────────

describe("uiSlice — grocery", () => {
  it("has correct initial state", () => {
    const state = reducer(undefined, { type: "@@init" });
    expect(state.grocery.activeTab).toBe("grocery");
    expect(state.grocery.newItem).toBe("");
    expect(state.grocery.showMealPlan).toBe(false);
  });

  it("setActiveTab switches to favorites", () => {
    const next = reducer(undefined, setActiveTab("favorites"));
    expect(next.grocery.activeTab).toBe("favorites");
  });

  it("setNewItem updates the new item text", () => {
    const next = reducer(undefined, setNewItem("Eggs"));
    expect(next.grocery.newItem).toBe("Eggs");
  });

  it("setShowMealPlan toggles the meal plan panel", () => {
    const s1 = reducer(undefined, setShowMealPlan(true));
    expect(s1.grocery.showMealPlan).toBe(true);
    const s2 = reducer(s1, setShowMealPlan(false));
    expect(s2.grocery.showMealPlan).toBe(false);
  });
});
