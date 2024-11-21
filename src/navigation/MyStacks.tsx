import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./MyTabs";
import FeedDetails from "../screens/FeedDetails";
import Onboarding from "../screens/Onboarding";
import UsePhoneEmail from "../screens/auth/UsePhoneEmail";
import Verified from "../screens/auth/UsePhoneEmail/Verified";
import Signup from "../screens/auth/Signup";
import SignupForm from "../screens/auth/SignupForm";
import AddProducts from "../screens/AddProducts";
import SearchBusiness from "../screens/home/SearchBusiness";
import Business from "../screens/Business";
import Complete from "../screens/Order/Complete";
import OrderStack from "./OrderStack";
import SettingStack from "./SettingStack";
import UserProfile from "../screens/UserProfile";
import Followers from "../screens/Followers";
import ReportUsers from "../screens/Reports/ReportUsers";
import Search from "../screens/Search";
import NewRecipie from "../screens/Upload/NewRecipie";
import { OrderList } from "../screens/Order/Checkout/components";
import AlbumsPermission from "../screens/Permiss/Locations/Albums/AlbumsPermission";
import FormVerified from "../screens/Dashboard/FormBusiness";
import NewPosts from "../screens/Upload/UploadPost";
import ReportPost from "../screens/explorar/Report";
import OrderID from "../screens/Dashboard/screen/OrderID";
import FormBusiness from "../screens/Dashboard/FormBusiness";


const Stack = createNativeStackNavigator();

const MyStacks = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name="MyTabs" component={MyTabs} 
       options={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="UsePhoneEmail" component={UsePhoneEmail} />
      <Stack.Screen name="Verified" component={Verified} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupForm" component={SignupForm} />
      <Stack.Screen name="Report" component={ReportPost} />
      <Stack.Screen name="AddProducts" component={AddProducts} />
      <Stack.Screen name="SearchBusiness" component={SearchBusiness} />
      <Stack.Screen name="Business" component={Business} />
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
      <Stack.Screen name="FormBusiness" component={FormBusiness} />
      <Stack.Screen name="NewPosts" component={NewPosts} />
      <Stack.Screen
        name="FeedDetails"
        component={FeedDetails}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="Dashboard/Business/OrderID" component={OrderID} />
        </Stack.Navigator>
    )
}

export default MyStacks;