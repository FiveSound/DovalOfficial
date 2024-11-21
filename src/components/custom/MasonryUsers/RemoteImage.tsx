import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, Image as ImageRN, TouchableOpacity } from "react-native";
import { responsiveFontSize, SIZES } from "../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setFeedData, setPostHeight, setPostID } from "../../../redux/slides/navigations";
import { useTheme } from "../../../hooks";
import { CLOUDFRONT } from "../../../services";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useNavigation , Image} from "../../native";
import Animated from "react-native-reanimated";
import { RootState } from "@/src/redux/store";


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
  const [displayHeight, setDisplayHeight] = useState<number>(responsiveFontSize(140));
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const memoUri = useMemo(() => thumbnailUri, [thumbnailUri]);
  const memoVideo = useMemo(() => videoUri, [videoUri]);
  const videoHeight = responsiveFontSize(180);
  const { isConnected } = useAppSelector((state: RootState) => state.auth)
  
  useEffect(() => {
    if (mediaType === 1 && isConnected) {
      ImageRN.getSize(
        memoUri,
        (width, height) => {
          const screenWidth = Dimensions.get('window').width;
          const desiredWidth = screenWidth / 3 - 10;
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
    dispatch(setPostHeight(displayHeight * 3 + 10));
    console.log('displayHeight + id ', id, displayHeight);
  }, [pin, dispatch, displayHeight, id]);


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
          <Image
            placeholderSource={memoUri}
            style={[styles.image, { height: displayHeight, backgroundColor: backgroundMaingrey }]}
          />
        )}
        {mediaType === 0 && (
          <VideoView
            ref={playerRef}
            style={[styles.video, { height: videoHeight, backgroundColor: backgroundMaingrey }]}
            player={player}
            contentFit='cover'
            allowsFullscreen
            allowsPictureInPicture
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