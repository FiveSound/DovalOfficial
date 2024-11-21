import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedBox: React.FC = () => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    translateY.value = withTiming(100, { duration: 1000 });
  }, []);

  return <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'blue' }, animatedStyle]} />;
};

export default AnimatedBox;