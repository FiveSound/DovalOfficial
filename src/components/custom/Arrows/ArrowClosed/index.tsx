import React from 'react';
import { TouchableOpacity, useNavigation } from '../../../native';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { StyleSheet } from 'react-native';
import { ArrowLeft } from '../../../../constants/IconsPro';

type Props = {};

const ArrowClosed = (props: Props) => {
  const navigation = useNavigation();
  const { backgroundMaingrey } = useTheme();

  return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
      <ArrowLeft width={SIZES.icons * 1.8} height={SIZES.icons * 1.8} color={COLORS.dark}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: responsiveFontSize(40),
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
