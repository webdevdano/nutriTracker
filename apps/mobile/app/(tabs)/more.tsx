import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const QUICK_ACTIONS = [
  { emoji: "🍎", label: "Search Foods", route: "/search" },
  { emoji: "📖", label: "My Meals",     route: "/meals"  },
  { emoji: "📋", label: "Grocery List", route: "/grocery"},
  { emoji: "📚", label: "Learn",        route: "/learn"  },
];

export default function MoreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ScrollView className="flex-1 px-5 py-4">
        <Text className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          More
        </Text>

        <View className="gap-3">
          {QUICK_ACTIONS.map((a) => (
            <TouchableOpacity
              key={a.label}
              className="flex-row items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Text style={{ fontSize: 28 }}>{a.emoji}</Text>
              <Text className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                {a.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <Text className="mb-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Backend URL
          </Text>
          <Text className="text-xs font-mono text-zinc-500">
            {process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000"}
          </Text>
          <Text className="mt-2 text-xs text-zinc-400">
            Set EXPO_PUBLIC_API_URL in apps/mobile/.env to point to your deployed server
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
