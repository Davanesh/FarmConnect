import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Zocial from '@expo/vector-icons/Zocial';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, timestamp: new Date(), sender: 'user' }]);
      setInput('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Base</Text>
      </View>

      <ScrollView style={styles.chatWindow}>
        {messages.map((message, index) => (
          <View key={index} style={[styles.message, message.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.text}>{message.text}</Text>
            <Text style={styles.timestamp}>{message.timestamp.toLocaleTimeString()}</Text>
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
        <TouchableOpacity>
          <Zocial name="call" size={26} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="keyboard-voice" size={26} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
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
    marginLeft:10,
    paddingRight: 70,
    marginTop:20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop:20,
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
    marginTop:10,
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
});

export default ChatApp;