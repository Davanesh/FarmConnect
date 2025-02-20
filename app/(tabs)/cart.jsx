import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useCart } from "../context/CartContext";
import { router } from "expo-router";

export default function Cart() {
  const TAX_RATE = 0.05;
  const { cart, setCart, removeFromCart } = useCart();

  console.log("Cart Data:", cart); // ✅ Debugging: Check cart structure

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) }
          : item
      )
    );
  };

  // ✅ Safely convert price to number and ensure no NaN issues
  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  const taxAmount = subtotal * TAX_RATE;
  const totalAmount = subtotal + taxAmount;

  const navigateToPaymentProcessing = () => {
    router.push({
      pathname: "../products/PaymentProcessing",
      params: { cart: encodeURIComponent(JSON.stringify(cart)) },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>
      {cart.length > 0 ? (
        cart.map((item) => {
          const itemPrice = Number(item.price) || 0; // ✅ Convert price safely

          return (
            <View key={item.id} style={styles.card}>
              <Image 
                style={styles.productImage} 
                source={typeof item.image === "string" ? { uri: item.image } : item.image} 
              />

              <View style={styles.detailsContainer}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.sellerText}>Seller: {item.seller}</Text>

                {/* ✅ Display correct price */}
                <Text style={styles.price}>
                  ₹{(itemPrice * (item.quantity || 1)).toFixed(2)}
                </Text>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{item.quantity || 1}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      )}

      {cart.length > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Subtotal: ₹{subtotal.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Tax (5%): ₹{taxAmount.toFixed(2)}</Text>
          <Text style={styles.totalAmount}>Total: ₹{totalAmount.toFixed(2)}</Text>

          <TouchableOpacity style={styles.buyButton} onPress={navigateToPaymentProcessing}>
            <Text style={styles.buyButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2", marginTop: 25 },
  header: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
  detailsContainer: { flex: 1 },
  productTitle: { fontSize: 16, fontWeight: "bold" },
  sellerText: { fontSize: 14, color: "#555", marginTop: 3 },
  price: { fontSize: 18, fontWeight: "bold", color: Colors.PRIMARY, marginVertical: 5 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 110,
    justifyContent: "space-between",
    padding: 5,
  },
  quantityButton: { paddingHorizontal: 12 },
  quantityText: { fontSize: 20, fontWeight: "bold" },
  counterText: { fontSize: 18, fontWeight: "bold" },
  removeButton: {
    marginTop: 5,
    backgroundColor: "#FF4D4D",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  removeButtonText: { color: "#fff", fontWeight: "bold" },
  summaryContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 15,
  },
  summaryText: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  totalAmount: { fontSize: 22, fontWeight: "bold", color: "green", textAlign: "center", marginVertical: 10 },
  buyButton: { backgroundColor: Colors.GREEN, padding: 15, borderRadius: 10, alignItems: "center" },
  buyButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  emptyCartText: { fontSize: 18, textAlign: "center", fontWeight: "bold", color: "#888", marginTop: 20 },
});
