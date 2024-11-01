// jest-setup.js

import '@testing-library/jest-native/extend-expect';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // Override the `call` method to prevent errors during tests
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: () => 'Mocked Expo Image',
}));

// Mock expo-modules-core
jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: {},
  SyntheticPlatformEmitter: {
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  },
  requireNativeViewManager: jest.fn(),
}));