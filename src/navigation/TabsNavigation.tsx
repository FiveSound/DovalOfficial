import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useTheme from '../hooks/useTheme';
import MyProfile from '../screens/MyProfile';
import {
  Home01Icon,
  Home01IconStroke,
  UserIcons,
  UserIconsStrike,
} from '../constants/IconsPro';
import { COLORS, responsiveFontSize, SIZES } from '../constants/theme';
import Explorar from '../screens/explorar';
import { LoadingScreen, MenuItems } from '../components/custom';
import { styles } from '../components/custom/Menu';
import Home from '../screens/home';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Platform } from '../components/native';
import DashboardScreen from '../screens/Dashboard';

const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
  const { Bg: bg, Description, borderInput } = useTheme();
  const { businessVerified, isLoadingApp } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <Tab.Navigator
       key='explorar'
      initialRouteName="Explorar"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: borderInput,
        tabBarStyle: {
          ...styles.tabBarStyle,
          backgroundColor: bg,
          borderTopColor: borderInput,
          borderTopWidth:
            Platform.OS === 'ios'
              ? responsiveFontSize(0.5)
              : responsiveFontSize(1),
          zIndex: 102,
          //  height: responsiveFontSize(80)
        },
      }}
    >
      <Tab.Screen
        name="Explorar"
        component={Explorar}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuItems
              focused={focused}
              label="Explorar"
              focusedIcon={
                <Home01Icon
                  color={COLORS.primary}
                  width={SIZES.icons}
                  height={SIZES.icons}
                />
              }
              unfocusedIcon={
                <Home01IconStroke
                  color={Description}
                  width={SIZES.icons}
                  height={SIZES.icons}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={businessVerified ? DashboardScreen : Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuItems
              focused={focused}
              label={businessVerified ? 'Portal' : 'Home'}
              focusedIcon={
                <Home01Icon
                  color={COLORS.primary}
                  width={SIZES.icons}
                  height={SIZES.icons}
                />
              }
              unfocusedIcon={
                <Home01IconStroke
                  color={Description}
                  width={SIZES.icons}
                  height={SIZES.icons}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuItems
              focused={focused}
              label="Profile"
              focusedIcon={
                <UserIcons
                  color={COLORS.primary}
                  width={SIZES.icons}
                  height={SIZES.icons}
                />
              }
              unfocusedIcon={
                <UserIconsStrike
                  color={Description}
                  width={SIZES.icons}
                  height={SIZES.icons}
                />
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigation;
