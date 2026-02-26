import { create } from 'zustand';

// Define the shape of your global state
type Meal = {
  id: string;
  name: string;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
};

interface NutritionState {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
  updateMeal: (meal: Meal) => void;
}

// Create Zustand store
export const useNutritionStore = create<NutritionState>((set) => ({
  meals: [],
  addMeal: (meal) => set((state) => ({ meals: [...state.meals, meal] })),
  removeMeal: (id) => set((state) => ({ meals: state.meals.filter((m) => m.id !== id) })),
  updateMeal: (meal) => set((state) => ({
    meals: state.meals.map((m) => (m.id === meal.id ? meal : m)),
  })),
}));
