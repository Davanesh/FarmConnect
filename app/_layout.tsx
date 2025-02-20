import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { CartProvider } from "./context/CartContext.js"; // ✅ Import CartProvider

export default function RootLayout() {
  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <CartProvider> {/* ✅ Wrap everything inside CartProvider */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CartProvider>
  );
}
