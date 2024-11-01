// __mocks__/expo-splash-screen.js

export const preventAutoHideAsync = jest.fn(() => Promise.resolve());
export const hideAsync = jest.fn(() => Promise.resolve());
export const showAsync = jest.fn(() => Promise.resolve());

const SplashScreen = {
  preventAutoHideAsync,
  hideAsync,
  showAsync,
};

export default SplashScreen;