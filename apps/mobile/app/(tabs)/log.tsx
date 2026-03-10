import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LogScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 px-5 py-4">
        <Text className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Log Food
        </Text>
        <Text className="mb-6 text-sm text-zinc-500">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </Text>

        <TouchableOpacity className="mb-3 flex-row items-center gap-4 rounded-2xl bg-[#4169E1] p-5">
          <Text style={{ fontSize: 28 }}>🔍</Text>
          <View>
            <Text className="text-base font-semibold text-white">Search Foods</Text>
            <Text className="text-xs text-blue-200">USDA database · 900,000+ foods</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mb-3 flex-row items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <Text style={{ fontSize: 28 }}>📷</Text>
          <View>
            <Text className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Scan Barcode</Text>
            <Text className="text-xs text-zinc-500">Scan a food product barcode</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <Text style={{ fontSize: 28 }}>✏️</Text>
          <View>
            <Text className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Log Custom Food</Text>
            <Text className="text-xs text-zinc-500">Enter nutrition info manually</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
