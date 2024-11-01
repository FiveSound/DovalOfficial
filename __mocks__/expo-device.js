// __mocks__/expo-device.js

export const getDeviceTypeAsync = jest.fn(() => Promise.resolve('phone'));
export const getManufacturerAsync = jest.fn(() => Promise.resolve('Apple'));
export const getModelNameAsync = jest.fn(() => Promise.resolve('iPhone 13'));
export const isDevice = true;
export const deviceName = 'Mocked Device Name';
export const brand = 'Mocked Brand';
export const modelName = 'Mocked Model';
export const systemName = 'Mocked System';
export const systemVersion = '1.0.0';
export const deviceYearClass = 2021;
export const isTablet = false;

const Device = {
  getDeviceTypeAsync,
  getManufacturerAsync,
  getModelNameAsync,
  isDevice,
  deviceName,
  brand,
  modelName,
  systemName,
  systemVersion,
  deviceYearClass,
  isTablet,
};

export default Device;