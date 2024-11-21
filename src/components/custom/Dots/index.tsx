import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveFontSize } from '../../../constants/theme';

interface DotProps {
  totalSteps: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
  size?: number;
  sizeInactive?: number;
}

const Dots: React.FC<DotProps> = ({
  totalSteps,
  currentStep,
  activeColor = 'rgba(255, 255, 255, 0.4)',
  inactiveColor = 'rgba(255, 255, 255, 0.1)',
  size = responsiveFontSize(8),
  sizeInactive = responsiveFontSize(6),
}) => {
  const renderDots = () => {
    return Array.from({ length: totalSteps }, (_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          {
            backgroundColor:
              index === currentStep ? activeColor : inactiveColor,
            width: index === currentStep ? size : sizeInactive,
            height: index === currentStep ? size : sizeInactive,
            borderRadius: size / 2,
            // borderColor: "rgba(255, 255, 255, 0.4)",
            // borderWidth: responsiveFontSize(0.5)
          },
        ]}
      />
    ));
  };

  return <View style={styles.container}>{renderDots()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: responsiveFontSize(8),
    backgroundColor: 'transparent',
  },
  dot: {
    margin: responsiveFontSize(4),
  },
});

export default Dots;
