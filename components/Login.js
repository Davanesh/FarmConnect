import { View, Text, Image, StyleSheet,TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router';
import i18next, {languageResources} from './../services/i18next';
import {useTranslation} from 'react-i18next';
import languagesList from './../services/languagesList.json';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login() {
  const router = useRouter();
  const {t} = useTranslation();
  const [visible, setvisible] = useState(false);
  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setvisible(false);
  };

  return (
    <View>
      <View style={{
        borderColor:Colors.GRAY,
        marginTop:40,
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        margin:12,
        justifyContent:'space-between',
      }}>
        <Image source={require('./../assets/images/plain FC.png')}
        style={{
          width:'55%',
          height:30,
          marginLeft:20,
        }}/>
          {/* lng */}
          <Modal visible={visible} 
            onRequestClose={() => setvisible(false)}>
            <View style={{
              backgroundColor:'#f2f2f2',
              display:'flex',
            }}>
              <Image source={require('./../assets/images/plain FC.png')}
              style={{
                width:'55%',
                height:30,
                marginLeft:30,
                marginTop:0,
                marginBottom:14
              }}/>
                
            </View>
          <View style={styles.lng}>
          <Text style={{
              fontSize:26,
              padding:12,
            }}>Choose your language</Text>
            <FlatList data={Object.keys(languageResources)}
            renderItem={({item}) => (
            <TouchableOpacity onPress={() => changeLng(item)}>
              <Text style={{
                fontSize:20,
                display:'flex',
                justifyContent:'center',
                textAlign:'center',
                gap:24,
                padding:8,
                borderWidth:1,
                borderRadius:14,
                margin:4
              }}>{languagesList[item].nativeName}</Text>
            </TouchableOpacity>
          )}/>
          </View>
          </Modal>
          <TouchableOpacity 
          // style={styles.button}
            onPress={() => setvisible(true)}>
          <Ionicons name="language" size={34} color="black" 
        style={{
          padding:10,
        }}/>
          </TouchableOpacity>

      </View>
        <View style={styles.container}>
            {/* iam buyer */}
            <TouchableOpacity style={styles.button}
              onPress={() => router.push('/(tabs)/home')}>
                <Text style={{
                    color:Colors.PRIMARY,
                    textAlign:'center',
                    fontFamily:'outfit-medium',
                    fontSize:22,
                    fontWeight:'bold'
                }}>{t("I am a Buyer")}</Text>
            </TouchableOpacity>

            {/* iam seller */}
            <TouchableOpacity style={styles.button2}
                onPress={() => router.push('auth/sign-in')}
            >
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit-medium',
                fontSize:22,
                fontWeight:'bold'
            }}>{t("I am a Seller")}</Text>
          </TouchableOpacity>
          
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.WHITE,
    marginTop:-20,
    height: "100%",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:25,
    marginTop:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },

  button:{
    padding:15,
    backgroundColor:Colors.GRAY,
    borderRadius:99,

    width:'70%'
  },
  button2:{
    padding:15,
    backgroundColor:Colors.GREEN,
    borderRadius:99,
    marginTop:30,
    width:'70%',
    marginBottom:'60%'
  },

  lng:{
    flex:1,
    justifyContent:'center',
    padding:10,
    backgroundColor:Colors.WHITE,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'50%',
    marginBottom:'50%',
    padding:24,
  },

  lngButton:{
    padding: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  
  lngName:{
    fontSize: 16,
    color: 'white',
  }
})
