import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SIZES.BtnHeight,
    width: SIZES.BtnWidth,
    borderWidth: SIZES.borderWidth,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.gapLarge,
  },
  text: {
    ...FONTS.semi14,
    marginHorizontal: SIZES.gapLarge,
    textAlign: 'center',
  },
});

export default styles;
