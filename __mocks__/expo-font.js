// __mocks__/expo-font.js

export const loadAsync = jest.fn(() => Promise.resolve());
export const getFontLoadingError = jest.fn(() => null);
export const isLoaded = jest.fn(() => true);

const Font = {
  loadAsync,
  getFontLoadingError,
  isLoaded,
};

export default Font;