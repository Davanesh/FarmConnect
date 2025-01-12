import React, { useState } from 'react'
import { Text, View, Image,TextInput, Pressable, ScrollView, StyleSheet, Dimensions, Touchable, TouchableOpacity, FlatList, SectionList, FlatListComponent } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import Category_image1 from './../../assets/images/10000027_31-fresho-banana-robusta.jpg';
import Category_image2 from './../../assets/images/10000054_18-fresho-brinjal-bottle-shape.jpg';
import Category_image3 from './../../assets/images/10000143_15-fresho-ladies-finger.jpg';
import Category_image4 from './../../assets/images/10000175_18-fresho-ridge-gourd.jpg';
import Category_image5 from './../../assets/images/10000366_12-fresho-parwal.jpg';
import Category_image6 from './../../assets/images/20000911_35-fresho-kiwi-green.jpg';
import Category_image7 from './../../assets/images/40004992_15-fresho-sweet-corn.jpg';
import Category_image8 from './../../assets/images/40018523_5-fresho-cucumber-english.jpg';
import Category_image9 from './../../assets/images/40057966_8-fresho-tender-coconut-medium.jpg';
import Category_image10 from './../../assets/images/20000911_35-fresho-kiwi-green.jpg';
import Category_image11 from './../../assets/images/40004992_15-fresho-sweet-corn.jpg';
import Category_image12 from './../../assets/images/40018523_5-fresho-cucumber-english.jpg';
import Category_image13 from './../../assets/images/20000911_35-fresho-kiwi-green.jpg';
import Category_image14 from './../../assets/images/10000027_31-fresho-banana-robusta.jpg';
import Category_image15 from './../../assets/images/10000054_18-fresho-brinjal-bottle-shape.jpg';
import Category_image16 from './../../assets/images/20000911_35-fresho-kiwi-green.jpg';
import {product } from '../../data/itemData';


export default function Home(){
    const width = Dimensions.get('window').width

    const [pagingEnabled, setpagingEnabled] = useState(true)

    const list = [
        {
            id:1,
            title: 'First item',
            image:require('./../../assets/images/front.jpg')
        },
        {
            id:2,
            title: 'Second item',
            image:require('./../../assets/images/front2.jpg')
        },
        {
            id:3,
            title: 'thrid item',
            image:require('./../../assets/images/front.jpg')
        },
        {
            id:4,
            title: 'forth item',
            image:require('./../../assets/images/front.jpg')
        }
    ]

    const config = {
        product : [
            {
                image: Category_image1,
                text:'Banana'
            },
            {
                image: Category_image2,
                text:'Banana'
            },
            {
                image: Category_image3,
                text:'Banana'
            },
            {
                image: Category_image4,
                text:'Banana'
            },
            {
                image: Category_image5,
                text:'Banana'
            },
            {
                image: Category_image6,
                text:'Banana'
            },
            {
                image: Category_image7,
                text:'Banana'
            },
            {
                image: Category_image8,
                text:'Banana'
            },
            {
                image: Category_image9,
                text:'Banana'
            },
            {
                image: Category_image10,
                text:'Banana'
            },
            {
                image: Category_image11,
                text:'Banana'
            },
            {
                image: Category_image12,
                text:'Banana'
            },
            {
                image: Category_image13,
                text:'Banana'
            },
            {
                image: Category_image14,
                text:'Banana'
            },
            {
                image: Category_image15,
                text:'Banana'
            },
            {
                image: Category_image16,
                text:'Banana'
            }
        ]
    }

    const Profile = ()=>{
        console.log('nee oru chutiya da');
        
    }

    const router = useRouter();
    return(
        <ScrollView style={{
            gap:6
        }}>
            <View style={{
            display:'flex',
            marginTop:20,
            padding:20,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
            }}>
            <Image source={require('./../../assets/images/FC_logo-removebg-preview.png')}
            style={{
                width:230,
                height:50
            }}/>
            <TouchableOpacity onPress={Profile}>
              <Ionicons name="person-circle-outline" size={35} color="black" />
            </TouchableOpacity>

            </View>
            <View style={{
                borderWidth:1,
                borderColor:Colors.PRIMARY,
                borderRadius:10,
                padding:12,
                margin:8,
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:5,
            }}>
                <Text>
                <Ionicons name="search-outline" size={24} color="black" />
                </Text>
                <TextInput placeholder='Search'>
                </TextInput>
            </View>
            <View style={{
                margin:8,
            }}>
                <Image source={require('./../../assets/images/front.jpg')}
                style={{
                    width:'100%',
                    height:250,
                    borderRadius:12,
                }}/>
            </View>
            <View style={{
                // flex: 1,
            }}>
                <Carousel
                width={width}
                height={250}
                data={list}
                autoPlay={true}
                pagingEnabled={pagingEnabled}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                    <View style={styles2.CarouselItem}>
                        <Image style={{
                            borderRadius: 15, 
                            width: '97%', 
                            marginTop: 5}} 
                        source={item.image}/>
                    </View>
                )}
                />
            </View>
            <Text style={{
                fontSize:20,
                fontFamily:'outfit-bold',
                padding:20,
            }}>Shop By Category</Text>
            <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    flexWrap:'wrap'
                }}>
                {config.product.map((item)=>(
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('auth/product')}>
                    <Image source={item.image}
                    style={styles.products}/>
                    <Text style={{
                        textAlign:'center'
                    }}>{item.text}</Text>
                </TouchableOpacity>
                ))}
            </View>
            <View>
                
            </View>
            <View style={{
                backgroundColor:'#e7e7e7'
            }}>
                <FlatList horizontal data={product} renderItem={({item,index})=>(
                    <View style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-evenly',
                        flexWrap:'wrap'
                    }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('auth/product')}>
                        <Image source={item.image}
                        style={styles.products}/>
                        <Text style={{
                            textAlign:'center'
                        }}>{item.text}</Text>
                        </TouchableOpacity>
                    </View>
                )}/>
                    </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  products:{
    width:88,
    height:88,
    margin:7,
    marginBottom:0,
    borderRadius:12,
    gap:8
  }
})

const styles2 = StyleSheet.create({
  CarouselItem:{
    flex:1,
    justifyContent:'center',
    overflow:'hidden',
    width:"100%",
    margin:8,
    borderRadius:12
  },
  img:{
    width:'100%',
    height:'100%',
  }
})

