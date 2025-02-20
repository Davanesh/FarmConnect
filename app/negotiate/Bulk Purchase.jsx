import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from 'react-native';
import { Audio } from 'expo-av';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Zocial from '@expo/vector-icons/Zocial';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router';
import Modal from 'react-native-modal';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(null);
  const [isCallModalVisible, setCallModalVisible] = useState(false); // State for custom modal
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  // Function to get AI-based replies
  const getFarmerReply = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('price')) {
      return "The price depends on the quantity. Can you specify how much you need?";
    } else if (lowerCaseMessage.includes('available') || lowerCaseMessage.includes('stock')) {
      return "Yes, we have fresh stock available. What are you looking for?";
    } else if (lowerCaseMessage.includes('delivery')) {
      return "We offer delivery services. Please share your location for delivery options.";
    } else if (lowerCaseMessage.includes('discount')) {
      return "We offer discounts for bulk purchases. How much do you need?";
    } else {
      return "Right now the Seller is in Away. For more details, please contact our support: 📞 +91 98765XXXXX";
    }
  };

  // Function to send text message
  const sendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, timestamp: new Date(), sender: 'user', type: 'text' };
      setMessages([...messages, userMessage]);
      setInput('');

      setTimeout(() => {
        const farmerReply = getFarmerReply(input);
        const botMessage = { text: farmerReply, timestamp: new Date(), sender: 'bot', type: 'text' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  // Function to handle calling the farmer
  const callFarmer = () => {
    const phoneNumber = '+919876543210';
    setCallModalVisible(true); // Show custom modal
  };

  // Function to handle the "Call Now" button press
  const handleCallNow = () => {
    const phoneNumber = '+919876543210';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('🚨 Error', '❌ Calling is not supported on this device.');
    });
  };

  // Function to start or stop recording
  const handleVoiceRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        // Save the voice message in the chat
        const voiceMessage = { uri, timestamp: new Date(), sender: 'user', type: 'audio' };
        setMessages((prevMessages) => [...prevMessages, voiceMessage]);

        setRecording(null);
      } else {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'You need to grant audio recording permissions.');
          return;
        }

        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await newRecording.startAsync();
        setRecording(newRecording);
      }
    } catch (error) {
      Alert.alert('Recording Error', 'Something went wrong while recording.');
      console.error(error);
    }
  };

  // Function to play audio messages
  const playAudio = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bulk Purchase</Text>
      </View>

      <ScrollView style={styles.chatWindow}>
        {messages.map((message, index) => (
          <View key={index} style={[styles.message, message.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            {message.type === 'text' ? (
              <>
                <Text style={styles.text}>{message.text}</Text>
                <Text style={styles.timestamp}>{message.timestamp.toLocaleTimeString()}</Text>
              </>
            ) : (
              <TouchableOpacity onPress={() => playAudio(message.uri)} style={styles.audioMessage}>
                <MaterialIcons name="play-circle-filled" size={32} color="black" />
                <Text style={styles.text}>Voice Message</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={callFarmer}>
          <Zocial name="call" size={26} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVoiceRecording}>
          <MaterialIcons name={recording ? "stop" : "keyboard-voice"} size={26} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Custom Modal for Call Now */}
      <Modal isVisible={isCallModalVisible} onBackdropPress={() => setCallModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>📢 Farmer's Contact</Text>
          <Text style={styles.modalMessage}>
            📞 **Phone Number:** +9198765XXXXX
            {"\n\n"}
            🛒 **Need fresh produce?** Call now to discuss availability, pricing, and delivery options! 🚜🌱
            {"\n\n"}
            📍 **Location-based delivery is available.**
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setCallModalVisible(false)}>
              <Text style={styles.cancelButtonText}>❌ Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton} onPress={handleCallNow}>
              <Text style={styles.callButtonText}>📞 Call Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2db996',
    elevation: 5,
  },
  backIcon: {
    marginLeft: 10,
    paddingRight: 65,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
  chatWindow: {
    flex: 1,
    paddingHorizontal: 10,
  },
  message: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  userMessage: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1ffc7',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  audioMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#2db996',
    borderRadius: 24,
    padding: 10,
    marginLeft: 8,
  },
  icon: {
    padding: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  callButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2db996',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  callButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatApp;