import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import i18next, { languageResources } from './../services/i18next';
import { useTranslation } from 'react-i18next';
import languagesList from './../services/languagesList.json';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('./../assets/images/plain FC.png')} style={styles.logo} />

        {/* Language Selector */}
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Ionicons name="language" size={34} color="black" style={styles.languageIcon} />
        </TouchableOpacity>
      </View>

      {/* Language Selection Modal */}
      <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('./../assets/images/plain FC.png')} style={styles.modalLogo} />
            <Text style={styles.modalTitle}>Choose Your Language</Text>

            <FlatList
              data={Object.keys(languageResources)}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => changeLng(item)} style={styles.languageOption}>
                  <Text style={styles.languageText}>{languagesList[item].nativeName}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Main Container */}
      <View style={styles.container}>
        {/* Buyer Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.buyerText}>{t("I am a Buyer")}</Text>
        </TouchableOpacity>

        {/* Seller Button */}
        <TouchableOpacity style={styles.sellerButton} onPress={() => router.push('auth/sign-in')}>
          <Text style={styles.sellerText}>{t("I am a Seller")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.gre,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    width: '50%',
    height: 40,
    resizeMode: 'contain',
  },
  languageIcon: {
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.WHITE,
    paddingTop: 40,
  },
  button: {
    paddingVertical: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    width: '75%',
    alignItems: 'center',
  },
  sellerButton: {
    paddingVertical: 15,
    backgroundColor: Colors.GREEN,
    borderRadius: 99,
    width: '75%',
    alignItems: 'center',
    marginTop: 20,
  },
  buyerText: {
    color: Colors.PRIMARY,
    fontSize: 22,
    fontWeight: 'bold',
  },
  sellerText: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalLogo: {
    width: '60%',
    height: 30,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

