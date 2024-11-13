import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/Order/Cart';
import Checkout from '../screens/Order/Checkout';
import Tracking from '../screens/Order/Tracking';
import MyLocations from '../screens/Order/Checkout/MyLocations';
import Payments from '../screens/Order/Checkout/Payments';
import AddCard from '../screens/Order/Checkout/AddCard';
import ConfirmOrder from '../screens/Order/ConfirmOrder';
import Complete from '../screens/Order/Complete';
import Cancel from '../screens/Order/Cancel';
import MainStackt from './MainStackt';
import Coupons from '../screens/Order/Checkout/Coupons';

const Stack = createNativeStackNavigator();
const OrderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Cart"
    >
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Tracking" component={Tracking} />
      <Stack.Screen name="MyLocations" component={MyLocations} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="Complete" component={Complete} />
      <Stack.Screen name="Cancel" component={Cancel} />
      <Stack.Screen name="Coupons" component={Coupons} />
      <Stack.Screen name='MainStackt' component={MainStackt} />
    </Stack.Navigator>
  );
};

export default OrderStack;
