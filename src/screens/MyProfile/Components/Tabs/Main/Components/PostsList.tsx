import React from 'react';
import { FlashList, FlatList, View } from '../../../../../../components/native';
import { responsiveFontSize, SIZES } from '../../../../../../constants/theme';

interface RecipeListProps {
  data: any[];
  renderItem: any;
  isRefreshing: boolean;
  onRefresh: () => void;
  estimatedItemSize: number;
}

const PostsList: React.FC<RecipeListProps> = ({ data, renderItem, isRefreshing, onRefresh, estimatedItemSize }) => {
  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id.toString()}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      contentContainerStyle={{ paddingBottom: SIZES.height / 2 }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={{ height: responsiveFontSize(100) }} />}
      estimatedItemSize={estimatedItemSize}
      scrollEnabled={false}
    />
  );
};

export default React.memo(PostsList);