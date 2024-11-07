import React, { useCallback, useRef, useState, useEffect } from 'react';
import { StyleSheet, ViewToken, FlatList, Animated } from 'react-native';
import { handleViewService } from '../../../../../services/reactions';
import {
  COLORS,
  responsiveFontSize,
  SIZES,
} from '../../../../../constants/theme';
import { FlexContainer, Dots } from '../../../../../components/custom';
import { View } from '../../../../../components/native';
import PhotoItem from './PhotoItem';

interface MediaItem {
  uri: string;
  key: string;
  type: 'photo' | 'video';
  parentId: string;
  extension?: string;
  mediaType: number;
}

interface VideoPreviewProps {
  postID: number;
  DataExplorar: MediaItem[];
  onVisibleItemChange: (index: number) => void;
  isItemFocused: boolean;
}

const Photo: React.FC<VideoPreviewProps> = ({
  postID,
  DataExplorar,
  onVisibleItemChange,
  isItemFocused,
}) => {
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const flatListRef = useRef<FlatList<MediaItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentVisibleIndex(viewableItems[0].index);
        onVisibleItemChange(viewableItems[0].index);
      }
    },
    [setCurrentVisibleIndex, onVisibleItemChange],
  );

  useEffect(() => {
    if (isItemFocused) {
      handleViewService(postID);
    }
  }, [isItemFocused]);

  const renderItem = useCallback(
    ({ item, index }: { item: MediaItem; index: number }) => (
      <PhotoItem item={item} index={index} scrollX={scrollX} />
    ),
    [scrollX],
  );

  return (
    <View style={styles.main}>
      <Animated.FlatList
        ref={flatListRef}
        data={DataExplorar}
        snapToInterval={SIZES.width * 0.9}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
        horizontal={true}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        contentContainerStyle={{
          paddingHorizontal: (SIZES.width - SIZES.width * 0.8) / 2,
        }}
      />
      <FlexContainer
        newStyle={{
          position: 'relative',
          bottom: SIZES.height / 6,
          backgroundColor: 'transparent',
        }}
      >
        <Dots
          totalSteps={DataExplorar.length}
          currentStep={currentVisibleIndex}
        />
      </FlexContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: SIZES.width,
    height: SIZES.height - responsiveFontSize(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dark,
  },
});

export default React.memo(Photo);
