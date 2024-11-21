import React from 'react';
import { FlashList, FlatList, View } from '../../../../../../components/native';
import { responsiveFontSize, SIZES } from '../../../../../../constants/theme';
import { FlexContainer } from '../../../../../../components/custom';

interface RecipeListProps {
  data: any[];
  renderItem: any;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  data,
  renderItem,
  isRefreshing,
  onRefresh,
}) => {
  return (
    <FlexContainer>
      <FlatList
        data={data}
        decelerationRate="normal"
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={item => item.id.toString()}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingBottom: SIZES.height / 4 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ height: responsiveFontSize(100) }} />
        }
        nestedScrollEnabled={true}
        scrollEnabled={true}
        initialNumToRender={3}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </FlexContainer>
  );
};

export default React.memo(RecipeList);
