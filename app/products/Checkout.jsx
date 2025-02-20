import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/Colors';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem('latestOrder');
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
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    return { subtotal, tax, total: subtotal + tax };
  };

  const { subtotal, tax, total } = orders.length > 0 ? calculateTotals(orders) : { subtotal: 0, tax: 0, total: 0 };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      {orders.length === 0 ? (
        <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
      ) : (
        <>
          {orders.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image style={styles.img} source={{ uri: item.image }} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.seller}>Seller: Arun Groups</Text>
                <Text style={styles.price}>₹{item.price} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          ))}

          <View style={styles.summary}>
            <Text style={styles.summaryText}>Subtotal: ₹{subtotal.toFixed(2)}</Text>
            <Text style={styles.summaryText}>Tax (5%): ₹{tax.toFixed(2)}</Text>
            <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>
          </View>
        </>
      )}

      <View style={styles.footer}>
        <Text style={styles.thankYou}>Thank you for shopping with us!</Text>
        <Image source={require('../../assets/images/FC_logo-removebg-preview.png')} style={styles.logo} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 30 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  emptyText: { fontSize: 18, textAlign: 'center', color: '#777', marginTop: 20 },
  card: { flexDirection: 'row', backgroundColor: '#f5f5f5', borderRadius: 12, padding: 15, marginBottom: 10 },
  img: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  seller: { fontSize: 14, color: '#666', marginTop: 5 },
  price: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  summary: { marginTop: 10, padding: 10, backgroundColor: '#e0e0e0', borderRadius: 10 },
  summaryText: { fontSize: 16, marginBottom: 5 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  footer: { marginTop: 20, alignItems: 'center' },
  logo: { width: 200, height: 50, marginTop: 5 },
  thankYou: { fontSize: 18, fontWeight: 'bold', color: Colors.PRIMARY },
});
