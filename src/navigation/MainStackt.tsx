import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigation from "./TabsNavigation";
import Onboarding from "../screens/Onboarding";
import Splash from "../screens/Splash";
import UsePhoneEmail from "../screens/auth/UsePhoneEmail";
import Signup from "../screens/auth/Signup";
import SignupForm from "../screens/auth/SignupForm";
import Verified from "../screens/auth/UsePhoneEmail/Verified";
import Locations from "../screens/Permiss/Locations";
import Report from "../screens/explorar/Report"
import AddProducts from "../screens/AddProducts";
import SearchBusiness from "../screens/home/SearchBusiness";
import Business from "../screens/Business";
import Complete from "../screens/Order/Complete";
import OrderStack from "./OrderStack";
import ProfileStack from "./ProfileStack";
import SettingStack from "./SettingStack";
import UserProfile from "../screens/UserProfile";
import Followers from "../screens/Followers";
import ReportUsers from "../screens/Reports/ReportUsers";
import Search from "../screens/Search";
import NewRecipie from "../screens/MyProfile/Upload/NewRecipie";
import OrderList from "../screens/home/components/body/LiveOrders/OrderList";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AlbumsPermission from "../screens/Permiss/Locations/Albums/AlbumsPermission";
import UploadStack from "./UploadStack";

const MainStackt = () => {
    const Stack = createNativeStackNavigator();
    const { isLoadingApp } = useSelector((state: RootState) => state.auth);
    
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="TabsNavigation">
            <Stack.Screen name="TabsNavigation" component={TabsNavigation} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="UsePhoneEmail" component={UsePhoneEmail}/>
            <Stack.Screen name="Verified" component={Verified}/>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="SignupForm" component={SignupForm}/>
            <Stack.Screen name="Locations" component={Locations}/>
            <Stack.Screen name="Report" component={Report}/>
            <Stack.Screen name="AddProducts" component={AddProducts} />
            <Stack.Screen name="SearchBusiness" component={SearchBusiness}/>
            <Stack.Screen name="Business" component={Business}/>
            <Stack.Screen name="ProfileStack" component={ProfileStack}/>
            <Stack.Screen name="Complete" component={Complete}/>
            <Stack.Screen name="OrderStack" component={OrderStack}/>
            <Stack.Screen name="SettingStack" component={SettingStack}/>
            <Stack.Screen name="UserProfile" component={UserProfile}/>
            <Stack.Screen name="Followers" component={Followers}/>
            <Stack.Screen name="ReportUsers" component={ReportUsers}/>
            <Stack.Screen name="Search" component={Search}/>
            <Stack.Screen name="NewRecipie" component={NewRecipie}/>
            <Stack.Screen name="OrderList" component={OrderList}/>
            <Stack.Screen name="AlbumsPermission" component={AlbumsPermission}/>
            <Stack.Screen name="UploadStack" component={UploadStack}/>
        </Stack.Navigator>
    )
};

export default MainStackt;