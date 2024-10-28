import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import {
  PauseIcon,
  PlayIcon,
  PlayIconSolid,
} from '../../../../../constants/IconsPro';
import { TouchableOpacity } from '../../../../../components/native';
import { Typography } from '../../../../../components/custom';
import { COLORS, FONTS, SIZES } from '../../../../../constants/theme';

type Props = {
  handlePause: () => void;
  isPaused: boolean;
};

const Pause = ({ handlePause, isPaused }: Props) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isPaused) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isPaused]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={handlePause}>
        {!isPaused ? (
          <PauseIcon
            width={SIZES.heading44}
            height={SIZES.heading44}
            color={COLORS.TranspLight}
          />
        ) : (
          <PlayIconSolid
            width={SIZES.heading44}
            height={SIZES.heading44}
            color={COLORS.TranspLight}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  text: {
    ...FONTS.heading24,
    position: 'absolute',
    bottom: SIZES.height / 1.2,
  },
});

export default Pause;
