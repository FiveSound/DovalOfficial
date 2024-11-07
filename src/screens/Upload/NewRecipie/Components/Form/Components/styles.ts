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
  },
  scrollView: {
    flexDirection: 'row',
    gap: responsiveFontSize(10),
    paddingHorizontal: responsiveFontSize(10),
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.BtnHeight / 1.4,
    padding: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.radius,
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
