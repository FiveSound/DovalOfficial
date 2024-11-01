// __mocks__/react-native-svg.js

import React from 'react';
import { View } from 'react-native';

const Svg = ({ children, ...props }) => {
  return <View {...props}>{children}</View>;
};

export default Svg;