// __mocks__/expo-constants.js

export const manifest = {
  name: 'Mocked App',
  slug: 'mocked-app',
  version: '1.0.0',
  sdkVersion: '48.0.0',
  platforms: ['ios', 'android', 'web'],
};

export const installationId = 'mocked-installation-id';
export const deviceId = 'mocked-device-id';
export const deviceName = 'Mocked Device Name';
export const deviceYearClass = 2021;
export const isDevice = true;
export const systemName = 'Mocked System';
export const systemVersion = '1.0.0';
export const brand = 'Mocked Brand';
export const modelName = 'Mocked Model';
export const platform = {
  ios: true,
  android: false,
  web: false,
};
export const expoVersion = '48.0.0';

const Constants = {
  manifest,
  installationId,
  deviceId,
  deviceName,
  deviceYearClass,
  isDevice,
  systemName,
  systemVersion,
  brand,
  modelName,
  platform,
  expoVersion,
};

export default Constants;