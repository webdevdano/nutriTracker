import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RDI: Record<string, { label: string; unit: string; value: number }> = {
  fiber:     { label: "Fiber",     unit: "g",  value: 28   },
  vitamin_c: { label: "Vitamin C", unit: "mg", value: 90   },
  vitamin_d: { label: "Vitamin D", unit: "µg", value: 20   },
  calcium:   { label: "Calcium",   unit: "mg", value: 1000 },
  iron:      { label: "Iron",      unit: "mg", value: 18   },
  potassium: { label: "Potassium", unit: "mg", value: 4700 },
  zinc:      { label: "Zinc",      unit: "mg", value: 11   },
  magnesium: { label: "Magnesium", unit: "mg", value: 420  },
};

export default function NutrientsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ScrollView className="flex-1 px-5 py-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Nutrients
          </Text>
          <Text className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Today&apos;s micronutrient breakdown
          </Text>
        </View>

        {/* Summary banner */}
        <View className="mb-5 rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/30">
          <Text className="text-sm text-zinc-600 dark:text-zinc-300">
            Sign in to see your nutrient progress vs daily recommended intakes.
          </Text>
        </View>

        {/* Nutrient rows */}
        {Object.entries(RDI).map(([key, { label, unit, value }]) => (
          <View
            key={key}
            className="mb-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="font-medium text-zinc-900 dark:text-zinc-50">
                {label}
              </Text>
              <Text className="text-xs text-zinc-400">
                — / {value}{unit}
              </Text>
            </View>
            {/* Progress bar background */}
            <View className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <View className="h-full w-0 rounded-full bg-zinc-300" />
            </View>
            <Text className="mt-1 text-[10px] text-zinc-400">0% of daily value</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
