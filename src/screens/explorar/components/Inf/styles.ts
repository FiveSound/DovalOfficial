import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  SIZES,
  FONTS,
  COLORS,
} from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: SIZES.gapSmall,
    flexDirection: 'row',
    margin: SIZES.gapSmall,
    maxWidth: SIZES.width / 1.3,
    width: 'auto',
  },
  flexContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.gapSmall,
    zIndex: 1,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: responsiveFontSize(-100),
    width: SIZES.width,
    height: SIZES.height,
  },
  view: {
    height: 'auto',
  },
  touchableOpacity: {
    width: SIZES.width / 1.3,
    gap: SIZES.gapSmall,
  },
  titlePost: {
    ...FONTS.semi16,
    color: COLORS.light,
  },
  descriptionPost: {
    height: 'auto',
    width: SIZES.width / 1.3,
    ...FONTS.text14,
  },
  buttonsActions: {
    width: SIZES.width / 1.4,
    paddingHorizontal: SIZES.gapMedium,
    backgroundColor: COLORS.TranspLight,
    height: SIZES.BtnHeight / 1.4,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
  },
  containerButtonsActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SIZES.gapMedium / 2,
  },
});

export default styles;
