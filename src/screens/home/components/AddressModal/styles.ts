import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: SIZES.gapLarge,
    flexDirection: 'row',
  },
  containerMain: {
    paddingHorizontal: SIZES.gapLarge,
  },
  containerCircle: {
    width: responsiveFontSize(50),
    height: responsiveFontSize(50),
    borderRadius: responsiveFontSize(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.dark,
  },
});

export default styles;
