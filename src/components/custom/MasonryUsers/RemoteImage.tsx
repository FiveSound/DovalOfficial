import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from "react-native";
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
import AnimatedVideoView from "../Masonry/ AnimatedVideoView";


interface RemoteImageProps {
  pin: any;
  isFocused: boolean;
}

const RemoteImage = ({ pin, isFocused }: RemoteImageProps) => {
  const { thumbnail, id, mediaType, videos } = pin;
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
  const [videoHeight, setVideoHeight] = useState<number>(responsiveFontSize(340));

  
  useEffect(() => {
    if (mediaType === 1) {
      Image.getSize(
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
  }, [memoUri, memoVideo]);

  const randomizeVideoHeight = useCallback(() => {
    const min = 200;
    const max = 420;
    const randomHeight = Math.floor(Math.random() * (max - min + 1)) + min;
    setVideoHeight(responsiveFontSize(randomHeight));
  }, []);

  useEffect(() => {
    if (mediaType === 0) {
      randomizeVideoHeight();
    }
  }, [mediaType, randomizeVideoHeight]);


  const handlePress = useCallback(() => {
    navigation.push('FeedDetails', {
      item: { id, uri: mediaType === 1 ? memoUri : memoVideo }
    });
    dispatch(setPostID(id));
    dispatch(setFeedData(pin));
  }, [pin, dispatch]);


  const player = useVideoPlayer(memoVideo, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true; // Inicialmente silenciado
  });

  // Controlar la reproducción del video según isFocused
  useEffect(() => {
    if (mediaType === 0 && player) { // Asegurarse de que solo los videos se controlen
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
            style={[styles.image, { height: displayHeight, backgroundColor: backgroundMaingrey }]}
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