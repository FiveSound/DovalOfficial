// __mocks__/expo-video-thumbnails.js

export const generateThumbnail = jest.fn(() => Promise.resolve({
    uri: 'mocked-uri',
    width: 0,
    height: 0,
    duration: 0,
  }));