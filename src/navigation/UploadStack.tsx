import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Upload from "../screens/Upload/Upload";

const Stack = createNativeStackNavigator();
const UploadStack = () => {
    return (
        <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Upload"
        >
            <Stack.Screen name="Upload" component={Upload}/>
        </Stack.Navigator>
    ); 
}

export default UploadStack