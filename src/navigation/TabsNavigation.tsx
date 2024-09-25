import React from "react";
import {  Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import useTheme from "../hooks/useTheme";
import MyProfile from "../screens/MyProfile";
import { Home01Icon, Home01IconStroke, UserIcons, UserIconsStrike } from "../constants/IconsPro";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../constants/theme";
import { useCart } from "../context/CartContext";
import Explorar from "../screens/explorar";
import { MenuItems } from "../components/custom";
import { styles } from "../components/custom/Menu";
import { Platform } from "../components/native";
import Home from "../screens/home";

const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
  const { user } = useAuth();
  const screenHeight = Dimensions.get("window").height;
  const { Bg: bg, Description , borderInput} = useTheme();
  const { cart } = useCart();

  return (
    <Tab.Navigator
      initialRouteName='Explorar'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: borderInput,
        tabBarStyle: {
          ...styles.tabBarStyle,
          backgroundColor: bg,
          borderTopColor: borderInput,
          borderTopWidth: responsiveFontSize(0.5),
          zIndex: 102
        },
      }}>
      <Tab.Screen
        name="Explorar"
        component={Explorar}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MenuItems
              focused={focused}
              label="Explorar"
              focusedIcon={<Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />}
              unfocusedIcon={<Home01IconStroke color={Description} width={SIZES.icons} height={SIZES.icons} />}
            />
            );
          },
        }}
      />
         <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MenuItems
              focused={focused}
              label="Home"
              focusedIcon={<Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />}
              unfocusedIcon={<Home01IconStroke color={Description} width={SIZES.icons} height={SIZES.icons} />}
            />
            );
          },
        }}
      />

      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MenuItems
              focused={focused}
              label="Profile"
              focusedIcon={<UserIcons color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />}
              unfocusedIcon={<UserIconsStrike color={Description} width={SIZES.icons} height={SIZES.icons} />}
            />
            );
          },
        }}
      />

    </Tab.Navigator>
  );
};

export default TabsNavigation;