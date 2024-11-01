// __mocks__/react-native-keyboard-aware-scroll-view.js

import React from 'react';
import { ScrollView } from 'react-native';

const KeyboardAwareScrollView = (props) => {
  return <ScrollView {...props}>{props.children}</ScrollView>;
};

export default KeyboardAwareScrollView;