import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import { useAppSelector } from '../redux';
import { RootState } from '../redux/store';
import DashboardScreen from '../screens/Dashboard';
import SearchBusiness from '../screens/home/SearchBusiness';
import OrderID from '../screens/Dashboard/screen/OrderID';
import MainStackt from './MainStack';
import OrderStack from './OrderStack';
import UsePhoneEmail from '../screens/auth/UsePhoneEmail';
import Verified from '../screens/auth/UsePhoneEmail/Verified';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const { businessVerified } = useAppSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={businessVerified ? 'Dashboard' : 'Home'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name='Dashboard'
        component={DashboardScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name='SearchBusiness'
        component={SearchBusiness}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="Dashboard/Business/OrderID" component={OrderID} />
      <Stack.Screen name="MainStackt" component={MainStackt} />
      <Stack.Screen name="OrderStack" component={OrderStack} />
      <Stack.Screen name="UsePhoneEmail" component={UsePhoneEmail} />
      <Stack.Screen name="Verified" component={Verified} />
    </Stack.Navigator>
  );
};

export default HomeStack;