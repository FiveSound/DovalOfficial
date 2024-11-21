import { useEffect } from 'react';
import { Audio } from 'expo-av';

const useAudioConfig = () => {
  useEffect(() => {
    const configureAudioSession = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    };

    configureAudioSession();
  }, []);
};

export default useAudioConfig;
