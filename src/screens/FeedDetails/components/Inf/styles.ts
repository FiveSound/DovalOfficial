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
    // maxWidth: SIZES.width / 1.1,
    width: 'auto',
    zIndex: 1000,
    marginTop: SIZES.gapLarge,
  },
  flexContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.gapSmall,
    zIndex: 1,
  },
  linearGradient: {
    position: 'absolute',
    left: -SIZES.gapLarge,
    right: 0,
    bottom: responsiveFontSize(-44),
    width: SIZES.width,
    height: SIZES.height,
  },
  view: {
    height: 'auto',
  },
  touchableOpacity: {
    // width: SIZES.width / 1.1,
    gap: SIZES.gapSmall,
  },
  titlePost: {
    ...FONTS.semi14,
  },
  descriptionPost: {
    height: 'auto',
    // width: SIZES.width / 1.1,
    ...FONTS.text16,
  },
  buttonsActions: {
    width: SIZES.width / 1.1,
    paddingHorizontal: SIZES.gapLarge,
    // height: SIZES.BtnHeight / 1.4,
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
