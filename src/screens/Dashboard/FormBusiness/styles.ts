import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStartColor: COLORS.BackgroundMainLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapMedium,
  },
  containerButtons: {
    width: '24%',
    height: SIZES.BtnHeight / 1.4,
  },
  backPersonal: {
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapMedium,
    borderRadius: SIZES.radius,
  },
});
