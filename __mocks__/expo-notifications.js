// __mocks__/expo-notifications.js

export const scheduleNotificationAsync = jest.fn(() => Promise.resolve('mocked-notification-id'));
export const cancelScheduledNotificationAsync = jest.fn(() => Promise.resolve());
export const getPermissionsAsync = jest.fn(() => Promise.resolve({ status: 'granted' }));
export const requestPermissionsAsync = jest.fn(() => Promise.resolve({ status: 'granted' }));
export const addNotificationReceivedListener = jest.fn();
export const addNotificationResponseReceivedListener = jest.fn();

const Notifications = {
  scheduleNotificationAsync,
  cancelScheduledNotificationAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
};

export default Notifications;