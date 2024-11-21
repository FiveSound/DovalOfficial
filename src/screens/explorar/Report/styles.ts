import { StyleSheet } from 'react-native';
import { responsiveFontSize, SIZES } from '../../../constants/theme';
import { Platform } from '../../../components/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'ios' ? SIZES.gapLarge * 2 : SIZES.gapSmall,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveFontSize(10),
    paddingHorizontal: Platform.OS === 'ios' ? SIZES.gapLarge * 2 : SIZES.gapSmall,
    width: SIZES.width ,
  },
  label: {
    width: SIZES.width / 1.2,
  },
  footer: {
    height: responsiveFontSize(94),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
