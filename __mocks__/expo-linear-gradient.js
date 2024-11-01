// __mocks__/expo-linear-gradient.js

import React from 'react';
import { View } from 'react-native';

const ExpoLinearGradient = ({ children, ...props }) => {
  return <View {...props}>{children}</View>;
};

export default ExpoLinearGradient;