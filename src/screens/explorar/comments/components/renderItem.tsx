import React from 'react';
import Main from './Main';
import { ListRenderItemInfo } from 'react-native';
import { PropsComment } from '../types';

const renderItem = ({ item }: ListRenderItemInfo<PropsComment>) => {
  return <Main row={item} />;
};

export default renderItem;
