import React from 'react';
import { Platform, TouchableOpacity, useNavigation } from '../../../native';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { StyleSheet } from 'react-native';
import { ArrowLeft } from '../../../../constants/IconsPro';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useAppSelector } from '@/src/redux';
import { RootState } from '@/src/redux/store';

type Props = {};

const ArrowClosed = (props: Props) => {
  const navigation = useNavigation();
  const { backgroundMaingrey } = useTheme();
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);

  return (
     <Animated.View entering={FadeIn.delay(400)} style={[styles.container, {
      top: Platform.OS === 'android' ?
      CurrentFeed.mediaType === 0 ? SIZES.gapLarge : SIZES.gapMedium :
      CurrentFeed.mediaType === 0 ? SIZES.gapLarge : SIZES.gapMedium,
     }]}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <ArrowLeft width={SIZES.icons * 1.5} height={SIZES.icons * 1.5} color={COLORS.TranspLight}/>
    </TouchableOpacity>
     </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    left: SIZES.gapLarge,
    zIndex: 1000,
    borderRadius: responsiveFontSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TranspDark
  },
  button: {
    padding: SIZES.gapMedium
  },
  imag: {
    width: SIZES.icons,
    height: SIZES.icons,
  },
});
export default ArrowClosed;
