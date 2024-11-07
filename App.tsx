import React, { useCallback, useState, useMemo } from "react";
import {
  Linking,
  SplashScreen,
} from "./src/components/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { LogBox, StatusBar} from "react-native";
import { useLocation, usePrepareApp, useTheme } from "./src/hooks";
import styles from "./AppStyles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import Modal from "./src/screens/Modal";
import { CartProvider } from "./src/context/CartContext";
import { DashboardProvider } from "./src/context/DashboardContext";
import { LoadingScreen } from "./src/components/custom";
import { enableScreens } from "react-native-screens";
import RootNavigator from "./src/navigation";
import { ActiveTabProvider } from "./src/context/ActiveTabContext";

const queryClient = new QueryClient();
LogBox.ignoreAllLogs();

const App = () => {
  const { BackgroundMain } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const linking = useMemo(
    () => ({
      prefixes: [Linking.createURL("/"), "doval://", "https://www.doval.io"],
      conf: {
        screens: {
          Home: "Home",
          ProfileUser: "ProfileUser",
          MyProfile: "MyProfile",
        },
      },
    }),
    []
  );

  usePrepareApp(setAppIsReady);
  useLocation(); 
  enableScreens();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      console.log("SplashScreen ocultado. La aplicación está lista.");
    }
  }, [appIsReady]);
  
  if (!appIsReady) {
    return <LoadingScreen label="Loading..." />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider onLayout={onLayoutRootView} style={[styles.flexContainer, { backgroundColor: BackgroundMain }]}>
        <NavigationContainer linking={linking}>
        <ActiveTabProvider>
          <AuthProvider>
            <DashboardProvider>
              <CartProvider>
                <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                  <StatusBar barStyle='dark-content' backgroundColor={BackgroundMain} />

                    <RootNavigator />
                  <Modal />
                </GestureHandlerRootView>
              </CartProvider>
            </DashboardProvider>
          </AuthProvider>
        </ActiveTabProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
