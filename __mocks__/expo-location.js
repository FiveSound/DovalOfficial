// __mocks__/expo-location.js

export const PermissionStatus = {
    UNDETERMINED: 'undetermined',
    DENIED: 'denied',
    GRANTED: 'granted',
  };
  
  export const getCurrentPositionAsync = jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    })
  );
  
  export const requestForegroundPermissionsAsync = jest.fn(() =>
    Promise.resolve({
      status: PermissionStatus.GRANTED,
      granted: true,
      canAskAgain: false,
    })
  );