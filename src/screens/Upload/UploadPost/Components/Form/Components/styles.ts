import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../../../constants/theme';

const styles = StyleSheet.create({
  flexContainer: {
    gap: responsiveFontSize(10),
    marginBottom: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge
  },
  scrollView: {
    flexDirection: 'row',
    gap: responsiveFontSize(10),
    paddingHorizontal: responsiveFontSize(10),
  },
  icon: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.BtnHeight / 1.4,
    padding: SIZES.gapSmall,
  },
  text: {
    color: COLORS.dark,
    ...FONTS.semi12,
  },
  containerButton: {
    width: SIZES.width / 1.02,
    marginVertical: SIZES.gapSmall,
  },
});

export default styles;
