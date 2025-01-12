import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Zocial from '@expo/vector-icons/Zocial';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, timestamp: new Date() }]);
      setInput('');
    }
  };
  const sendMessage2 = () => {
    if (preMessage.trim()) {
      setMessages([...messages, { text: preMessage, timestamp: new Date() }]);
      setInput('');
    }
  }
  const [preMessage, setpreMessage] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[]);
  return (
    
    <SafeAreaView style={styles.container}>
        <View style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            flexDirection:'row'
        }}>
        <TouchableOpacity>
            <Ionicons name="arrow-back" size={32} color="black" 
            style={{
                padding:20,
            }}/>
        </TouchableOpacity>
        <Text style={{
            margin:20,
            fontSize:24,
            marginRight:'30%'
        }}>Product Base Purchase</Text>
        </View>


      <ScrollView style={styles.chatWindow}>
        {messages.map((message, index) => (
          <View key={index} style={styles.message}>
            
            <Text style={styles.timestamp}>
              {message.timestamp.toLocaleTimeString()}
            </Text>
            <Text style={styles.text}>{message.text}</Text>
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
        <Button title="Send" onPress={sendMessage} />
        <Zocial name="call" size={26} color="black" 
        style={{padding:12}}/>
        <MaterialIcons name="keyboard-voice" size={26} color="black" 
        style={{
            padding:12,           
        }}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop:30
  },
  chatWindow: {
    flex: 1,
    padding: 10,
  },
  message: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e1ffc7',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
  },
  text: {
    fontSize: 16,
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
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default ChatApp;
