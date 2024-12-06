import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { StyleSheet, Image as ImageRN, Dimensions } from "react-native";
import { COLORS, responsiveFontSize, SIZES } from "../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setFeedData, setPostHeight, setPostID } from "../../../redux/slides/navigations";
import { useTheme } from "../../../hooks";
import { CLOUDFRONT } from "../../../services";
import { TouchableOpacity, Image, useNavigation } from "../../native";
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { RootState } from "@/src/redux/store";
import Typography from "../Typography";
import FlexContainer from "../FlexContainer";
import { LinearGradient } from "expo-linear-gradient";

interface RemoteImageProps {
  pin: any;
  isFocused: boolean;
}

const RemoteImage = ({ pin, isFocused }: RemoteImageProps) => {
  const { thumbnail, id, mediaType, videos, height } = pin;
  const videoRef = useRef<Video>(null);
  const thumbnailUri = `${CLOUDFRONT}${thumbnail}`;
  const videoUri = mediaType === 0 && videos && videos.key 
    ? `${CLOUDFRONT}${videos.key}` 
    : '';
  const { backgroundMaingrey } = useTheme();
  const [displayHeight, setDisplayHeight] = useState<number>(responsiveFontSize(200));
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const memoUri = useMemo(() => thumbnailUri, [thumbnailUri]);
  const memoVideo = useMemo(() => videoUri, [videoUri]);
  const videoHeight = responsiveFontSize(280);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const { isConnected } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (mediaType === 1) {
      ImageRN.getSize(
        memoUri,
        (width, height) => {
          const screenWidth = Dimensions.get('window').width;
          const desiredWidth = screenWidth / 2.4 - 10;
          const calculatedHeight = (height / width) * desiredWidth;
          setDisplayHeight(calculatedHeight);
        },
        (error) => {
          console.error('Error fetching image size:', error);
          setDisplayHeight(responsiveFontSize(200));
        }
      );
    }
  }, [memoUri, mediaType]);

  const handlePress = useCallback(() => {
    navigation.navigate('FeedDetails');
    dispatch(setPostID(id));
    dispatch(setFeedData(pin));
    dispatch(setPostHeight(displayHeight * 2.4 + 10));
  }, [pin, dispatch, displayHeight, id, navigation]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.durationMillis) {
      setVideoDuration(status.durationMillis / 1000); 
    }
  };

  useEffect(() => {
    if (mediaType === 0 && videoRef.current) { 
      if (isFocused) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [isFocused, mediaType, videoRef]);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        {mediaType === 1 && (
          <Image
            placeholderSource={memoUri}
            cachePolicy='memory-disk'
            priority="high"
            style={[styles.image, { height: displayHeight, backgroundColor: backgroundMaingrey }]}
          />
        )}
        {mediaType === 0 && (
          <Video
            ref={videoRef}
            source={{ uri: memoVideo }}
            style={[styles.video, { height: videoHeight, backgroundColor: backgroundMaingrey }]}
            resizeMode={ResizeMode.COVER}
            shouldPlay={isFocused}
            isLooping
            isMuted
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            useNativeControls={false}
          />
        )}
        {videoDuration > 0 && (
          <FlexContainer newStyle={styles.duration}>
            <Typography variant='H4title' newStyle={styles.durationText}>{formatDuration(videoDuration)}</Typography>
          </FlexContainer>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: SIZES.radius * 2,
  },
  video: {
    width: '100%',
    borderRadius: SIZES.radius * 2,
    overflow: 'hidden',
  },

  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: SIZES.radius * 2,
    overflow: 'hidden',
  },
  duration: {
    position: 'absolute',
    top: SIZES.gapSmall,
    left: SIZES.gapSmall,
    backgroundColor: COLORS.TranspDark,
    padding: SIZES.gapSmall,
    borderRadius: SIZES.radius * 2,
  },
  durationText: {
    color: COLORS.TranspLight,
  },
});

export default React.memo(RemoteImage);