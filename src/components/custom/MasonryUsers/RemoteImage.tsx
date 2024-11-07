import React, { useState, useEffect, useCallback } from "react";
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

interface RemoteImageProps {
  pin: any;
}

const RemoteImage = ({ pin}: RemoteImageProps) => {
  const { thumbnail , id} = pin;
  const thumbnailUri = `${CLOUDFRONT}${thumbnail}` 
  const { backgroundMaingrey } = useTheme();
  const [displayHeight, setDisplayHeight] = useState<number>(responsiveFontSize(200));
  const navigation = useNavigation<NativeStackNavigationProp<SharedElementStackParamList>>();
  const [image, setImage] = useState<string>(thumbnail);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (thumbnailUri) {
      Image.getSize(
        thumbnailUri,
        (width, height) => {
          const screenWidth = Dimensions.get('window').width;
          const desiredWidth = screenWidth / 2.4 - 4;
          const calculatedHeight = (height / width) * desiredWidth;
          setDisplayHeight(calculatedHeight);
        },
        (error) => {
          console.log('Error fetching image size:', error);
          setDisplayHeight(responsiveFontSize(200)); 
        }
      );
    }
  }, [thumbnailUri]);

  const handlePress = useCallback(() => {
    navigation.navigate('FeedDetails', { item: thumbnail });
    dispatch(setPostID(id));
    dispatch(setFeedData(pin));
  }, [pin, navigation, dispatch]);


  return (
    <Animated.View entering={FadeInDown.delay(300)}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.Image
          source={{ uri: thumbnailUri }}
          style={[styles.image, { height: displayHeight, backgroundColor: backgroundMaingrey }]}
          resizeMode="cover"
          sharedTransitionTag={`UserProfile-cover-image-${id}`}
          entering={FadeInDown.duration(600)} 
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: SIZES.radius * 2,
  }
});

export default React.memo(RemoteImage);