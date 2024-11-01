// __mocks__/expo-image-manipulator.js

export const manipulateAsync = jest.fn(() =>
    Promise.resolve({
      uri: 'mocked-uri',
      width: 100,
      height: 100,
      base64: '',
    })
  );
  
  export const SaveFormat = {
    JPEG: 'jpeg',
    PNG: 'png',
    WEBP: 'webp',
  };