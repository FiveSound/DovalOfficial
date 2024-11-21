import React from 'react';
import { ScrollViewProps, ScrollView as RNScrollView } from 'react-native';
// import { ScrollView as RNScrollViewNew } from 'react-native-virtualized-view'

type Props = ScrollViewProps;

const ScrollView = (props: Props) => {
  return <RNScrollView {...props} />;
};

export default ScrollView;
