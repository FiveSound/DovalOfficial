import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { responsiveFontSize, SIZES } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElementStackParamList } from "../../../navigation/MainStack";
import { useAppDispatch } from "../../../redux";
import { setFeedData, setPostID } from "../../../redux/slides/navigations";
import { useTheme } from "../../../hooks";
import { CLOUDFRONT } from "../../../services";
import { useVideoPlayer } from 'expo-video';
import AnimatedVideoView from "./ AnimatedVideoView";
import { TouchableOpacity } from "../../native";

interface RemoteImageProps {
  pin: any;
  isFocused: boolean;
}

const RemoteImage = ({ pin, isFocused }: RemoteImageProps) => {
  const { thumbnail, id, mediaType, videos, height } = pin;
  const playerRef = useRef<any>(null);
  const thumbnailUri = `${CLOUDFRONT}${thumbnail}`
  const videoUri = mediaType === 0 && videos && videos.key 
    ? `${CLOUDFRONT}${videos.key}` 
    : '';
  const { backgroundMaingrey } = useTheme();
  const [displayHeight, setDisplayHeight] = useState<number>(responsiveFontSize(200));
  const navigation = useNavigation<NativeStackNavigationProp<SharedElementStackParamList>>();
  const dispatch = useAppDispatch();
  const memoUri = useMemo(() => thumbnailUri, [thumbnailUri]);
  const memoVideo = useMemo(() => videoUri, [videoUri]);
  const videoHeight = responsiveFontSize(340)

  const handlePress = useCallback(() => {
    navigation.push('FeedDetails', {
      item: { id, uri: mediaType === 1 ? memoUri : memoVideo }
    });
    dispatch(setPostID(id));
    dispatch(setFeedData(pin));
  }, [pin, dispatch]);


  const player = useVideoPlayer(memoVideo, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true; 
  });

  useEffect(() => {
    if (mediaType === 0 && player) { 
      if (isFocused) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [isFocused, mediaType, player, id]);

  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        {mediaType === 1 && (
          <Animated.Image
            source={{ uri: memoUri, cache: 'force-cache' }}
            style={[styles.image, { height: height? responsiveFontSize(height) : displayHeight, backgroundColor: backgroundMaingrey }]}
            resizeMode="cover"
            sharedTransitionTag={`front-cover-image-${id}`}
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
            onReadyForDisplay={() => {
              console.log('Video ready for display');
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
    overflow: 'hidden',
    height: '100%',
  },

  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: SIZES.radius * 2,
    overflow: 'hidden',
  },
});

export default React.memo(RemoteImage);