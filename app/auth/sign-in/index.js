import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';

export default function SignIn() {
    const navigation = useNavigation();

    const router = useRouter();

    const [email,setemail] = useState();
    const [password,setpassword] = useState();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[]);

    const onSignIn=()=>{

        if(!email&&!password){
            ToastAndroid.show("Please enter Email and Password",ToastAndroid.LONG);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/mytrip')
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    if(errorCode == 'auth/invalid-credential'){
        ToastAndroid.show("Invalid-Credential",ToastAndroid.LONG);
    }});
    }

  return (
    <View style={{
        padding:25,
        color:Colors.WHITE,
        height:'100%',
        paddingTop:80,
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:30,  
        }}>let's Sign You In</Text>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:30,
            color:Colors.GRAY,
            marginTop:20
        }}>Welcome Back</Text>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:30,
            color:Colors.GRAY,
            marginTop:20
        }}>You've been missed!</Text>

        <View 
        style={{
            // add styles here
        }}>
            {/* Email */}
            <View style={{
            marginTop:50,
            }}>
            <Text style={{
                fontFamily:'outfit',
            }}>Email</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(value)=>setemail(value)}
            placeholder='Enter Email'/>
            </View>

            {/* password */}
            <View style={{
                marginTop:20
            }}>
                <Text style={{
                    fontFamily:'outfit',
                }}>Password</Text>
                <TextInput 
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(value)=>setpassword(value)}
                placeholder='Enter Password'/>
            </View>

                {/* signin button */}
            <TouchableOpacity onPress={onSignIn} style={{
                padding:20,
                backgroundColor:Colors.PRIMARY,
                borderRadius:15,
                marginTop:50
            }}>
                <Text style={{
                    color:Colors.WHITE,
                    textAlign:'center'
                }}>Sign In</Text>
            </TouchableOpacity>

            {/* create acc */}
            <TouchableOpacity 
            onPress={()=>router.replace('auth/sign-up')}
            style={{
                padding:20,
                backgroundColor:Colors.WHITE,
                borderRadius:15,
                marginTop:20,
                borderWidth:1
            }}>
                <Text style={{
                    color:Colors.PRIMARY,
                    textAlign:'center'
                }}>Create Account</Text>
            </TouchableOpacity> 
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    padding:15,
    borderWidth:1,
    borderRadius:15,
    borderColor:Colors.GRAY,
    fontFamily:'outfit'
  }
})
