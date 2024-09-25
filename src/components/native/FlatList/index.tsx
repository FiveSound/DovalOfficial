import React from 'react'
import { FlatList as RNFlatList, FlatListProps } from 'react-native'

type Props<ItemT> = FlatListProps<ItemT>

const FlatList = <ItemT,>(props: Props<ItemT>) => {
  return (
    <RNFlatList {...props} />
  )
}

export default FlatList