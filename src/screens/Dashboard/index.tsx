import { createDrawerNavigator } from "@react-navigation/drawer";
import { useQuery } from "@tanstack/react-query";
import { getHeaderDasboardService } from "../../services/business";
import HeaderDashboard from "./components/Header";
import MenuManagement from "./screen/MenuManagement";
import Home from "./screen/Home";
import Orders from "./screen/Orders";
import PaymentHistory from "./screen/PaymentHistory";
import Analitycs from "./screen/Analitycs";
import Profile from "./screen/Profile";
import Notifications from "./screen/Notifications";
import Support from "./screen/Support";
import OrderID from "./screen/OrderID";

const Drawer = createDrawerNavigator();

const DashboardScreen = () => {
  const header = useQuery({
    queryKey: ["header-dashboard-component"],
    queryFn: getHeaderDasboardService,
    initialData: {
      business_name: "",
      cover: null,
    },
  });

  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({ navigation }) => (
          <HeaderDashboard
            cover={header.data.cover}
            title={header.data.business_name}
            openDrawer={() => navigation.openDrawer()}
          />
        ),
      }}
      initialRouteName="Business/DashboardHome"
    >
      <Drawer.Screen
        navigationKey="Business/DashboardHome"
        name="DashboardHome"
        component={Home}
      />
      <Drawer.Screen
        navigationKey="Business/MenuManagement"
        name="MenuManagement"
        component={MenuManagement}
      />
      <Drawer.Screen
        navigationKey="Business/Orders"
        name="Orders"
        component={Orders}
      />
  
      <Drawer.Screen
        navigationKey="Business/PaymentHistory"
        name="PaymentHistory"
        component={PaymentHistory}
      />
      <Drawer.Screen
        navigationKey="Business/Analitycs"
        name="Analitycs"
        component={Analitycs}
      />
      {/* <Drawer.Screen
        navigationKey="Business/Profile"
        name="Profile"
        component={Profile}
      /> */}
      <Drawer.Screen
        navigationKey="Business/Notifications"
        name="Notifications"
        component={Notifications}
      />
      <Drawer.Screen
        navigationKey="Business/Support"
        name="Support"
        component={Support}
      />
    </Drawer.Navigator>
  );
};

export default DashboardScreen;
