import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/Settings';
import Account from '../screens/Settings/Generals/Account';
import PaymentsGeneral from '../screens/Settings/Generals/Payments Methods';
import AddCardGeneral from '../screens/Settings/Generals/Payments Methods/AddCard';
import MyLocationsGeneral from '../screens/Settings/Generals/MyLocations';
import Languages from '../screens/Settings/Display/Languages';
import Coupons from '../screens/Settings/Generals/Coupons';
import Notifications from '../screens/Settings/Display/Notifications';
import Legal from '../screens/Settings/Support/Legal';
import Support from '../screens/Settings/Support/Support';
import Report from '../screens/Settings/Support/Report';
import RegisterBusiness from '../screens/Settings/Support/RegisterBusiness';
import RegisterDelivery from '../screens/Settings/Support/RegisterDelivery';
import ScreenNewLocation from '../screens/Settings/Generals/MyLocations/ScreenNewLocation';
const Stack = createNativeStackNavigator();
const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PaymentsGeneral" component={PaymentsGeneral} />
      <Stack.Screen name="AddCardGeneral" component={AddCardGeneral} />
      <Stack.Screen name="MyLocationsGeneral" component={MyLocationsGeneral} />
      <Stack.Screen name="Languages" component={Languages} />
      <Stack.Screen name="Coupons" component={Coupons} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Legal" component={Legal} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="RegisterBusiness" component={RegisterBusiness} />
      <Stack.Screen name="RegisterDelivery" component={RegisterDelivery} />
      <Stack.Screen name="ScreenNewLocation" component={ScreenNewLocation} />
    </Stack.Navigator>
  );
};

export default SettingStack;
