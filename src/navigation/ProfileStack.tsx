import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from '../screens/MyProfile';
import SettingStack from './SettingStack';
import UsePhoneEmail from '../screens/auth/UsePhoneEmail';
import Verified from '../screens/auth/UsePhoneEmail/Verified';
import OnboardingVerified from '../screens/Dashboard/FormBusiness/OnboardingForm';
import FormVerified from '../screens/Dashboard/FormBusiness';
import Business from '../screens/Business';
import OrderStack from './OrderStack';
import Onboarding from '../screens/Onboarding';
import SignupForm from '../screens/auth/SignupForm';
import MainStackt from './MainStackt';
import Followers from '../screens/Followers';
import { useAppSelector } from '../redux';
import { RootState } from '../redux/store';


const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  const { businessVerified } = useAppSelector((state: RootState) => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MyProfile"
    >
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="UsePhoneEmail" component={UsePhoneEmail} />
      <Stack.Screen name="SettingStack" component={SettingStack} />
      <Stack.Screen name="Verified" component={Verified} />
      <Stack.Screen name='OnboardingVerified' component={OnboardingVerified}/>
      <Stack.Screen name='FormVerified' component={FormVerified}/>
      <Stack.Screen name='Business' component={Business}/>
      <Stack.Screen name='OrderStack' component={OrderStack}/>
      <Stack.Screen name='Onboarding' component={Onboarding}/>
      <Stack.Screen name='SignupForm' component={SignupForm}/>
      <Stack.Screen name='MainStackt' component={MainStackt}/>
      <Stack.Screen name='Followers' component={Followers}/>
      
    </Stack.Navigator>
  );
};

export default ProfileStack;
