import React from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from 'react-native';

type Props = KeyboardAvoidingViewProps;

const KeyboardAvoidingView = (props: Props) => {
  return <RNKeyboardAvoidingView {...props} />;
};

export default KeyboardAvoidingView;
