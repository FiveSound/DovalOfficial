import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { responsiveFontSize, SIZES } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElementStackParamList } from "../../../navigation/MainStackt";
import { useAppDispatch } from "../../../redux";
import { setFeedData, setPostID } from "../../../redux/slides/navigations";
import { useTheme } from "../../../hooks";
import { CLOUDFRONT } from "../../../services";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useVideoPlayer } from 'expo-video';
import AnimatedVideoView from "./ AnimatedVideoView";

interface RemoteImageProps {
  pin: any;
  isFocused: boolean;
}

const RemoteImage = ({ pin, isFocused }: RemoteImageProps) => {
  const { thumbnail, id, mediaType, video } = pin;
  const playerRef = useRef<any>(null);
  const thumbnailUri = `${CLOUDFRONT}${thumbnail}`
  const videoUri = `${CLOUDFRONT}${video}`
  const { backgroundMaingrey } = useTheme();
  const [displayHeight, setDisplayHeight] = useState<number>(responsiveFontSize(200));
  const navigation = useNavigation<NativeStackNavigationProp<SharedElementStackParamList>>();
  const dispatch = useAppDispatch();
  const memoUri = useMemo(() => thumbnailUri, [thumbnailUri]);
  const memoVideo = useMemo(() => videoUri, [videoUri]);
  const [videoHeight, setVideoHeight] = useState<number>(responsiveFontSize(200));

  useEffect(() => {
    if (mediaType === 1) {
      Image.getSize(
        memoUri,
        (width, height) => {
          const screenWidth = Dimensions.get('window').width;
          const desiredWidth = screenWidth / 2.4 - 4;
          const calculatedHeight = (height / width) * desiredWidth;
          setDisplayHeight(calculatedHeight);
        },
        (error) => {
          console.error('Error fetching image size:', error);
          setDisplayHeight(responsiveFontSize(200));
        }
      );
    } else if (mediaType === 0) {
      (async () => {
        try {
          const { width, height } = await VideoThumbnails.getThumbnailAsync(memoVideo, {
            time: 1000,
          });
          const screenWidth = Dimensions.get('window').width;
          const desiredWidth = screenWidth / 2.4 - 4;
          const calculatedHeight = (height / width) * desiredWidth;
          console.log('calculatedHeight for video', calculatedHeight);
          setVideoHeight(calculatedHeight);
        } catch (e) {
          console.warn('Error generating thumbnail for video:', e);
          setVideoHeight(responsiveFontSize(400));
        }
      })();
    }
  }, [memoUri, memoVideo]);

  const handlePress = useCallback(() => {
    navigation.navigate('FeedDetails', {
      item: { id, uri: mediaType === 1 ? thumbnail : video, mediaType }
    });
    dispatch(setPostID(id));
    dispatch(setFeedData(pin));
  }, [pin, navigation, dispatch, id, thumbnail, video, mediaType]);

  const player = useVideoPlayer(memoVideo, (playerInstance) => {
    playerInstance.loop = true;
    if (isFocused) {
      playerInstance.play();
    } else {
      playerInstance.pause();
    }
  });

  // useEffect(() => {
  //   if (playerRef.current) {
  //     if (isFocused) {
  //       playerRef.current.play();
  //     } else {
  //       playerRef.current.pause();
  //     }
  //   }
  // }, [isFocused]);

  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        {mediaType === 1 && (
          <Animated.Image
            source={{ uri: memoUri, cache: 'force-cache' }}
            style={[styles.image, { height: displayHeight, backgroundColor: backgroundMaingrey }]}
            resizeMode="cover"
            sharedTransitionTag={`front-cover-image-${id}`}
            entering={FadeInDown.duration(600)}
          />
        )}
        {mediaType === 0 && (
          <AnimatedVideoView
            ref={playerRef}
            style={[styles.video, { height: videoHeight, backgroundColor: backgroundMaingrey }]}
            player={player}
            sharedTransitionTag={`front-cover-image-${id}`}
            contentFit='cover'
            allowsFullscreen
            allowsPictureInPicture
            onError={(error: any) => {
              console.log('Error loading video:', error);
              setDisplayHeight(responsiveFontSize(400));
            }}
          />
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
  },

  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: SIZES.radius * 2,
    overflow: 'hidden',
  },
});

export default React.memo(RemoteImage);