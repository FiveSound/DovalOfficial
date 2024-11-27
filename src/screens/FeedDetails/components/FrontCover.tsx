import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import { useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';
import { useTheme } from '../../../hooks';
import { CLOUDFRONT } from '../../../services';
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import { Image, Platform } from "@/src/components/native"
import { useIsFocused } from '@react-navigation/native';
import { FlexContainer } from '@/src/components/custom';
import { getCachedImage, getCachedVideo } from '../../../utils/cacheMMKV'; 
import { LinearGradient } from 'expo-linear-gradient';

type Props = {};

const FrontCover = memo((props: Props) => {
  const { CurrentFeed, postHeight } = useAppSelector((state: RootState) => state.navigation);
  const { backgroundMaingrey } = useTheme();
  const memoUri = useMemo(() => `${CLOUDFRONT}${CurrentFeed.thumbnail}`, [CurrentFeed.thumbnail]);
  const memoVideo = useMemo(() => `${CLOUDFRONT}${CurrentFeed.videos.key}`, [CurrentFeed.videos.key]);
  const playerRef = useRef<VideoPlayer>(null);
  const videoHeight = SIZES.height / 1.4;

  console.log('memoVideo', memoVideo);
  console.log('memoUri', memoUri);

  const isFocused = useIsFocused();
  const player = useVideoPlayer(memoVideo, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = false; 
  });

  useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isFocused, CurrentFeed.mediaType, player]);

  return (
    <FlexContainer newStyle={styles.container}>
      {CurrentFeed.mediaType === 1 && (
      <Image
          placeholderSource ={memoUri}
          cachePolicy='memory-disk'
          priority="high"
          contentFit='cover'
          style={[
            styles.image,
            { backgroundColor: backgroundMaingrey, height: responsiveFontSize(postHeight) },
          ]}
        />
      )}
      {CurrentFeed.mediaType === 0 && (
         <VideoView
         ref={playerRef}
         style={[styles.video, { height: videoHeight, backgroundColor: backgroundMaingrey }]}
         player={player}
         contentFit='cover'
         allowsFullscreen
         allowsPictureInPicture            
       />
      )}
              <LinearGradient
          colors={['transparent', 'transparent', COLORS.TranspDark]}
          style={[styles.gradient, {
            height: CurrentFeed.mediaType === 1 ? responsiveFontSize(postHeight)  : videoHeight,
          }]}
        />
    </FlexContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  image: {
    width: Platform.OS === 'ios' ? '98%' : '96%',
    borderRadius: SIZES.gapMedium,
  },
  video: {
    width: Platform.OS === 'ios' ? '98%' : '96%',
    borderRadius: SIZES.gapMedium,
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: Platform.OS === 'ios' ? '98%' : '96%',
    borderRadius: SIZES.gapMedium,
  },
});

export default FrontCover;