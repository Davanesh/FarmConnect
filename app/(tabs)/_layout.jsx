import { Text, View } from 'react-native'
import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function TabLayout(){
  return(
    <Tabs screenOptions={{
      headerShown:false
    }}>
      <Tabs.Screen name='home'
      options={{
        tabBarLabel:'Explore',
        tabBarIcon:({color})=><Ionicons name="search" 
        size={24} color="black" />
      }}/>
      <Tabs.Screen name='buy_again'
      options={{tabBarLabel:'Order again',
        tabBarIcon:({color})=><MaterialIcons name="loop" 
        size={24} color="black" />}}
      />
      <Tabs.Screen name='cart'
      options={{tabBarLabel:'Cart',
        tabBarIcon:({color})=><Ionicons name="bag-handle-outline" 
        size={24} color="black"/>}}
      />
    </Tabs>
  )
}