import { View, Text, StyleSheet } from 'react-native';

interface ChipProps {
  title: string;
  color: string;
  size?: 'small' | 'medium' | 'large';
}

const Chip: React.FC<ChipProps> = ({ title, color, size = 'medium' }) => {
  return (
    <View style={[styles.chip, { backgroundColor: color }, styles[size]]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 16,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  small: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default Chip;
