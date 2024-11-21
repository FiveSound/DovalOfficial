import { StyleSheet } from 'react-native';
import {
  SIZES,
  FONTS,
  COLORS,
  responsiveFontSize,
} from '../../../../constants/theme';

const styles = StyleSheet.create({
  flexContainer: {
    borderRadius: SIZES.padding * 0.8,
    height: SIZES.height,
    position: 'relative',
    borderBottomLeftRadius: SIZES.gapLarge,
    borderBottomRightRadius: SIZES.gapLarge,
    maxWidth: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
    alignItems: 'center',
  },
  view: {
    alignItems: 'center',
    marginTop: SIZES.padding,
    width: SIZES.width,
    maxWidth: SIZES.width,
  },
  text: {
    ...FONTS.heading44,
    textAlign: 'center',
    color: COLORS.TitleColor,
    width: SIZES.BtnWidth / 1.1,
  },
  typography: {
    marginHorizontal: SIZES.padding / 2,
    textAlign: 'center',
  },
});

export default styles;
