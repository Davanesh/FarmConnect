import { useNavigation, useRouter } from "expo-router";
import React,{ useEffect} from "react";
import { View,Text, Image, Touchable, TouchableOpacity } from "react-native";
import { Colors } from "./../../constants/Colors";

export default function product(){
    const navigation = useNavigation();

    const router = useRouter();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[]);
    return(
        <View>
            <View style={{
                margin:20,
                marginTop:50,
            }}>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}>
                    <Text style={{
                        fontSize:16,
                        margin:4,
                        color:'#666666'
                    }}>Fresh</Text>
                    <Image source={require('./../../assets/images/5-star-rating-review-star-transparent-free-png__1_-removebg-preview.png')}
                    style={{
                        width:'auto',
                        height:20
                    }}/>
                </View>
                <Text style={{
                    fontSize:24,
                    margin:12,
                }}>Fresh Banana Robusta - 2Kg</Text>
                <Image source={require('./../../assets/images/10000027_31-fresho-banana-robusta.jpg')}
                style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-around',
                    width:350,
                    height:350,
                    marginLeft:10
                }}/>
            </View>
            <View
            style={{
                display:'flex',
                justifyContent:'space-evenly'
            }}>
                <Text 
                style={{
                    fontSize:24,
                    marginLeft:12,
                }}>M.R.P: ₹24</Text>
                <Text style={{
                    color:Colors.GREEN,
                    fontSize:18,
                    marginLeft:12,

                }}>In Stock</Text>
                <Text style={{
                    marginLeft:12,
                    fontSize:14,
                }}>Sold by Arun Groups and fullfilled by FarmConnect</Text>
                <View style={{
                    marginTop:24,
                    marginLeft:12,
                    marginRight:12
                }}>
                    <TouchableOpacity 
                    style={{
                        backgroundColor:Colors.GRAY,
                        borderRadius:12,
                        width:'auto',
                        height:65,
                        padding:20,
                        margin:12,
                    }} 
                    onPress={ () => router.push('/type/main')}>
                        <Text 
                        style={{
                            fontFamily:'outfit-medium',
                            fontSize:18,
                            textAlign:'center',
                            color:Colors.PRIMARY,
                        }}>Negotiate with Seller</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        router.push('../(tabs)/cart')
                    }}
                    style={{
                        backgroundColor:Colors.GREEN,
                        borderRadius:12,
                        width:'auto',
                        height:65,
                        padding:20,
                        margin:12,
                    }}>
                        <Text
                        style={{
                            fontFamily:'outfit-medium',
                            fontSize:18,
                            textAlign:'center',
                            color:Colors.WHITE,
                        }}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )

}

