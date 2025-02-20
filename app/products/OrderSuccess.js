import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function OrderSuccess() {
  const { cart } = useLocalSearchParams();
  const items = cart ? JSON.parse(decodeURIComponent(cart)) : [];

  useEffect(() => {
    const saveOrder = async () => {
      try {
        await AsyncStorage.setItem('latestOrder', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving order:', error);
      }
    };
    saveOrder();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/OC.png')} style={styles.successImage} />
      <Text style={styles.successText}>Order Placed Successfully!</Text>
      <Text style={styles.orderMessage}>Your order will be delivered soon.</Text>

      <TouchableOpacity style={styles.viewOrderButton} onPress={() => router.push('/products/ViewOrders')}>
        <Text style={styles.buttonText}>View My Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  successImage: { width: 150, height: 150, marginBottom: 20 },
  successText: { fontSize: 24, fontWeight: 'bold', color: Colors.PRIMARY, marginBottom: 10 },
  orderMessage: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  viewOrderButton: { backgroundColor: Colors.GREEN, paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { color: Colors.WHITE, fontSize: 18, fontWeight: 'bold' },
});
