// __mocks__/react-native-size-matters.js

export const scale = (size) => size;
export const verticalScale = (size) => size;
export const moderateScale = (size, factor = 0.5) => size;
export const moderateVerticalScale = (size, factor = 0.5) => size;
export const ms = (size, factor = 0.5) => size;
export const mvs = (size, factor = 0.5) => size;
export const s = (size) => size;
export const vs = (size) => size;

const reactNativeSizeMatters = {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
  ms,
  mvs,
  s,
  vs,
};

export default reactNativeSizeMatters;