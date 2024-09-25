import * as RNSplashScreen from 'expo-splash-screen';

const SplashScreen = {
  ...RNSplashScreen,
  preventAutoHideAsync: RNSplashScreen.preventAutoHideAsync,
  hideAsync: RNSplashScreen.hideAsync,
};

export default SplashScreen;