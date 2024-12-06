import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, ViewToken } from "react-native";
import { useTheme } from "../../../../../hooks";
import { View, Image, FlatList } from "../../../../../components/native";
import { COLORS, SIZES } from "../../../../../constants/theme";
import { Dots, FlexContainer, LineDivider } from "../../../../../components/custom";
import { CLOUDFRONT } from "../../../../../services";
import { Ilustrations } from "../../../../../constants";

interface MediaItem {
  key: string;
  type: "photo" | "video";
  id: string;
  extension?: string;
}

interface CoversProps {
  data: MediaItem[];
  ShowDivider?: boolean;
}

const Covers = React.memo(({ data, ShowDivider = false }: CoversProps) => {
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const { borderInput, backgroundMaingrey } = useTheme();

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentVisibleIndex(viewableItems[0].index!);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = useCallback(
    ({ item }: { item: MediaItem }) => (
      <View style={styles.main}>
        <Image
          contentFit="cover"
          style={[styles.media, { borderColor: borderInput }]}
          placeholderSource={`${CLOUDFRONT}${item.key}`}
          cachePolicy="memory-disk"
        />
      </View>
    ),
    [borderInput]
  );

  if (data?.length === 0 || 0) {
    return (
      <Image server={false} placeholderSource={Ilustrations.EmptyMedia} style={styles.mediaEmpty} contentFit="cover" />
    );
  }

  if (data) {
  
    return (
      <>
        <FlatList
          data={data}
          horizontal
          decelerationRate="fast"
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          style={styles.container}
        />
        <Dots
          currentStep={currentVisibleIndex}
          totalSteps={data.length}
          activeColor={COLORS.primary}
          inactiveColor={backgroundMaingrey}
        />
        {ShowDivider && <LineDivider variant="primary" />}
      </>
    );
  }
});

const styles = StyleSheet.create({
  main: {
    width: SIZES.width,
    height: SIZES.height / 2.3,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: SIZES.width,
    marginVertical: SIZES.gapMedium,
  },
  media: {
    width: SIZES.width / 1.2,
    height: SIZES.height / 2.4,
    borderRadius: SIZES.radius,
  },
  mediaEmpty: {
    height: SIZES.height / 2.5,
    width: SIZES.width,
  },
});

export default Covers;
