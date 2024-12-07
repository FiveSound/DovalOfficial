import { StyleSheet } from 'react-native';
import { FONTS, responsiveFontSize, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
  containerEmpty: {
    width: SIZES.width,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: SIZES.gapLarge * 2,
    paddingBottom: SIZES.height / 10,
  },
  labelStylePart1: {
    ...FONTS.heading24,
    textAlign: 'center',
  },
  containerGrid: {
    width: SIZES.width,
    flex: 1,
  },
  grid: {
    paddingHorizontal: responsiveFontSize(1),
    paddingVertical: responsiveFontSize(1.2),
  },
  flatListContent: {
    paddingBottom: SIZES.height / 1.43,
  },
});

export default styles;
