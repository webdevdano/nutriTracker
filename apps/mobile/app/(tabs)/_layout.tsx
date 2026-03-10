import { Tabs } from "expo-router";
import { View, Text } from "react-native";

function TabIcon({
  label,
  focused,
  children,
}: {
  label: string;
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <View className="items-center gap-0.5">
      <View className={focused ? "text-primary dark:text-primary-dark" : ""}>
        {children}
      </View>
      <Text
        className={`text-[10px] font-medium ${
          focused ? "text-[#4169E1]" : "text-zinc-400"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#D3D8E0",
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#4169E1",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Progress" focused={focused}>
              {/* Home icon */}
              <Text style={{ fontSize: 22 }}>🏠</Text>
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Search" focused={focused}>
              <Text style={{ fontSize: 22 }}>🔍</Text>
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Log" focused={focused}>
              <Text style={{ fontSize: 22 }}>➕</Text>
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="nutrients"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="Nutrients" focused={focused}>
              <Text style={{ fontSize: 22 }}>📊</Text>
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon label="More" focused={focused}>
              <Text style={{ fontSize: 22 }}>⋯</Text>
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
