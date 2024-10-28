import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, ViewToken, FlatList, Animated } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import i18next from '../../../../Translate';
import useNavigation from '../../../native/useNavigation';
import View from '../../../native/View';
import FlexContainer from '../../FlexContainer';
import Dots from '../../Dots';
import Icons from '../../Icons';
import Typography from '../../Typography';

type Order = {
  currentStep: number;
  estimated_time: string;
  orderID: number;
  status: string;
  steps: any[];
};

type Props = {
  row: Order[];
  onSelected?: (id: string) => Promise<void>;
  RenderItem: (item: Order, index: number) => React.ReactNode;
  label: string;
};

const Carrousel = ({ row, onSelected, RenderItem, label }: Props) => {
  const { border, Title } = useTheme();
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const flatListRef = useRef<FlatList<Order>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const visibleItem = viewableItems.reduce((prev, current) => {
          return prev.isViewable && prev.item !== undefined ? prev : current;
        });

        if (visibleItem.index !== null) {
          setCurrentVisibleIndex(visibleItem.index);
          setActiveOrder(visibleItem.item);
        }
      }
    },
  ).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Order; index: number }) => {
      return RenderItem(item, index);
    },
    [RenderItem],
  );

  if (row && row.length > 0) {
    return (
      <View style={styles.main}>
        <FlexContainer newStyle={styles.container} variant="row">
          <Dots
            totalSteps={row.length}
            currentStep={currentVisibleIndex}
            activeColor={COLORS.primary}
            inactiveColor={border}
          />
          <Icons
            appendIcons={
              <Typography variant="H4title" newStyle={styles.text}>
                {i18next.t('View order')}
              </Typography>
            }
            onPress={() => {
              if (activeOrder) {
                navigation.navigate('OrderStack', {
                  screen: 'Tracking',
                  params: {
                    orderID: activeOrder.orderID,
                  },
                });
              }
            }}
          />
        </FlexContainer>
        <Animated.FlatList
          ref={flatListRef}
          data={row}
          snapToInterval={SIZES.width}
          snapToAlignment="center"
          decelerationRate="fast"
          renderItem={renderItem}
          keyExtractor={item => item.orderID.toString()}
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
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
  },
  text: {
    justifyContent: 'flex-end',
    width: '100%',
    textAlign: 'right',
  },
});

export default React.memo(Carrousel);
