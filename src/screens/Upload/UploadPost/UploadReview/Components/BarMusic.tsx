import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../../../../hooks';
import { COLORS, SIZES } from '../../../../../constants/theme';
import { MusicNote01Icon } from '../../../../../constants/IconsPro';
import { Typography } from '../../../../../components/custom';

const { width } = Dimensions.get('window');

type Props = {
  audioUri?: string;
  isPlaying: boolean;
  handlePlayPause: () => void;
  totalTimeInSeconds: number;
  IDSong: (id: string, sourceSong: string) => void;
};

const BarMusic: React.FC<Props> = ({
  audioUri,
  isPlaying,
  handlePlayPause,
  totalTimeInSeconds,
  IDSong,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [openSong, setOpenSong] = useState(false);
  const progress = useSharedValue(0);
  const { bgInput, borderInput } = useTheme();

  useEffect(() => {
    const loadAudio = async () => {
      if (audioUri && !sound) {
        console.log('Loading new sound');
        const { sound: newSound } = await Audio.Sound.createAsync({
          uri: audioUri,
        });
        setSound(newSound);
      }
    };

    loadAudio();

    return () => {
      sound?.unloadAsync();
    };
  }, [audioUri]);

  useEffect(() => {
    const controlAudio = async () => {
      if (sound) {
        if (isPlaying) {
          console.log('Playing sound');
          await sound.playAsync();
          sound.setPositionAsync(0); // Ensure playback starts from the beginning
          progress.value = withTiming(1, {
            duration: totalTimeInSeconds * 1000,
            easing: Easing.linear,
          });
        } else {
          console.log('Pausing sound');
          await sound.pauseAsync();
          progress.value = 0; // Reset progress when paused
        }
      }
    };

    controlAudio();
  }, [isPlaying, sound]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Pause the sound when the component loses focus
        if (sound) {
          console.log('Pausing sound due to loss of focus');
          sound.pauseAsync();
        }
      };
    }, [sound]),
  );

  return (
    <View style={styles.container}>
      {audioUri !== '' ? (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: SIZES.gapSmall,
            padding: SIZES.margin / 2,
            backgroundColor: COLORS.primaryDark950,
            borderWidth: SIZES.borderWidth / 2,
            borderColor: COLORS.primaryDark900,
            borderRadius: SIZES.radiusExtra / 1.4,
          }}
        >
          <MusicNote01Icon width={SIZES.icons / 2} height={SIZES.icons / 2} />
          <Typography variant="SubDescription"> audio seleccionado</Typography>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setOpenSong(!openSong)}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: SIZES.gapSmall,
            padding: SIZES.margin / 2,
            backgroundColor: COLORS.primaryDark950,
            borderWidth: SIZES.borderWidth / 2,
            borderColor: COLORS.primaryDark900,
            borderRadius: SIZES.radiusExtra / 1.4,
          }}
        >
          <MusicNote01Icon width={SIZES.icons / 2} height={SIZES.icons / 2} />
          <Typography variant="SubDescription">
            {' '}
            Toca para agregar un audio...
          </Typography>
          {/* <AddSong
            IDSong={IDSong}
            visible={openSong}
            onPressClose={() => setOpenSong(false)}
            onRequestClose={() => setOpenSong(false)}
          /> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  progressBar: {
    height: 2,
    backgroundColor: '#00f',
  },
  noAudioText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BarMusic;
