import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
  COLORS,
  responsiveFontSize,
  SIZES,
} from '../../../../../constants/theme';

const ProgressBar = ({ progress, duration, videoRef }: any) => {
  const progressBarRef = useRef(null);

  const handlePanResponderGrant = useCallback(
    evt => {
      const screenWidth = Dimensions.get('window').width;
      if (duration > 0 && screenWidth > 0) {
        const seekPosition =
          (evt.nativeEvent.locationX / screenWidth) * duration;
        if (videoRef.current && seekPosition >= 0 && seekPosition <= duration) {
          videoRef.current.setPositionAsync(seekPosition * 1000);
        }
      }
    },
    [duration, videoRef],
  );

  const handlePanResponderMove = useCallback(
    evt => {
      const screenWidth = Dimensions.get('window').width;
      const seekPosition = (evt.nativeEvent.locationX / screenWidth) * duration;
      if (videoRef.current && seekPosition >= 0 && seekPosition <= duration) {
        const positionMillis = seekPosition * 1000;
        videoRef.current.setPositionAsync(positionMillis);
        progress.value = seekPosition / duration;
      }
    },
    [duration, videoRef, progress],
  );

  const handlePanResponderRelease = useCallback(
    evt => {
      const screenWidth = Dimensions.get('window').width;
      const seekPosition = (evt.nativeEvent.locationX / screenWidth) * duration;
      if (videoRef.current && seekPosition >= 0 && seekPosition <= duration) {
        const positionMillis = seekPosition * 1000;
        videoRef.current.setPositionAsync(positionMillis);
        progress.value = seekPosition / duration;
      }
    },
    [duration, videoRef, progress],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: handlePanResponderGrant,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: handlePanResponderRelease,
      }),
    [
      handlePanResponderGrant,
      handlePanResponderMove,
      handlePanResponderRelease,
    ],
  );

  const animatedProgressBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View
      ref={progressBarRef}
      style={styles.progressBarContainer}
      {...panResponder.panHandlers}
    >
      <Animated.View style={[styles.progressBar, animatedProgressBarStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: responsiveFontSize(2),
    width: '100%',
    backgroundColor: COLORS.lightGrey08,
    borderRadius: SIZES.radius,
  },
  progressBar: {
    height: '90%',
    backgroundColor: COLORS.primary,
  },
});

export default ProgressBar;
