import { Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2E8B57", // Active tab color (SeaGreen)
        tabBarInactiveTintColor: "#666", // Inactive tab color
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          elevation: 5,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="buy_again"
        options={{
          tabBarLabel: "Order Again",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="loop" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag-handle-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
