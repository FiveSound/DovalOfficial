import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Linking, SplashScreen as NativeSplashScreen, SafeAreaView as SafeAreaViewNative } from "./src/components/native";
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
import { DashboardProvider } from "./src/context/DashboardContext";
import useLocale from "./src/hooks/useLocale";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingScreen} from "./src/components/custom";
import { ToastProvider } from "./src/components/custom/ToastManager";


const queryClient = new QueryClient();

const AppContent = ({ onLayoutRootView, linking, theme }: { onLayoutRootView: () => Promise<void>, linking: any, theme: ColorSchemeName }) => {
  return (
    <NavigationContainer linking={linking}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DashboardProvider>
            <CartProvider>
              <ActiveTabProvider>
                <SafeAreaProvider onLayout={onLayoutRootView} style={appStyles.flexContainer}>
                  <GestureHandlerRootView>
                    <>
                      {/* <TestAwayLocation /> */}
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
  const [appIsReady, setAppIsReady] = useState(false);
  const theme = useColorScheme();
  const { BackgroundMain, Title, backgroundMaingrey } = useTheme();
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
  enableScreens(false);
  useLocale();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await NativeSplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      onLayoutRootView();
    }
  }, [appIsReady, onLayoutRootView]);

  return (
    !appIsReady ? (
      <LoadingScreen />
    ) : (
      <ToastProvider >
        <>
          <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={BackgroundMain} />
          <AppContent onLayoutRootView={onLayoutRootView} linking={linking} theme={theme} />
        </>
      </ToastProvider>
    )
  )
};


const appStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default AppWithReload;