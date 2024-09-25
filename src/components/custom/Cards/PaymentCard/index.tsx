import React, { useCallback, useRef, useState, useEffect } from "react";
import { StyleSheet, ViewToken, FlatList, Animated } from "react-native";
import { COLORS, SIZES } from "../../../../constants/theme";
import { FlexContainer, Dots, MiniCard, Typography, Buttons } from "../..";
import { View } from "../../../native";
import { useTheme } from "../../../../hooks";

type Row = {
  id?: string;
  onDelete?: (id: string) => void;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  selected?: boolean;
  isAddCard?: boolean;
};

type Props = {
  row: Row[];
  onSelected?: (id: string) => Promise<void>;
};

const SlideCard = ({ row , onSelected}: Props) => {
  const { border, Title } = useTheme();
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const flatListRef = useRef<FlatList<Row>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentVisibleIndex(viewableItems[0].index);
      }
    },
    [setCurrentVisibleIndex,]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Row, index: number })  => {
      return <MiniCard row={item} index={index} scrollX={scrollX} />;
    },
    [scrollX, row]
  );

  return (
    <View style={styles.main}>
      <Animated.FlatList
        ref={flatListRef}
        data={row}
        snapToInterval={SIZES.width / 1.2}
        renderItem={renderItem}
        keyExtractor={(item) => item.brand?.toString()}
        horizontal={true}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingHorizontal: (SIZES.width - SIZES.width * 0.8) / 2 }}
      />
      <FlexContainer newStyle={styles.container}>
        <Dots
          totalSteps={row?.length || 0}
          currentStep={currentVisibleIndex}
          activeColor={Title}
          inactiveColor={border}
        />
        <Buttons 
        label="Choose payment method"
        onPress={() => {
        }}

        />
      </FlexContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.gapLarge,
    alignItems: "center",
    justifyContent: "center",
  },
  addCardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.width / 1.4,
    height: SIZES.height / 4,
    borderWidth: 1,
    borderRadius: SIZES.radius,
  },
});

export default React.memo(SlideCard);