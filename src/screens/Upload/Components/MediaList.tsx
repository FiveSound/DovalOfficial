import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FlexContainer } from '../../../components/custom';
import { SIZES } from '../../../constants/theme';

export interface MediaItem {
  node: {
    id: string;
    uri: string;
    mediaType: 'video' | 'photo';
    duration?: number;
  };
}
interface MediaListProps {
  media: MediaItem[];
  onEndReached: () => void;
  renderItem: ({ item }: { item: MediaItem }) => JSX.Element;
}

const MediaList: React.FC<MediaListProps> = ({
  media,
  onEndReached,
  renderItem,
}) => (
  <FlexContainer newStyle={styles.container}>
    <FlatList
      data={media}
      decelerationRate="normal"
      keyExtractor={(item, index) => `${item.node.id} - ${index}`}
      numColumns={3}
      horizontal={false}
      initialNumToRender={24} // Aumentado de 10 a 20
      maxToRenderPerBatch={12} // Aumentado de 10 a 20
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      renderItem={renderItem}
      scrollEnabled={true}
      removeClippedSubviews={true} // Mejora el rendimiento en listas largas
      getItemLayout={(data, index) => (
        {length: 50, offset: 50 * index, index}
      )}
      windowSize={5} // Ajusta cuántas páginas se mantienen en memoria
      contentContainerStyle={{ paddingBottom: SIZES.height }}
    />
  </FlexContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MediaList;
