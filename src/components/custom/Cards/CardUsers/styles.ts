import { StyleSheet } from 'react-native';
import { FONTS, responsiveFontSize, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveFontSize(6),
    gap: SIZES.gapSmall,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  flexContainer: {
    alignItems: 'center',
    width: SIZES.width / 2.4,
  },
  typographyShowName: {
    ...FONTS.text14,
    width: SIZES.width / 2.4,
  },
  typographyFollowers: {
    ...FONTS.semi16,
  },
  button: {
    paddingVertical: responsiveFontSize(4),
    borderRadius: SIZES.radius,
    width: SIZES.BtnWidth / 3,
    alignItems: 'center',
    height: SIZES.InputsHeight,
    justifyContent: 'center',
  },
  lineDivider: {
    height: responsiveFontSize(1),
  },
});

export default styles;
