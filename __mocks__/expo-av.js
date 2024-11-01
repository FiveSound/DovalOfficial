// __mocks__/expo-av.js

export const Audio = {
    Sound: jest.fn(() => ({
      loadAsync: jest.fn(() => Promise.resolve()),
      playAsync: jest.fn(() => Promise.resolve()),
      pauseAsync: jest.fn(() => Promise.resolve()),
      unloadAsync: jest.fn(() => Promise.resolve()),
    })),
    setAudioModeAsync: jest.fn(() => Promise.resolve()),
  };
  
  export const Video = jest.fn(() => 'Mocked Video Component');
  
  export const ResizeMode = {
    COVER: 'cover',
    CONTAIN: 'contain',
    STRETCH: 'stretch',
    CENTER: 'center',
    REPEAT: 'repeat',
  };
  
  const ExpoAv = {
    Audio,
    Video,
    ResizeMode,
  };
  
  export default ExpoAv;