import { useCallback, useState, useMemo } from "react";
import {
  Platform,
  SafeAreaView,
  Linking,
  SplashScreen,
} from "./src/components/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import RootNavigation from "./src/navigation";
import {
  LoadingScreen,
} from "./src/components/custom";
import { LogBox } from "react-native";
import { usePrepareApp, useTheme } from "./src/hooks";
import styles from "./AppStyles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { AuthProvider } from "./src/context/AuthContext";
import Modal from "./src/screens/Modal";
import { CartProvider } from "./src/context/CartContext";
import { DashboardProvider } from "./src/context/DashboardContext";

const queryClient = new QueryClient();
export default function App() {
  LogBox.ignoreAllLogs();
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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider onLayout={onLayoutRootView} style={styles.flexContainer}>
          <NavigationContainer linking={linking}>
          <AuthProvider>
          <DashboardProvider>
            <CartProvider>
            <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                {Platform.OS === "android" ? (
                  <SafeAreaView style={styles.safeAreaView}>
                    <RootNavigation />
                  </SafeAreaView>
                ) : (
                  <RootNavigation />
                )}

              <Modal />
            </GestureHandlerRootView>
            </CartProvider>
            </DashboardProvider>
            </AuthProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}