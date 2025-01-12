import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './../../../configs/FirebaseConfig';


export default function SignUp() {
  const navigation = useNavigation();

  const router = useRouter();

  const [email,setemail] = useState();
  const [password,setpassword] = useState();
  const [fullName,setfullName] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown:false
    })
  },[]);

  const OnCreateAccount=()=>{

    if(!email&&!password&&!fullName){
      ToastAndroid.show('plese enter all details',ToastAndroid.LONG);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    // ..
  });
  }

  return (
    <View style={{
      padding:25,
      paddingTop:50,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bolt',
        fontSize:30
      }}>Create New Account</Text>

      {/* fullname */}
      <View style={{
            marginTop:50
        }}>
            <Text style={{
                fontFamily:'outfit',
            }}>full Name</Text>
            <TextInput 
            style={styles.input}
            placeholder='Enter full Name'
            onChangeText={(value)=>setfullName(value)}/>
        </View>
      {/* Email */}
      <View style={{
            marginTop:20
        }}>
            <Text style={{
                fontFamily:'outfit',
            }}>Email</Text>
            <TextInput 
            style={styles.input}
            placeholder='Enter Email'
            onChangeText={(value)=>setemail(value)}/>
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
            placeholder='Enter Password'
            onChangeText={(value)=>setpassword(value)}/>
        </View>

          {/* acc open */}
        <TouchableOpacity 
        onPress={OnCreateAccount}
        style={{
            padding:20,
            backgroundColor:Colors.PRIMARY,
            borderRadius:15,
            marginTop:50
        }}>
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center'
            }}>Create Account</Text>
        </TouchableOpacity>

        {/* create acc */}
        <TouchableOpacity 
        onPress={()=>router.replace('auth/sign-in')}
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
            }}>Sign In</Text>
        </TouchableOpacity>
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
