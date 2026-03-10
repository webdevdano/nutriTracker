import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ScrollView className="flex-1 px-5 py-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Progress
          </Text>
          <Text className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {today}
          </Text>
        </View>

        {/* Calories card */}
        <View className="mb-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Text className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Calories Remaining
          </Text>
          <Text className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            —
          </Text>
          <Text className="mt-1 text-xs text-zinc-400">
            Sign in to track your progress
          </Text>
        </View>

        {/* Macro row */}
        <View className="mb-4 flex-row gap-3">
          {["Protein", "Carbs", "Fat"].map((macro) => (
            <View
              key={macro}
              className="flex-1 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                {macro}
              </Text>
              <Text className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">
                —
              </Text>
            </View>
          ))}
        </View>

        {/* Sign in prompt */}
        <TouchableOpacity className="items-center rounded-2xl bg-[#4169E1] py-4">
          <Text className="text-sm font-semibold text-white">
            Sign in to track your nutrition
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
