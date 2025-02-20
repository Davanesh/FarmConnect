import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'; // Import for back button icon

const PaymentProcessing = () => {
  const { cart } = useLocalSearchParams();
  const parsedCart = JSON.parse(decodeURIComponent(cart));

  const totalAmount = parsedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [status, setStatus] = useState('select');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [bankCredentials, setBankCredentials] = useState({ username: '', password: '' });

  useEffect(() => {
    if (status === 'processing') {
      setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
          router.push({
            pathname: '../products/OrderSuccess',
            params: { cart: JSON.stringify(parsedCart), totalAmount: totalAmount.toString() },
          });
        }, 1000);
      }, 3000);
    }
  }, [status]);

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    if (method === 'COD') {
      setStatus('processing');
    } else {
      setStatus('details');
    }
  };

  const handleProceedPayment = () => {
    setStatus('processing');
  };

  const handleBack = () => {
    if (status === 'details') setStatus('select');
    else if (status === 'processing') setStatus('details');
  };

  return (
    <View style={styles.container}>
      {/* Back Button - Show if not in the selection screen */}
      {status !== 'select' && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color="#333" />
        </TouchableOpacity>
      )}

      {status === 'select' ? (
        <>
          <Text style={styles.header}>Choose a Payment Method</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.option} onPress={() => handlePaymentSelection('Card')}>
              <Image source={require('../../assets/images/debit-card.png')} style={styles.icon} />
              <Text style={styles.optionText}>Credit / Debit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => handlePaymentSelection('UPI')}>
              <Image source={require('../../assets/images/upi.png')} style={styles.icon} />
              <Text style={styles.optionText}>UPI / QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => handlePaymentSelection('Net Banking')}>
              <Image source={require('../../assets/images/bank.png')} style={styles.icon} />
              <Text style={styles.optionText}>Net Banking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => handlePaymentSelection('COD')}>
              <Image source={require('../../assets/images/cod.png')} style={styles.icon} />
              <Text style={styles.optionText}>Cash on Delivery</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : status === 'details' ? (
        <>
          <Text style={styles.header}>Enter {paymentMethod} Details</Text>
          <View style={styles.detailsContainer}>
            {paymentMethod === 'Card' && (
              <>
                <Image source={require('../../assets/images/debit-card.png')} style={styles.debitcard} />
                <TextInput
                  style={styles.input}
                  placeholder="Card Number"
                  keyboardType="numeric"
                  value={cardDetails.number}
                  onChangeText={(text) => setCardDetails({ ...cardDetails, number: text })}
                />
                <View style={styles.cardRow}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Expiry Date (MM/YY)"
                    keyboardType="numeric"
                    value={cardDetails.expiry}
                    onChangeText={(text) => setCardDetails({ ...cardDetails, expiry: text })}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="CVV"
                    keyboardType="numeric"
                    secureTextEntry
                    value={cardDetails.cvv}
                    onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                  />
                </View>
              </>
            )}
            {paymentMethod === 'UPI' && (
              <>
                <Image source={require('../../assets/images/qr-code.png')} style={styles.qrCode} />
                <Text style={styles.qrText}>Scan this QR code or enter UPI ID below:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter UPI ID (e.g. yourname@upi)"
                  value={upiId}
                  onChangeText={setUpiId}
                />
              </>
            )}
            {paymentMethod === 'Net Banking' && (
              <>
                <Image source={require('../../assets/images/netBanking.png')} style={styles.netBanking} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={bankCredentials.username}
                  onChangeText={(text) => setBankCredentials({ ...bankCredentials, username: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={bankCredentials.password}
                  onChangeText={(text) => setBankCredentials({ ...bankCredentials, password: text })}
                />
              </>
            )}
            <TouchableOpacity style={styles.payButton} onPress={handleProceedPayment}>
              <Text style={styles.payText}>Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : status === 'processing' ? (
        <>
          <Image source={require('../../assets/images/payment-process.gif')} style={styles.loadingImg} />
          <Text style={styles.processingText}>Processing Payment...</Text>
        </>
      ) : (
        <>
          <Image source={require('../../assets/images/payment-success.png')} style={styles.successImg} />
          <Text style={styles.successText}>Payment Successful!</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  debitcard:{
    width: 310,
    height: 180,
    alignSelf: 'center',
    marginBottom: 12,
  },
  qrCode: {
    width: 280,
    height: 180,
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  qrText: {
    fontSize: 17,
    textAlign: 'center',
    color: '#555',
    marginBottom: 12,
    fontWeight: '500',
  },
  netBanking: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: Colors.PRIMARY },
  optionsContainer: { width: '100%' },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f9fa', padding: 15, borderRadius: 12, marginBottom: 10 },
  icon: { width: 40, height: 40, marginRight: 15 },
  optionText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  detailsContainer: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 12, },
  input: { width: '100%', padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10 },
  payButton: { backgroundColor: Colors.GREEN, padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', },
  payText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },processingText: {
    fontSize: 18,
    marginTop: 20,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 22,
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },loadingImg: {
    width: 130,
    height: 130,
  },
  successImg: {
    width: 110,
    height: 110,
  },
});

export default PaymentProcessing;
