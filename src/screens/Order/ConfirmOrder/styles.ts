import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green',
    transform: [{ scale: 0 }],
    opacity: 0,
  },
});

export default styles;
