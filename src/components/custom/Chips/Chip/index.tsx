import { View, Text, StyleSheet } from 'react-native';
import Typography from '../../Typography';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';

interface ChipProps {
  title: string;
  color: string;
  size?: 'small' | 'medium' | 'large';
}

const Chip: React.FC<ChipProps> = ({ title, color, size = 'medium' }) => {
  return (
    <View style={[styles.chip, { backgroundColor: color }, styles[size]]}>
      <Typography variant='H4title' newStyle={styles.text}>{title}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: SIZES.gapLarge,
    margin: SIZES.gapSmall,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: COLORS.TitleColor,
  },
  small: {
    paddingVertical: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapSmall,
  },
  medium: {
    paddingVertical: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapLarge,
  },
  large: {
    paddingVertical: responsiveFontSize(12),
    paddingHorizontal: responsiveFontSize(24),
  },
});

export default Chip;
