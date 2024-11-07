import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SIZES } from '../../../constants/theme';
import { useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';
import { useTheme } from '../../../hooks';
import { CLOUDFRONT } from '../../../services';


type Props = {};

const FrontCover = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { backgroundMaingrey } = useTheme();
  const thumbnailUri = `${CLOUDFRONT}${CurrentFeed.thumbnail}`
  const memoUri = useMemo(() => thumbnailUri, [thumbnailUri]);


  return (
    <>
      <Animated.Image
        sharedTransitionTag={`front-cover-image-${CurrentFeed.id}`}
        source={{ uri: memoUri}}
        style={[styles.image, {backgroundColor: backgroundMaingrey}]}
      />
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