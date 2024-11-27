import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { AnalyticsUpIcon, DashboardSquare01Icon, HelpSquareIcon, Home01Icon, Invoice03Icon, MenuRestaurantIcon, Store01IconStroke, UserIcon } from '../../constants/IconsPro';
import { LineDivider, Typography } from '../../components/custom';
import { Pressable, SafeAreaView } from '@/src/components/native';
import { useTheme } from '@/src/hooks';
import i18next from '@/src/Translate';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
    headerData: {
        business_name: string;
        cover: string | null;
    };
    openDrawer: () => void;
}

const NavigationItem: React.FC = ({ label, icon, isFocused, onPress }: any) => {
    const { Description } = useTheme();
    return (
        <Pressable onPress={onPress} style={[styles.pressable, {
            backgroundColor: isFocused ? COLORS.primary : 'transparent'
        }]}>
            {icon}
            <Typography
                variant={isFocused ? 'subtitle' : 'H4title'}
                newStyle={{ color: isFocused ? COLORS.dark : Description, marginTop: SIZES.gapSmall }}
            >
                {label}
            </Typography>
        </Pressable>
    );
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ navigation, headerData, state }) => {
    const currentRoute = state.routeNames[state.index];
    const { Description } = useTheme();
    const drawerItems = [
        {
            label: i18next.t('Portal'),
            icon: <DashboardSquare01Icon color={currentRoute === 'DashboardHome' ? COLORS.dark : Description} width={SIZES.icons} height={SIZES.icons} />,
            screen: 'DashboardHome',
        },
        {
            label: i18next.t('Menu Management'),
            icon: <MenuRestaurantIcon color={currentRoute === 'MenuManagement' ? COLORS.dark : Description} width={SIZES.icons} height={SIZES.icons} />,
            screen: 'MenuManagement',
        },
        {
            label: i18next.t('Orders'),
            icon: <Store01IconStroke color={currentRoute === 'Orders' ? COLORS.dark : Description} width={SIZES.icons} height={SIZES.icons} />,
            screen: 'Orders',
        },
        {
            label: i18next.t('Payment History'),
            icon: <Invoice03Icon color={currentRoute === 'PaymentHistory' ? COLORS.dark : Description} width={SIZES.icons} height={SIZES.icons} />,
            screen: 'PaymentHistory',
        },
        {
            label: i18next.t('Analytics'),
            icon: <AnalyticsUpIcon color={currentRoute === 'Analytics' ? COLORS.dark : Description} width={SIZES.icons} height={SIZES.icons} />,
            screen: 'Analitycs', 
        },
        {
            label: i18next.t('Profile'),
            icon: <UserIcon color={currentRoute === 'Profile' ? COLORS.dark : Description} width={SIZES.icons} height={SIZES.icons} />,
            screen: 'Profile',
        },
        {
            label: i18next.t('Support'),
            icon: <HelpSquareIcon color={currentRoute === 'Support' ? COLORS.dark : Description} width={SIZES.icons} height={SIZES.icons} />,
            screen: 'Support',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Typography variant='title' newStyle={{ color: COLORS.primary }}>
                    {headerData.business_name}
                </Typography>
            </View>
            <LineDivider variant='secondary' />
            <View style={styles.itemsContainer}>
                {drawerItems.map((item, index) => {
                    const isFocused = currentRoute === item.screen;

                    const onPress = () => {
                        navigation.navigate(item.screen);
                    };

                    return (
                        <NavigationItem
                            key={`${item.label}-${index}`}
                            label={item.label}
                            icon={item.icon}
                            isFocused={isFocused}
                            onPress={onPress}
                        />
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SIZES.gapLarge,
    },
    header: {
        padding: SIZES.gapLarge,
    },
    itemsContainer: {
        marginTop: SIZES.gapMedium,
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.gapMedium,
        gap: SIZES.gapLarge,
        borderRadius: SIZES.radius,
        marginVertical: SIZES.gapSmall,
        width: '94%',
        alignSelf: 'center',
    },
});

export default CustomDrawerContent;