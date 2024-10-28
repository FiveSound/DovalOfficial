import { SIZES } from './../../../constants/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapLarge,
  },
  buttons: {
    width: '100%',
  },
  line: {
    width: SIZES.BtnWidth,
  },
  flexContainer: {
    paddingHorizontal: SIZES.gapLarge,
    gap: SIZES.gapSmall,
    alignItems: 'center',
  },
});

export default styles;
