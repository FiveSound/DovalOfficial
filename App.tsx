import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Linking, SplashScreen as NativeSplashScreen } from "./src/components/native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ColorSchemeName, LogBox, StatusBar, StyleSheet, useColorScheme } from "react-native";
import { useLocation, usePrepareApp, useTheme } from "./src/hooks";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import Modal from "./src/screens/Modal";
import { CartProvider } from "./src/context/CartContext";
import { enableScreens } from "react-native-screens";
import RootNavigator from "./src/navigation";
import { ActiveTabProvider } from "./src/context/ActiveTabContext";
import { useSplashLoading } from "./src/context/SplashLoadingContext";
import { DashboardProvider } from "./src/context/DashboardContext";
import Splash from "./Splash";
import TransitionWrapper from "./TransitionWrapper";

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

const AppContent = ({ onLayoutRootView, linking, theme }: { onLayoutRootView: () => Promise<void>, linking: any, theme: ColorSchemeName }) => {
  const { BackgroundMain } = useTheme();

  return (
    <NavigationContainer linking={linking}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DashboardProvider>
            <CartProvider>
              <ActiveTabProvider>
                <SafeAreaProvider onLayout={onLayoutRootView} style={appStyles.flexContainer}>
                  <GestureHandlerRootView style={appStyles.gestureHandlerRootView}>
                    <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={BackgroundMain} />
                    <>
                      <RootNavigator />
                      <Modal />
                    </>
                  </GestureHandlerRootView>
                </SafeAreaProvider>
              </ActiveTabProvider>
            </CartProvider>
          </DashboardProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>

  );
};

const AppWithReload = () => {
  const { isSplashLoading, setSplashLoading } = useSplashLoading();
  const [appIsReady, setAppIsReady] = useState(false);
  const theme = useColorScheme();
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
      await NativeSplashScreen.hideAsync();
      console.log("SplashScreen ocultado. La aplicación está pronta.");
      setSplashLoading(false); // Update splash loading state
    }
  }, [appIsReady, setSplashLoading]);

  useEffect(() => {
    if (appIsReady) {
      onLayoutRootView();
    }
  }, [appIsReady, onLayoutRootView]);

  return (
    isSplashLoading ? (
      <Splash />
    ) : (
      <TransitionWrapper isVisible={!isSplashLoading}>
        <AppContent onLayoutRootView={onLayoutRootView} linking={linking} theme={theme} />
       </TransitionWrapper>
    )
  )
};


const appStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  gestureHandlerRootView: {
    flex: 1,
  },
});

export default AppWithReload;