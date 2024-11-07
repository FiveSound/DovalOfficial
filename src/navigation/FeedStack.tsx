import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedDetails from '../screens/FeedDetails';
import Feed from '../screens/Feed';
import MainStackt from './MainStackt';


export type SharedElementStackParamList = {
  Home: undefined;
  FeedDetails: { item: { id: number; uri: string } };
};


const Stack = createNativeStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen 
        name="Feed" 
        component={Feed}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="FeedDetails"
        component={FeedDetails}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;