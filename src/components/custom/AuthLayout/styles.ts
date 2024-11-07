import { StyleSheet } from 'react-native';
import { SIZES, COLORS, responsiveFontSize } from '../../../constants/theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  keyboardAvoidingView: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width,
    backgroundColor: COLORS.primary,
    height: SIZES.height / 3,
  },
  logo: {
    width: responsiveFontSize(140),
    height: responsiveFontSize(140),
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.gapMedium,
    gap: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge
  },
});
