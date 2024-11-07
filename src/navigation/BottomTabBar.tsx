import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { DashboardSquare01Icon, DashboardSquare01IconSolid, Home01Icon, Home01IconStroke, UserIcon, UserIconSolid } from '../constants/IconsPro';
import { MenuItems } from '../components/custom';
import { COLORS, responsiveFontSize, SIZES } from '../constants/theme';
import { useTheme } from '../hooks';
import { SafeAreaView } from '../components/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TabBarVisibilityContext } from '../context/TabBarVisibilityContext';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux';

type Tab = 'Feed' | 'ChatIa' | 'Home' |'Portal'| 'Profile';
interface BottomTabBarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const { height } = Dimensions.get('window');

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, setActiveTab }) => {
  const { BackgroundMain, Description } = useTheme();
  const { businessVerified } = useAppSelector((state: RootState) => state.auth);
  
  const tabs = [
    {
      label: 'Feed',
      focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons}/>,
      unfocusedIcon: <Home01IconStroke color={Description} width={SIZES.icons} height={SIZES.icons}/>,
    },
    {
      label: 'ChatIa',
      focusedIcon: <Home01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons}/>,
      unfocusedIcon: <Home01Icon color={Description} width={SIZES.icons} height={SIZES.icons}/>,
    },  
    {
      label: businessVerified ? 'Portal' : 'Home',
      focusedIcon: businessVerified ? <DashboardSquare01IconSolid color={COLORS.primary} width={SIZES.icons} height={SIZES.icons}/> : <DashboardSquare01Icon color={COLORS.primary} width={SIZES.icons} height={SIZES.icons}/>,
      unfocusedIcon: businessVerified ? <DashboardSquare01Icon color={Description} width={SIZES.icons} height={SIZES.icons}/> : <DashboardSquare01Icon color={Description} width={SIZES.icons} height={SIZES.icons}/>,
    },
    {
      label: 'Profile',
      focusedIcon: <UserIconSolid color={COLORS.primary} width={SIZES.icons} height={SIZES.icons}/>,
      unfocusedIcon: <UserIcon color={Description} width={SIZES.icons} height={SIZES.icons}/>,
    },
  ];

  const { isTabBarVisible } = React.useContext(TabBarVisibilityContext);

  const translateY = useSharedValue(height);

  useEffect(() => {
    if (isTabBarVisible) {
      translateY.value = withSpring(0, {
        damping: 20,        
        stiffness: 160,     
        mass: 1,            
        overshootClamping: true, 
      });
    } else {
      translateY.value = withSpring(height, {
        damping: 20,
        stiffness: 160,
        mass: 1,
        overshootClamping: true,
      });
    }
  }, [isTabBarVisible, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <SafeAreaView style={[styles.tabBar, { backgroundColor: BackgroundMain }]}>
        {tabs.map((tab) => (
          <MenuItems
            key={tab.label}
            focused={activeTab === tab.label}
            label={tab.label}
            focusedIcon={tab.focusedIcon}
            unfocusedIcon={tab.unfocusedIcon}
            onPress={() => setActiveTab(tab.label as Tab)}
          />
        ))}
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SIZES.gapLarge,
    alignItems: 'center',
    height: responsiveFontSize(80),
  },
});

export default React.memo(BottomTabBar);