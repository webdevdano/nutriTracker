import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiUrl } from "../../lib/api";
import type { UsdaFood } from "@nutritracker/types";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UsdaFood[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl(`/api/foods/search?query=${encodeURIComponent(query)}`));
      const data = await res.json();
      setResults(data.foods ?? []);
    } catch {
      setError("Search failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="px-5 py-4">
        <Text className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Search Foods
        </Text>

        {/* Search input */}
        <View className="flex-row gap-2">
          <TextInput
            className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            placeholder="Search for a food..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={handleSearch}
            className="items-center justify-center rounded-xl bg-[#4169E1] px-4"
          >
            <Text className="text-sm font-semibold text-white">Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-5">
        {loading && (
          <View className="items-center py-10">
            <ActivityIndicator color="#4169E1" />
            <Text className="mt-2 text-sm text-zinc-500">Searching...</Text>
          </View>
        )}

        {error && (
          <View className="rounded-xl border border-red-200 bg-red-50 p-4">
            <Text className="text-sm text-red-700">{error}</Text>
            <Text className="mt-1 text-xs text-red-500">
              Make sure EXPO_PUBLIC_API_URL is set in apps/mobile/.env
            </Text>
          </View>
        )}

        {!loading && results.map((food) => (
          <TouchableOpacity
            key={food.fdcId}
            className="mb-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Text className="font-medium text-zinc-900 dark:text-zinc-50" numberOfLines={2}>
              {food.description}
            </Text>
            {food.brandOwner && (
              <Text className="mt-0.5 text-xs text-zinc-500">{food.brandOwner}</Text>
            )}
            <View className="mt-2 flex-row gap-3">
              {food.foodNutrients?.slice(0, 3).map((n, i) => (
                <Text key={i} className="text-xs text-zinc-400">
                  {n.nutrientName}: {Math.round(n.value)}{n.unitName}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {!loading && !error && results.length === 0 && query.length > 0 && (
          <View className="items-center py-10">
            <Text className="text-zinc-500">No results found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
