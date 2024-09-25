import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/MyProfile/EditProfile";
import NewRecipie from "../screens/MyProfile/Upload/NewRecipie";

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
    return (
        <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="EditProfile"
        >
            <Stack.Screen name="EditProfile" component={EditProfile}/>
        </Stack.Navigator>
    ); 
}

export default ProfileStack