import React from 'react';
import { SectionList as RNSectionList, SectionListProps } from 'react-native';

type Props<ItemT> = SectionListProps<ItemT>;

const SectionList = <ItemT,>(props: Props<ItemT>) => {
  return <RNSectionList {...props} />;
};

export default SectionList;
