import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';

const styles = StyleSheet.create({
  flexContainer: {
    paddingHorizontal: SIZES.gapMedium,
    marginVertical: SIZES.gapSmall,
    width: SIZES.width,
    alignSelf: 'center',
  },
  touchableOpacity: {
    alignItems: 'center',
    height: 'auto',
    paddingVertical: SIZES.gapSmall,
    flexDirection: 'row',
    width: SIZES.BtnWidth,
    justifyContent: 'space-between',
  },
  businessName: {
    width: SIZES.width / 1.8,
    ...FONTS.semi16,
  },
  flexContainerInner: {
    marginLeft: SIZES.gapSmall,
  },
  timeSend: {
    marginRight: SIZES.padding,
    maxWidth: SIZES.width / 2,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeStatusText: {
    color: COLORS.dark,
  },
  flexContainerRow: {
    width: 'auto',
    alignItems: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    gap: SIZES.gapSmall,
    width: 'auto',
  },
  ratingText: {
    marginLeft: SIZES.padding,
    ...FONTS.semi16,
  },
  favouriteIconContainer: {
    flexDirection: 'row',
  },
  lineDivider: {
    alignSelf: 'flex-start',
    width: SIZES.width,
    marginTop: SIZES.gapMedium,
  },
  buttonscontainer: {
    backgroundColor: COLORS.primary,
    width: responsiveFontSize(140),
    borderRadius: SIZES.radius,
    height: responsiveFontSize(34),
    borderWidth: 0,
    marginVertical: SIZES.gapMedium,
  },
  buttonscontainerOthers: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: responsiveFontSize(34),
    borderWidth: 0,
    marginVertical: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
    alignItems: 'center',
  },
  openClose: {
    marginLeft: SIZES.gapSmall,
    color: COLORS.dark,
  },
});

export default styles;
