import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useQuery } from '@tanstack/react-query';
import { getHeaderDasboardService } from '../../services/business';
import HeaderDashboard from './components/Header';
import MenuManagement from './screen/MenuManagement';
import Orders from './screen/Orders';
import PaymentHistory from './screen/PaymentHistory';
import Analitycs from './screen/Analitycs';
import DashboardHome from './screen/DashboardHome';
import { Home01Icon } from '@/src/constants/IconsPro';
import { useTheme } from '../../hooks';
import { COLORS, SIZES } from '../../constants/theme';
import CustomDrawerContent from './CustomDrawerContent';
import Profile from './screen/Profile';
import Support from './screen/Support';

const Drawer = createDrawerNavigator();

const DashboardScreen: React.FC = () => {
  const { backgroundMaingrey, Description } = useTheme();
  
  const header = useQuery({
    queryKey: ['header-dashboard-component'],
    queryFn: getHeaderDasboardService,
    initialData: {
      business_name: '',
      cover: null,
    },
  });

  return (
    <Drawer.Navigator
      initialRouteName="DashboardHome"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          headerData={header.data}
          openDrawer={props.navigation.openDrawer}
        />
      )}
      screenOptions={{
        header: ({ navigation }) => (
          <HeaderDashboard
            cover={header.data.cover}
            title={header.data.business_name}
            openDrawer={navigation.openDrawer}
          />
        ),

      }}
    >
      <Drawer.Screen
        name="DashboardHome"
        component={DashboardHome}
      />
      <Drawer.Screen
        name="MenuManagement"
        component={MenuManagement}
  
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
  
      />
      <Drawer.Screen
        name="PaymentHistory"
        component={PaymentHistory}
    
      />
      <Drawer.Screen
        name="Analitycs"
        component={Analitycs}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
      />
    </Drawer.Navigator>
  );
};

export default DashboardScreen;