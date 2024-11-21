import React from 'react';
import { Platform, TouchableOpacity, useNavigation } from '../../../native';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { StyleSheet } from 'react-native';
import { ArrowLeft } from '../../../../constants/IconsPro';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {};

const ArrowClosed = (props: Props) => {
  const navigation = useNavigation();
  const { backgroundMaingrey } = useTheme();

  return (
     <Animated.View entering={FadeIn.delay(400)} style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} >
      <ArrowLeft width={SIZES.icons * 1.8} height={SIZES.icons * 1.8} color={COLORS.dark}/>
    </TouchableOpacity>
     </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'android' ? responsiveFontSize(20) : responsiveFontSize(20),
    left: responsiveFontSize(20),
    zIndex: 1000,
    borderRadius: responsiveFontSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BackgroundMainLight
  },
  imag: {
    width: SIZES.icons,
    height: SIZES.icons,
  },
});
export default ArrowClosed;
