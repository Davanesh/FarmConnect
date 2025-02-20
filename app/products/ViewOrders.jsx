import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

export default function ViewMyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem("latestOrder");
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const TAX_RATE = 0.05;

  const calculateTotals = (items) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * TAX_RATE;

    
    return { subtotal, tax, total: subtotal + tax };
  };

  const orderId = `FC-${Math.floor(100000 + Math.random() * 900000)}`;
  const paymentMethod = "UPI (Google Pay)"; // Mock Payment Method
  const orderDate = new Date().toLocaleDateString();

  const { subtotal, tax, total } = calculateTotals(orders);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      {orders.length === 0 ? (
        <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
      ) : (
        <>
          <View style={styles.orderDetails}>
            <Text style={styles.orderInfo}>Transaction ID: {orderId}</Text>
            <Text style={styles.orderInfo}>Order Date: {orderDate}</Text>
            <View style={styles.paymentRow}>
              <MaterialIcons name="payment" size={20} color="#444" />
              <Text style={styles.paymentMethod}>{paymentMethod}</Text>
            </View>
          </View>

          {orders.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image
                style={styles.img}
                source={typeof item.image === "string" ? { uri: item.image } : item.image}
              />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.seller}>Seller: Arun Groups</Text>
                <Text style={styles.price}>
                  ₹{item.price} x {item.quantity} = ₹
                  {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.summary}>
            <Text style={styles.summaryText}>Subtotal: ₹{subtotal.toFixed(2)}</Text>
            <Text style={styles.summaryText}>Tax (5%): ₹{tax.toFixed(2)}</Text>
            <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>
          </View>

          <View style={styles.orderStatus}>
            <Ionicons name="checkmark-circle-outline" size={30} color="green" />
            <Text style={styles.statusText}>Ordered</Text>
          </View>

          
        </>
      )}

      <View style={styles.footer}>
        <Text style={styles.thankYou}>Thank you for shopping with us!</Text>
        <TouchableOpacity onPress={() => router.push("/app/(tabs)/home")}>
          <Image
            source={require("../../assets/images/FC_logo-removebg-preview.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 30, backgroundColor: "#f8f8f8" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  emptyText: { fontSize: 18, textAlign: "center", color: "#777", marginTop: 20 },
  
  orderDetails: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderInfo: { fontSize: 16, fontWeight: "bold", color: "#444", marginBottom: 5 },
  paymentRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  paymentMethod: { fontSize: 16, color: "#555", marginLeft: 8 },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  img: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  seller: { fontSize: 14, color: "#666", marginTop: 5 },
  price: { fontSize: 16, fontWeight: "bold", marginTop: 5 },

  summary: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryText: { fontSize: 16, marginBottom: 5 },
  total: { fontSize: 18, fontWeight: "bold", color: "green", marginTop: 5 },

  orderStatus: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaffea",
    padding: 10,
    borderRadius: 10,
  },
  statusText: { fontSize: 18, fontWeight: "bold", color: "green", marginLeft: 10 },

  footer: { marginTop: 30, alignItems: "center", paddingBottom: 25, },
  logo: { width: 200, height: 50, marginTop: 5 },
  thankYou: { fontSize: 18, fontWeight: "bold", color: Colors.PRIMARY },
});
