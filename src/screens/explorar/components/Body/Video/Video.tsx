import { Dimensions, StyleSheet, View, Pressable } from 'react-native';
import React, { lazy, useState, useEffect, useCallback, useRef } from 'react';
import { Video as TypeVideo, ResizeMode } from 'expo-av';
const LazyVideo = lazy(() =>
  import('expo-av').then(module => ({ default: module.Video })),
);
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue } from 'react-native-reanimated';
import ProgressBar from './ProgressBar';
import useAudioConfig from './useAudioConfig';
import useVideoControl from './useVideoControl';
import usePauseControl from './usePauseControl';
import { handleViewService } from '../../../../../services/posts';
import { responsiveFontSize, SIZES } from '../../../../../constants/theme';
import Pause from './Pause';
import { useSelector } from 'react-redux';

type VideoProps = {
  postID: number;
  uri: string;
  height: number;
  onError?: (error: string) => void;
  onLoad?: () => void;
  isItemFocused: boolean;
};

const Video = React.memo(
  ({ postID, uri, height, onError, onLoad, isItemFocused }: VideoProps) => {
    useAudioConfig();
    const { videoRef, isPlaying, reloadVideo, togglePlayPause } =
      useVideoControl(uri, isItemFocused);
    const { isPaused, togglePause, setPause } = usePauseControl();
    const [duration, setDuration] = useState(0);
    const progress = useSharedValue(0);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);
    const prevIsPlayingRef = useRef<boolean | null>(null);

    useEffect(() => {
      if (isItemFocused) {
        // console.log('Video component is focused, calling handleViewService with postID:', postID);
        handleViewService(postID);
      }
    }, [isItemFocused, postID]);

    const handleTogglePlayPause = useCallback(() => {
      togglePlayPause();
      setIsManuallyPaused(prev => !prev);
    }, [togglePlayPause]);

    useEffect(() => {
      if (isManuallyPaused) {
        setPause(true);
      } else {
        setPause(!isPlaying);
      }
    }, [isManuallyPaused, isPlaying, setPause]);

    useEffect(() => {
      if (isItemFocused && !isManuallyPaused) {
        videoRef.current?.playAsync();
      } else {
        videoRef.current?.pauseAsync();
      }
    }, [isItemFocused, isManuallyPaused]);

    return (
      <Pressable>
        <LazyVideo
          ref={videoRef}
          source={{ uri: uri }}
          isLooping={true}
          isMuted={false}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={status => {
            if (isItemFocused && status.isLoaded) {
              progress.value = status.positionMillis / status.durationMillis;
              if (prevIsPlayingRef.current !== status.isPlaying) {
                // console.log(`Playback status update: isPlaying=${status.isPlaying}`);
                prevIsPlayingRef.current = status.isPlaying;
                if (!isManuallyPaused) {
                  setPause(!status.isPlaying);
                }
              }
            }
          }}
          onLoad={status => {
            // console.log('Video loaded with duration:', status.durationMillis);
            setDuration(status.durationMillis);
            onLoad?.();
          }}
          onError={error => {
            // console.error("Video error:", error);
            onError?.(error.error);
            reloadVideo();
          }}
          style={{
            width: SIZES.width,
            height: height,
          }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.containerReproduccion}>
          <ProgressBar
            progress={progress}
            duration={duration}
            videoRef={videoRef}
          />
        </View>
        {isManuallyPaused && isPaused && (
          <Pause isPaused={isPaused} handlePause={handleTogglePlayPause} />
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  containerReproduccion: {
    position: 'absolute',
    bottom: SIZES.height * 0.0021,
    zIndex: 10,
    width: SIZES.width,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveFontSize(4),
    marginTop: responsiveFontSize(4),
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
});

export default Video;
