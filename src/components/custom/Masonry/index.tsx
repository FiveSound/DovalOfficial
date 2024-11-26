import {
  StyleSheet,
  RefreshControl,
  View,
  useWindowDimensions,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COLORS, SIZES } from "../../../constants/theme";
import Buttons from "../Buttons/Buttons";
import MasonryItem from "./MasonryItem";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list"; 
import { useIsFocused } from "@react-navigation/native";
import { Platform } from "../../native";
import i18next from "@/src/Translate";
import Ads from "./Ads";

interface IMasonryList {
  pins: any[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  loading?: boolean;
  showInf?: boolean;
}

const MasonryList = ({
  pins = [],
  refreshing = false,
  onRefresh,
  onLoadMore,
  loading = false,
  showInf = true,
}: IMasonryList) => {
  const { width } = useWindowDimensions();
  const [focusedIds, setFocusedIds] = useState<Set<string>>(new Set());
  const COLUMN_WIDTH = useMemo(() => SIZES.width / 2, []);
  const numColumns = useMemo(() => {
    const calculatedColumns = Math.max(Math.floor(width / COLUMN_WIDTH), 1);
    return calculatedColumns;
  }, [width, COLUMN_WIDTH]);

  const isFocused = useIsFocused();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      const newFocusedIds = new Set<string>();
      viewableItems.forEach((item) => {
        if (item.item && item.item.id) { 
          newFocusedIds.add(item.item.id.toString());
        }
      });
      setFocusedIds(newFocusedIds);
    }
  );

  useEffect(() => {
    if (!isFocused) {
      setFocusedIds(new Set());
    }
  }, [isFocused]);

  const insertAdsRandomly = (data: any[], adProbability: number): any[] => {
    const dataWithAds: any[] = [];
    data.forEach((item, index) => {
      dataWithAds.push(item);
      if (Math.random() < adProbability) {
        dataWithAds.push({ id: `ad-${index}-${Math.random()}`, isAd: true });
      }
    });
    return dataWithAds;
  };

  const dataWithAds = useMemo(() => insertAdsRandomly(pins, 0.05), [pins]);

  const handleEndReached = () => {
    if (onLoadMore && !loading) {
      onLoadMore();
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      if (item.isAd) {
        return (
          <Ads background={COLORS.error} label={i18next.t('Business nearby for You')} />
        );
      }

      const isItemFocused = focusedIds.has(item.id.toString());
      return (
        <MasonryItem
          key={item.id}
          pin={item}
          showInf={showInf}
          isFocused={isItemFocused}
          ads={false} 
        />
      );
    },
    [showInf, focusedIds]
  );

  return (
    <View style={styles.container}>
     <MasonryFlashList
        data={dataWithAds}
        renderItem={renderItem}
        keyExtractor={(item) => `masonry-item-${item.id}`}
        numColumns={numColumns}
        optimizeItemArrangement={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.flashList}
        ListFooterComponent={
          <Buttons
            label={loading ? i18next.t("loading") : i18next.t("loadMore")}
            loading={loading}
            onPress={onLoadMore}
            variant="disabled"
            color='primary'
            containerButtons={styles.containerButtons}
            variantLabel="disabled"
          />
        }
        estimatedItemSize={300}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 100,
        }}
        getItemType={(item) => {
          return item.mediaType === 0 ? 'video' : 'image';
        }}
        getColumnFlex={(items, index, maxColumns, extraData) => {
          return index === 1 ? 1 : 1;
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'ios' ? SIZES.gapSmall : SIZES.gapSmall,
  },
  flashList: {
    paddingBottom: SIZES.height / 10,
  },
  containerButtons: {
    borderRadius: SIZES.padding,
    width: SIZES.width / 3,
    alignSelf: "center",
    marginTop: SIZES.padding,
  },
});

export default React.memo(MasonryList);