// __mocks__/expo-linking.js

export const openURL = jest.fn(() => Promise.resolve(true));
export const canOpenURL = jest.fn(() => Promise.resolve(true));
export const getInitialURL = jest.fn(() => Promise.resolve('mocked://initial-url'));
export const addEventListener = jest.fn();
export const removeEventListener = jest.fn();
export const Linking = {
  openURL,
  canOpenURL,
  getInitialURL,
  addEventListener,
  removeEventListener,
};

export default Linking;