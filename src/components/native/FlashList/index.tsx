import React from 'react';
import { FlashList as RNFlatList, FlashListProps } from '@shopify/flash-list';

type Props<ItemT> = FlashListProps<ItemT>;

const FlashList = <ItemT,>(props: Props<ItemT>) => {
  return <RNFlatList {...props} />;
};

export default FlashList;
