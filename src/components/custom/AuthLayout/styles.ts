import { StyleSheet } from 'react-native';
import { SIZES, COLORS, responsiveFontSize } from '../../../constants/theme';

export default StyleSheet.create({
  container: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    zIndex: 0,
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
    width: responsiveFontSize(120),
    height: responsiveFontSize(120),
  },
});