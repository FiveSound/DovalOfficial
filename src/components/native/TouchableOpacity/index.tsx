import React from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import * as Haptics from 'expo-haptics';

type Props = TouchableOpacityProps;

const TouchableOpacity = (props: Props) => {
  const handlePress = () => {
    if (props.onPress) {
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      props.onPress?.();
    }
  };
  return <RNTouchableOpacity {...props} onPress={handlePress} />;
};

export default TouchableOpacity;
