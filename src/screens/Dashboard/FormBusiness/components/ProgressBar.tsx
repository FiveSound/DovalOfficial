import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, responsiveFontSize } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';

interface ProgressBarProps {
  progress: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const totalSections = 6;
  const filledSections = Math.floor(progress / (100 / totalSections));
  const { backgroundMaingrey, backSuccess } = useTheme()
  return (
    <View testID="progress-bar" style={styles.container}>
      {Array.from({ length: totalSections }).map((_, index) => (
        <View
          key={index}
          style={[
            [styles.section, { backgroundColor: backgroundMaingrey }],
            filledSections > index && styles.filledSection,
           
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    height: responsiveFontSize(4),
    margin: responsiveFontSize(2),
  },
  filledSection: {
    backgroundColor: COLORS.success, 
  },
});

export default ProgressBar;