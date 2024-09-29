import React from 'react';
import { FlatList, View } from '../../../../../../components/native';
import { responsiveFontSize } from '../../../../../../constants/theme';
import { FlexContainer } from '../../../../../../components/custom';

interface RecipeListProps {
  data: any[];
  renderItem: any;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ data, renderItem, isRefreshing, onRefresh }) => {
  return (
    <FlexContainer>
      <FlatList
      data={data}
      decelerationRate='normal'
      renderItem={renderItem}
      numColumns={1}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={{ height: responsiveFontSize(100) }} />}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      nestedScrollEnabled={true}
      scrollEnabled={true}
    />
    </FlexContainer>
  );
};

export default React.memo(RecipeList);