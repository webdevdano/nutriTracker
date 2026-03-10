/**
 * uiSlice — manages ephemeral UI state that doesn't belong in the server cache.
 * This covers view toggles, modal state, selected items, and form inputs.
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FoodLog, UsdaFood } from "./api";

// ─── Dashboard UI ─────────────────────────────────────────────────────────────

type TimeView = "today" | "week" | "month";

interface DashboardState {
  timeView: TimeView;
  showAllNutrients: boolean;
  editingLog: FoodLog | null;
  editServingSize: number;
  editCustomServing: string;
  updating: boolean;
}

// ─── Search UI ────────────────────────────────────────────────────────────────

interface SearchState {
  query: string;
  selectedFood: UsdaFood | null;
  servingSize: number;
  customServing: string;
  mealType: string;
  showScanner: boolean;
  scannedBarcode: string | null;
  adding: boolean;
  savingFavorite: boolean;
}

// ─── Grocery UI ───────────────────────────────────────────────────────────────

type GroceryTab = "grocery" | "favorites";

interface GroceryState {
  activeTab: GroceryTab;
  newItem: string;
  showMealPlan: boolean;
}

// ─── Root UI State ────────────────────────────────────────────────────────────

interface UiState {
  dashboard: DashboardState;
  search: SearchState;
  grocery: GroceryState;
}

const initialState: UiState = {
  dashboard: {
    timeView: "today",
    showAllNutrients: false,
    editingLog: null,
    editServingSize: 100,
    editCustomServing: "",
    updating: false,
  },
  search: {
    query: "",
    selectedFood: null,
    servingSize: 100,
    customServing: "",
    mealType: "Lunch",
    showScanner: false,
    scannedBarcode: null,
    adding: false,
    savingFavorite: false,
  },
  grocery: {
    activeTab: "grocery",
    newItem: "",
    showMealPlan: false,
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // ── Dashboard ──────────────────────────────────────────────────────────
    setTimeView(state, action: PayloadAction<TimeView>) {
      state.dashboard.timeView = action.payload;
    },
    toggleShowAllNutrients(state) {
      state.dashboard.showAllNutrients = !state.dashboard.showAllNutrients;
    },
    setEditingLog(state, action: PayloadAction<FoodLog | null>) {
      state.dashboard.editingLog = action.payload;
      state.dashboard.editServingSize = 100;
      state.dashboard.editCustomServing = "";
      state.dashboard.updating = false;
    },
    setEditServingSize(state, action: PayloadAction<number>) {
      state.dashboard.editServingSize = action.payload;
    },
    setEditCustomServing(state, action: PayloadAction<string>) {
      state.dashboard.editCustomServing = action.payload;
    },
    setUpdating(state, action: PayloadAction<boolean>) {
      state.dashboard.updating = action.payload;
    },

    // ── Search ─────────────────────────────────────────────────────────────
    setSearchQuery(state, action: PayloadAction<string>) {
      state.search.query = action.payload;
    },
    setSelectedFood(state, action: PayloadAction<UsdaFood | null>) {
      state.search.selectedFood = action.payload;
      state.search.servingSize = 100;
      state.search.customServing = "";
    },
    setServingSize(state, action: PayloadAction<number>) {
      state.search.servingSize = action.payload;
    },
    setCustomServing(state, action: PayloadAction<string>) {
      state.search.customServing = action.payload;
    },
    setMealType(state, action: PayloadAction<string>) {
      state.search.mealType = action.payload;
    },
    setShowScanner(state, action: PayloadAction<boolean>) {
      state.search.showScanner = action.payload;
    },
    setScannedBarcode(state, action: PayloadAction<string | null>) {
      state.search.scannedBarcode = action.payload;
    },
    setAdding(state, action: PayloadAction<boolean>) {
      state.search.adding = action.payload;
    },
    setSavingFavorite(state, action: PayloadAction<boolean>) {
      state.search.savingFavorite = action.payload;
    },

    // ── Grocery ────────────────────────────────────────────────────────────
    setActiveTab(state, action: PayloadAction<GroceryTab>) {
      state.grocery.activeTab = action.payload;
    },
    setNewItem(state, action: PayloadAction<string>) {
      state.grocery.newItem = action.payload;
    },
    setShowMealPlan(state, action: PayloadAction<boolean>) {
      state.grocery.showMealPlan = action.payload;
    },
  },
});

export const {
  // Dashboard
  setTimeView,
  toggleShowAllNutrients,
  setEditingLog,
  setEditServingSize,
  setEditCustomServing,
  setUpdating,
  // Search
  setSearchQuery,
  setSelectedFood,
  setServingSize,
  setCustomServing,
  setMealType,
  setShowScanner,
  setScannedBarcode,
  setAdding,
  setSavingFavorite,
  // Grocery
  setActiveTab,
  setNewItem,
  setShowMealPlan,
} = uiSlice.actions;
