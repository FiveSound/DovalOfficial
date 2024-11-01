// jest.config.js

module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      './jest-setup.js'
    ],
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|my-project|expo|@expo|@react-native|@react-navigation|expo-image|moti|expo-linear-gradient|react-native-reanimated|expo-location|@react-native-async-storage/async-storage|expo-image-manipulator|expo-video-thumbnails)/)'
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
      '^expo-linear-gradient$': '<rootDir>/__mocks__/expo-linear-gradient.js',
      '^moti$': '<rootDir>/__mocks__/moti.js',
      '^react-native-svg$': '<rootDir>/__mocks__/react-native-svg.js',
      '^expo-location$': '<rootDir>/__mocks__/expo-location.js',
      '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
      '^expo-image-manipulator$': '<rootDir>/__mocks__/expo-image-manipulator.js',
      '^expo-video-thumbnails$': '<rootDir>/__mocks__/expo-video-thumbnails.js',
      '^expo-localization$': '<rootDir>/__mocks__/expo-localization.js',
      "^expo-haptics$": "<rootDir>/__mocks__/expo-haptics.js",
      '^expo-linking$': '<rootDir>/__mocks__/expo-linking.js',
      "^expo-font$": "<rootDir>/__mocks__/expo-font.js",
      "^expo-splash-screen$": "<rootDir>/__mocks__/expo-splash-screen.js",
      '^react-native-keyboard-aware-scroll-view$': '<rootDir>/__mocks__/react-native-keyboard-aware-scroll-view.js',
      '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
      '^expo-device$': '<rootDir>/__mocks__/expo-device.js',
      '^expo-notifications$': '<rootDir>/__mocks__/expo-notifications.js',
      '^expo-constants$': '<rootDir>/__mocks__/expo-constants.js',
      "^react-native-size-matters$": "<rootDir>/__mocks__/react-native-size-matters.js",
      "^expo-av$": "<rootDir>/__mocks__/expo-av.js",
      '^react-native-maps$': '<rootDir>/__mocks__/react-native-maps.js'
    }
  };