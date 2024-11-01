// __mocks__/react-native-maps.js

import React from 'react';
import { View } from 'react-native';

// Mock para el componente MapView
const MockMapView = (props) => {
  return <View {...props}>{props.children}</View>;
};

// Mock para el componente Marker
const MockMarker = (props) => {
  return <View {...props}>{props.children}</View>;
};

// Mock para otros componentes que puedas usar de react-native-maps
const reactNativeMaps = {
  __esModule: true,
  default: MockMapView,
  Marker: MockMarker,
  // Añade más componentes si es necesario
};

export default reactNativeMaps;