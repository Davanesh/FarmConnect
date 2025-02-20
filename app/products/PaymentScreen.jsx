import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function PaymentScreen() {
  const { cart, total } = useLocalSearchParams();
  const [timeLeft, setTimeLeft] = useState(60); // 60-second timer

  useEffect(() => {
    if (timeLeft === 0) {
      router.push('../products/Cart'); // Redirect to cart if time expires
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handlePayment = () => {
    router.push({
      pathname: '../products/Checkout',
      params: { cart: JSON.stringify(cart), total: total },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      <Text style={styles.amount}>Total Amount: ₹{total}</Text>
      
      <Text style={styles.timer}>
        Payment will be canceled in: <Text style={styles.timerText}>{timeLeft}s</Text>
      </Text>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  amount: {
    fontSize: 22,
    marginBottom: 20,
    color: '#444',
  },
  timer: {
    fontSize: 18,
    color: '#d9534f',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#2db996',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  payButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
