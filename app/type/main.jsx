import React from "react";
import { View,Text, TouchableOpacity,StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useRouter } from 'expo-router';

export default function Main(){

    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>What type of Negotiation you want to choice</Text>
            <TouchableOpacity style={styles.button}
            onPress={ () => router.replace('/negotiate/product_base')}>
                <Text style={styles.text}>Product Base</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}
            onPress={ () => router.replace('/negotiate/Bulk Purchase')}>
                <Text style={styles.text2}>Bulk Purchase</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={ () => router.replace('/negotiate/Frequent Purchase')}>
                <Text style={styles.text}>Frequent Purchase</Text>
            </TouchableOpacity>
        </View>
    );
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
      alignItems:'center',
      gap:12
    },
    button:{
        width:'80%',
        height:'auto',
        borderWidth:1,
        borderRadius:24,
        backgroundColor:'#2db996',
        alignItems:'center',
        justifyContent:'center',
        padding:4
    },
    button2:{
        width:'80%',
        height:'auto',
        borderWidth:1,
        borderRadius:24,
        backgroundColor:'#767676',
        alignItems:'center',
        justifyContent:'center',
        padding: 4,
    },
    text:{
        color:Colors.WHITE,
        fontSize:28,
    },
    text2:{
        color:Colors.WHITE,
        fontSize:28,
    },
    title:{
        margin:20,
        fontSize:30,
        textAlign:'center'
    }
})
