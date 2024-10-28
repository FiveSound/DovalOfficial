import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, ViewToken, FlatList, Animated } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import useNavigation from '../../../native/useNavigation';
import View from '../../../native/View';
import Image from '../../../native/Image';
import { useTheme } from '../../../../hooks';
import { CLOUDFRONT } from '../../../../services';
import FlexContainer from '../../FlexContainer';
import Dots from '../../Dots';

interface Cover {
  key: string;
}

type Props = {
  row: Cover[];
};

const CoverProducts = ({ row }: Props) => {
  const { border, Title } = useTheme();
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const flatListRef = useRef<FlatList<Cover>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const visibleItem = viewableItems.reduce((prev, current) => {
          return prev.isViewable && prev.item !== undefined ? prev : current;
        });

        if (visibleItem.index !== null) {
          setCurrentVisibleIndex(visibleItem.index);
        }
      }
    },
  ).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Cover; index: number }) => {
      const imageUrl = `${CLOUDFRONT}${item.key}`;
      return (
        <Image
          placeholderSource={imageUrl}
          style={styles.image}
          contentFit="cover"
          priority="high"
          cachePolicy="memory-disk"
        />
      );
    },
    [row],
  );

  if (row && row.length > 0) {
    return (
      <View style={styles.main}>
        <Animated.FlatList
          ref={flatListRef}
          data={row}
          snapToInterval={SIZES.width}
          snapToAlignment="center"
          decelerationRate="fast"
          renderItem={renderItem}
          keyExtractor={item => item.key}
          horizontal
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
        />
        <FlexContainer newStyle={styles.container} variant="row">
          <Dots
            totalSteps={row.length}
            currentStep={currentVisibleIndex}
            activeColor={COLORS.primary}
            inactiveColor={border}
          />
        </FlexContainer>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.height / 2.5,
  },
  container: {
    alignItems: 'center',
    width: SIZES.width,
    justifyContent: 'center',
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 2.5,
  },
});

export default React.memo(CoverProducts);
