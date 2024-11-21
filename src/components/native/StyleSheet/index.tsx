import React from 'react';
import { StyleSheet as RNStyleSheet, StyleSheetProperties } from 'react-native';

type Props = StyleSheetProperties;

const StyleSheet = (props: Props) => {
  return <RNStyleSheet {...props} />;
};

export default StyleSheet;
