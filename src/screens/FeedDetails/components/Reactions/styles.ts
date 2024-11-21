import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    // width: responsiveFontSize(34),
    height: responsiveFontSize(34),
    justifyContent: 'center',
    borderRadius: responsiveFontSize(50),
    flexDirection: 'row',
    gap: SIZES.gapMedium,
    marginHorizontal: SIZES.gapSmall,
  },
  containerIcon: {
    backgroundColor: COLORS.TranspLight,
    borderRadius: responsiveFontSize(50),
    width: responsiveFontSize(40),
    height: responsiveFontSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...FONTS.semi14,
  },
  colorIcons: {
    color: COLORS.TranspLight,
  },
  containerHint: {
    backgroundColor: COLORS.TranspDark,
    position: 'absolute',
    top: responsiveFontSize(100),
    width: SIZES.width / 1.2,
    paddingHorizontal: SIZES.gapLarge * 2,
    left: SIZES.width / 12,
    height: SIZES.BtnHeight,
  },
  bordertriangue: {
    borderBottomColor: 'transparent',
  },
  labelHint: {
    width: SIZES.width / 1.2,
  },
  containerButtons: {
    width: SIZES.width / 1.4,
    zIndex: 1000,
  },
});

export default styles;
