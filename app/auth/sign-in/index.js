import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ToastAndroid, 
  ImageBackground 
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter Email and Password", ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/mytrip');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          ToastAndroid.show("Invalid Credentials", ToastAndroid.LONG);
        }
      });
  };

  return (
    <ImageBackground source={require('../../../assets/images/sign-in.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Let's Sign You In</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
        <Text style={styles.subtitle}>You've been missed!</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            placeholder='Enter Email'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
            placeholder='Enter Password'
          />

          <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('auth/sign-up')} style={styles.createAccountButton}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 25,
    height: '100%',
    paddingTop: 80,
  },
  title: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    color: Colors.WHITE,
  },
  subtitle: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    color: Colors.LIGHT_GRAY,
    marginTop: 10,
  },
  formContainer: {
    marginTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'outfit',
    marginBottom: 5,
    color: Colors.DARK_GRAY,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
    backgroundColor: Colors.WHITE,
    marginBottom: 15,
  },
  signInButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  signInText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  createAccountText: {
    color: Colors.PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
