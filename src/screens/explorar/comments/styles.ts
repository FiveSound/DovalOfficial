import { StyleSheet } from 'react-native';
import {
  SIZES,
  COLORS,
  responsiveFontSize,
  FONTS,
} from '../../../constants/theme';

const styles = StyleSheet.create({
  flexContainer: {
    width: SIZES.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 'auto',
    paddingHorizontal: SIZES.gapMedium,
  },
  textInput: {
    flex: 1,
    borderRadius: SIZES.radiusExtra,
    paddingHorizontal: SIZES.gapMedium,
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveFontSize(40),
    marginHorizontal: SIZES.gapSmall,
    ...FONTS.semi16,
  },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: responsiveFontSize(28),
    height: responsiveFontSize(18),
    width: responsiveFontSize(18),
    margin: SIZES.radius,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  safeAreaView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: SIZES.width,
    borderTopRightRadius: responsiveFontSize(20),
    borderTopLeftRadius: responsiveFontSize(20),
  },
  scrollViewContent: {
    width: SIZES.width,
  },
  containerHeader: {
    height: responsiveFontSize(60),
    width: SIZES.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.margin,
    borderTopRightRadius: responsiveFontSize(20),
    borderTopLeftRadius: responsiveFontSize(20),
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SIZES.gapMedium,
  },
  emoji: {
    fontSize: responsiveFontSize(24),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radiusExtra,
    padding: SIZES.gapSmall,
    margin: SIZES.gapSmall,
  },
  emojiIcon: {
    fontSize: responsiveFontSize(24),
    marginLeft: SIZES.gapSmall,
  },
  uploadIcon: {
    backgroundColor: COLORS.primary,
    padding: SIZES.gapSmall,
    borderRadius: SIZES.radiusExtra,
  },
});

export default styles;
