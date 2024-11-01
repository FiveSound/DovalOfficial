// import React from 'react';
// import { DrawerContentScrollView } from '@react-navigation/drawer';
// import { View } from '../../components/native';
// import { useNavigation } from '@react-navigation/native';
// import {
//   Home01Icon,
// } from '../../constants/IconsPro';
// import { COLORS, SIZES, responsiveFontSize } from '../../constants/theme';
// import { useTheme } from '../../hooks';
// import { DrawerNavigationProp } from '@react-navigation/drawer';
// import { MenuItems } from '../../components/custom';

// type DrawerParamList = {
//   DashboardHome: undefined;
//   MenuManagement: undefined;
//   Orders: undefined;
//   PaymentHistory: undefined;
//   Analitycs: undefined;
//   Profile: undefined;
//   Notifications: undefined;
//   Support: undefined;
// };

// const CustomDrawerContent = () => {
//   const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
//   const { Description, borderInput } = useTheme();

//   const menuItems = [
//     {
//       label: 'Dashboard Home',
//       icon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons} />,
//       focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
//       screen: 'DashboardHome',
//     },
//     {
//       label: 'Menu Management',
//       icon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons} />,
//       focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
//       screen: 'MenuManagement',
//     },
//     {
//       label: 'Orders',
//       icon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons} />,
//       focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
//       screen: 'Orders',
//     },
//     {
//       label: 'Payment History',
//       icon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons} />,
//       focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
//       screen: 'PaymentHistory',
//     },
//     {
//       label: 'Analitycs',
//       icon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons} />,
//       focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
//       screen: 'Analitycs',
//     },
//     {
//       label: 'Notifications',
//       icon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons} />,
//       focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
//       screen: 'Notifications',
//     },
//     {
//       label: 'Support',
//       icon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons} />,
//       focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons} />,
//       screen: 'Support',
//     },
//     // Puedes agregar más elementos según sea necesario
//   ];

//   const handleNavigation = (screen: keyof DrawerParamList) => {
//     navigation.navigate(screen);
//   };

//   return (
//     <DrawerContentScrollView>
//       <View style={{ padding: responsiveFontSize(2) , gap: SIZES.gapLarge}}>
//         {menuItems.map((item, index) => (
//           <MenuItems
//             isDrawer={true}
//             key={index}
//             label={item.label}
//             focusedIcon={item.focusedIcon}
//             unfocusedIcon={item.icon}
//             onPress={() => handleNavigation(item.screen)}
//           />
//         ))}
//       </View>
//     </DrawerContentScrollView>
//   );
// };

// export default CustomDrawerContent; 