import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "../screens/MyProfile";
import SettingStack from "./SettingStack";
import UsePhoneEmail from "../screens/auth/UsePhoneEmail";
import { useAppSelector } from "../redux";
import { RootState } from "../redux/store";
import EditProfile from "../screens/MyProfile/EditProfile";

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  const { businessVerified } = useAppSelector((state: RootState) => state.auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="EditProfile">
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UsePhoneEmail" component={UsePhoneEmail} />
      <Stack.Screen name="SettingStack" component={SettingStack} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
