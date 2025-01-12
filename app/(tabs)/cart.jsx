import React, { useState } from 'react'
import { Text, View, ScrollView,Image,StyleSheet, Button, Touchable, TouchableOpacity, ToastAndroid } from 'react-native'
import { Colors } from '../../constants/Colors'
import { router } from 'expo-router';

export default function Profile(){

    const [counter, setCounter] = useState(1);
    const [value, setvalue] = useState(24);


    const rout = () => {
        router.replace('../(tabs)/buy_again');
    }

    const message =() => {
        ToastAndroid.show('order placed successfuly',ToastAndroid.LONG);
        setTimeout(rout(),2000)
    }



    const handvalue = () => {
        setvalue(value + 24);
    }

    const handvalue2 = () => {
        setvalue(value - 24);
    }

    const handleClick1 = () => {
        setCounter(counter + 1);
        handvalue();
    };

    const handleClick2 = () => {
        setCounter(counter - 1);
        handvalue2();
    };
    

    return(
        <ScrollView style={{
            marginTop:40,
        }}>
            <View>
                <Text style={{
                    fontSize:30,
                    display:'flex',
                    justifyContent:'center',
                    textAlign:'center'
                }}>Cart</Text>
            </View>
            <View style={{
                marginTop:12,
                backgroundColor:'#d3d3d3',
                borderRadius:12,
                margin:18,
                display:'flex',
                flexDirection:'row'
            }}>
                <Image 
                style={styles.imgcss}
                source={require("./../../assets/images/10000027_31-fresho-banana-robusta.jpg")}/>
                <View>
                    <Text style={{
                    fontSize:17,
                    marginTop:12,
                    fontWeight:'500'
                }}>Fresh Banana Robusta - 2Kg</Text>
                <Text style={{
                    fontSize:14,
                    fontWeight:'400',
                    marginTop:1,
                }}>By Arun Groups</Text>
                <Text style={{
                    fontSize:22,
                    fontStyle:'bold',
                    marginTop:2,
                }}>{`₹${value}`}</Text>

                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    borderWidth:1,
                    borderRadius:18,
                    justifyContent:'space-evenly',
                    width:100,
                    margin:4,
                    textAlignVertical:'center'
                }}>
                <TouchableOpacity style={styles.button} 
                                  onPress={handleClick2}>
                    <Text style={{
                        color:Colors.PRIMARY,
                        justifyContent:'center',
                        textAlign:'center',
                        fontSize:30,
                        margin:0,
                        padding:0
                    }}>-</Text>
                </TouchableOpacity>
                <View style={{
                    borderLeftWidth:1,
                    borderRightWidth:1,
                    textAlignVertical:'center',
                }}>
                <Text style={{
                    fontSize:20,
                    textAlignVertical:'center',
                    justifyContent:'center',
                    marginHorizontal:7,
                    marginTop:8

                }}>{counter}</Text>
                </View>
                
                <TouchableOpacity style={styles.button} 
                    onPress={handleClick1}>
                    <Text style={{
                        color:Colors.PRIMARY,
                        fontSize:20,
                        marginTop:6,
                        margin:0,
                        padding:0
                    }}>+</Text>
                </TouchableOpacity>
            </View>
                </View>

            </View>
            <View>
                <TouchableOpacity style={{
                    backgroundColor:Colors.GREEN,
                    borderRadius:30,
                    width:'auto',
                    height:65,
                    padding:20,
                    margin:12,
                    marginTop:500,
                }}>
                    <Text style={{
                        fontSize:20,
                        textAlign:'center',
                        color:Colors.WHITE,
                    }}
                    
                    onPress={()=>{message(), rout()}}
                    >Buy</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imgcss:{
        width:110,
        height:110,
        margin:7,
        margin:18,
        borderRadius:12,
    },
    button:{
        padding: 1,
        margin: 0,
        borderRadius: 8,
        textAlignVertical:'center',
    },
})