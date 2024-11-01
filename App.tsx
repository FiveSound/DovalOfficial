import React, { useCallback, useState, useMemo, useEffect } from "react";
import {
  Linking,
  SplashScreen,
} from "./src/components/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import RootNavigation from "./src/navigation";
import { LogBox, ScrollView, StatusBar} from "react-native";
import { useLocation, usePrepareApp, useTheme } from "./src/hooks";
import styles from "./AppStyles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import Modal from "./src/screens/Modal";
import { CartProvider } from "./src/context/CartContext";
import { DashboardProvider } from "./src/context/DashboardContext";
import { LoadingScreen } from "./src/components/custom";

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
  
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      console.log("SplashScreen ocultado. La aplicación está lista.");
    }
  }, [appIsReady]);
  
  if (!appIsReady) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider onLayout={onLayoutRootView} style={styles.flexContainer}>
        <NavigationContainer linking={linking}>
          <AuthProvider>
            <DashboardProvider>
              <CartProvider>
                <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                  <StatusBar barStyle='dark-content' backgroundColor={BackgroundMain} />
                  <RootNavigation />
                  <Modal />
                </GestureHandlerRootView>
              </CartProvider>
            </DashboardProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
