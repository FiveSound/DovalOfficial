import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import MyProfile from '../screens/MyProfile';
import React from 'react';
import { useLinkBuilder } from '@react-navigation/native';
import { View, Text, Pressable } from '../components/native';
const Tab = createBottomTabNavigator();

function MyTabs() {
  

  
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName='Feed'>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
  );
}

export default MyTabs;
