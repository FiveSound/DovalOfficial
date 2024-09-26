import React from "react";
import { StyleSheet, Animated } from "react-native";
import { CLOUDFRONT } from "../../../../../services";
import { SIZES } from '../../../../../constants/theme';
import { Image } from "../../../../../components/native";

interface MediaItem {
  uri: string;
  key: string;
  type: "photo" | "video";
  parentId: string;
  extension?: string;
  mediaType: number;
}

interface PhotoItemProps {
  item: MediaItem;
  index: number;
  scrollX: Animated.Value;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ item, index, scrollX }) => {
  const inputRange = [
    (index - 1) * SIZES.width * 0.9,
    index * SIZES.width * 0.9,
    (index + 1) * SIZES.width * 0.9,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      key={item.key}
      style={[styles.container, { transform: [{ scale }], opacity }]}
    >
      <Image
        contentFit='cover'
        style={styles.media}
        source={{ uri: `${CLOUDFRONT}${item.key}` }}
        priority="high"
        cachePolicy="memory-disk"
        placeholderSource={`${CLOUDFRONT}${item.key}`}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width * 0.90,
    height: SIZES.height * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: "74%",
    borderRadius: SIZES.gapLarge,
  },
});

export default React.memo(PhotoItem);