import React, { memo, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SIZES } from '../../../constants/theme';
import { useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';
import { useTheme } from '../../../hooks';
import { CLOUDFRONT } from '../../../services';
import { VideoView, useVideoPlayer, VideoPlayer } from 'expo-video';
import AnimatedVideoView from '../../../components/custom/Masonry/ AnimatedVideoView';

type Props = {};

const FrontCover = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { backgroundMaingrey } = useTheme();
  const thumbnailUri = `${CLOUDFRONT}${CurrentFeed.thumbnail}`
  const videoUri = `${CLOUDFRONT}${CurrentFeed.video}`
  const memoUri = useMemo(() => thumbnailUri, [thumbnailUri]);
  const memoVideo = useMemo(() => videoUri, [videoUri]);
  const playerRef = useRef<VideoPlayer>(null);

 const player = useVideoPlayer(memoVideo, (playerInstance) => {
  playerInstance.loop = true;
  playerInstance.play();
});

  return (
    <>
      {CurrentFeed.mediaType === 1 && (
        <Animated.Image
          sharedTransitionTag={`front-cover-image-${CurrentFeed.id}`}
          source={{ uri: memoUri}}
          style={[styles.image, {backgroundColor: backgroundMaingrey}]}
        />
      )}
       {CurrentFeed.mediaType === 0 && (
              <AnimatedVideoView
            ref={playerRef}
            style={[styles.image, {backgroundColor: backgroundMaingrey}]}
            player={player}
            sharedTransitionTag={`front-cover-image-${CurrentFeed.id}`}
            contentFit='cover'
            allowsFullscreen
            allowsPictureInPicture
            onError={(error: any) => {
              console.log('Error loading video:', error);
            }}
          />
        )}
    </>

  );
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: SIZES.height / 1.2,
  },
  gradient: {
    position: 'absolute',
    bottom: SIZES.height / 2.72,
    left: 0,
    right: 0,
    height: "0%",
  }
});

export default FrontCover;