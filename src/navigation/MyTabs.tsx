import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { Platform, Pressable, View } from "../components/native";
import { useTheme } from "../hooks";
import { COLORS, responsiveFontSize, SIZES } from "../constants/theme";
import Feed from "../screens/Feed";
import HomeScreen from "../screens/home";
import MyProfile from "../screens/MyProfile";
import { DashboardSquare01Icon, DashboardSquare01IconSolid, Home01Icon, Home01IconStroke, UserIcon, UserIconSolid } from '../constants/IconsPro';
import { useAppSelector } from "../redux";
import { RootState } from "../redux/store";
import DashboardScreen from "../screens/Dashboard";
import { Typography } from "../components/custom";
import { BlurView } from 'expo-blur'; 
import i18next from "../Translate";
import ChatIa from "../screens/ChatIa";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }: any) {
    const { BackgroundMain, Description, Title } = useTheme();
    const { businessVerified, isAuthenticated , isLoadingApp} = useAppSelector((state: RootState) => state.auth);

    const tabs = [
        {
            label: 'Feed',
            focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
            unfocusedIcon: <Home01IconStroke color={Description} width={SIZES.icons} height={SIZES.icons} />,
        },
        // {
        //     label: 'ChatIa',
        //     focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
        //     unfocusedIcon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons} />,
        // },
        ...(!isLoadingApp &&isAuthenticated && businessVerified
            ? [{
                label: i18next.t('Portal'),
                name: 'Portal',
                component: DashboardScreen,
                focusedIcon: <DashboardSquare01IconSolid color={COLORS.primary} width={SIZES.icons} height={SIZES.icons}/>,
                unfocusedIcon: <DashboardSquare01Icon color={Description} width={SIZES.icons} height={SIZES.icons}/>,
            }]
            : [{
                label: i18next.t('Home'),
                name: 'Home',
                component: HomeScreen,
                focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
                unfocusedIcon: <Home01IconStroke color={Description} width={SIZES.icons} height={SIZES.icons} />,
            }]
        ),
        {
            label: i18next.t('Profile'),
            focusedIcon: <UserIconSolid color={COLORS.primary} width={SIZES.icons} height={SIZES.icons}/>,
            unfocusedIcon: <UserIcon color={Description} width={SIZES.icons} height={SIZES.icons}/>,
        },
    ];

    return (
        <BlurView intensity={Platform.OS === 'ios' ? 100 : 0} tint='default' 
        style={[
            styles.container, 
            { backgroundColor: Platform.OS === 'ios' ? `${BackgroundMain}90` : BackgroundMain }
        ]}>
            <View style={styles.tabBar}>
                {tabs.map((tab, index) => {
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: state.routes[index].key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(state.routes[index].name, state.routes[index].params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: state.routes[index].key,
                        });
                    };

                    return (
                        <Pressable
                          key={`${tab.label}-${index}`}
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={descriptors[state.routes[index].key].options.tabBarAccessibilityLabel}
                            testID={descriptors[state.routes[index].key].options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.pressable}
                        >
                            {isFocused ? tab.focusedIcon : tab.unfocusedIcon}
                            <Typography 
                            variant={isFocused ? 'H4title' : 'SubDescription'}
                            newStyle={{ color: isFocused ? COLORS.primary : Description, marginTop: 4 }}>
                                {tab.label}
                            </Typography>
                        </Pressable>
                    );
                })}
            </View>
        </BlurView>
    );
}


const MyTabs = () => {
    const { businessVerified, isAuthenticated, isLoadingApp } = useAppSelector((state: RootState) => state.auth);
    const business = !isLoadingApp && isAuthenticated && businessVerified ;

    return (
        <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Feed" component={Feed} />
            {/* <Tab.Screen name="ChatIa" component={ChatIa} /> */}
            <Tab.Screen name={business ? 'Portal' : 'HomeScreen'} component={business ? DashboardScreen : HomeScreen} />
            <Tab.Screen name="MyProfile" component={MyProfile} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: responsiveFontSize(80),
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: SIZES.gapLarge,
        alignItems: 'center',
        height: responsiveFontSize(70),
        backgroundColor: 'transparent',
    },
    pressable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'transparent',
    },
});

export default MyTabs;