// __mocks__/expo-haptics.js

export const HapticsImpactFeedbackStyle = {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  };
  
  export const HapticsNotificationFeedbackType = {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  };
  
  export const impactAsync = jest.fn(() => Promise.resolve());
  export const notificationAsync = jest.fn(() => Promise.resolve());
  export const selectionAsync = jest.fn(() => Promise.resolve());