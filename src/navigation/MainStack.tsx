import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Splash from '../screens/Splash';
import UsePhoneEmail from '../screens/auth/UsePhoneEmail';
import Signup from '../screens/auth/Signup';
import SignupForm from '../screens/auth/SignupForm';
import Verified from '../screens/auth/UsePhoneEmail/Verified';
import Report from '../screens/explorar/Report';
import AddProducts from '../screens/AddProducts';
import SearchBusiness from '../screens/home/SearchBusiness';
import Business from '../screens/Business';
import Complete from '../screens/Order/Complete';
import OrderStack from './OrderStack';
import ProfileStack from './ProfileStack';
import SettingStack from './SettingStack';
import UserProfile from '../screens/UserProfile';
import Followers from '../screens/Followers';
import ReportUsers from '../screens/Reports/ReportUsers';
import Search from '../screens/Search';
import NewRecipie from '../screens/Upload/NewRecipie';
import AlbumsPermission from '../screens/Permiss/Locations/Albums/AlbumsPermission';
import OrderID from '../screens/Dashboard/screen/OrderID';
import OnboardingVerified from '../screens/Dashboard/FormBusiness/OnboardingForm';
import FormVerified from '../screens/Dashboard/FormBusiness';
import FeedDetails from '../screens/FeedDetails';
import Feed from '../screens/Feed';
import NewPosts from '../screens/Upload/UploadPost';
import MyProfile from '../screens/MyProfile';
import HomeStack from './HomeStack';
import { OrderList } from '../screens/Order/Checkout/components';


export type SharedElementStackParamList = {
  Home: undefined;
  FeedDetails: { item: { id: number; uri: string } };
};


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
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
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="UsePhoneEmail" component={UsePhoneEmail} />
      <Stack.Screen name="Verified" component={Verified} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupForm" component={SignupForm} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="AddProducts" component={AddProducts} />
      <Stack.Screen name="SearchBusiness" component={SearchBusiness} />
      <Stack.Screen name="Business" component={Business} />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="Complete" component={Complete} />
      <Stack.Screen name="OrderStack" component={OrderStack} />
      <Stack.Screen name="SettingStack" component={SettingStack} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="ReportUsers" component={ReportUsers} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="NewRecipie" component={NewRecipie} />
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="AlbumsPermission" component={AlbumsPermission} />
      <Stack.Screen name="FormVerified" component={FormVerified} />
      <Stack.Screen name="OnboardingVerified" component={OnboardingVerified} />
      <Stack.Screen name="NewPosts" component={NewPosts} />
      <Stack.Screen name='HomeStack' component={HomeStack} />
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

export default MainStack;