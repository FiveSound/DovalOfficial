import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
  View
} from "react-native";
import { useMemo } from "react";
import MasonryItem from "./MasonryItem";
import React from "react";
import { SIZES } from "../../../constants/theme";
import Buttons from "../Buttons/Buttons";

interface IMasonryList {
  pins: any[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  loading?: boolean;
  showInf?: boolean;
  sharedTransitionTag?: string;
}

const MasonryList = ({
  pins = [],
  refreshing = false,
  onRefresh = () => {},
  onLoadMore = () => {},
  loading = false,
  showInf = true,
  sharedTransitionTag,
}: IMasonryList) => {
  const { width } = useWindowDimensions();

  const COLUMN_WIDTH = SIZES.width / 2;
  const numColumns = Math.max(Math.floor(width / COLUMN_WIDTH), 1);


  const processedPins = useMemo(() => {
    return pins;
  }, [pins]);

  const columns = useMemo(() => {
    const cols: any[][] = Array.from({ length: numColumns }, () => []);
    processedPins.forEach((pin, index) => {
      const columnIndex = index % numColumns;
      cols[columnIndex].push(pin);
    });
    return cols;
  }, [processedPins, numColumns]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
        />
      }
    >
      <View style={styles.container}>
        {columns.map((columnPins, colIndex) => (
          <View style={styles.column} key={`column_${colIndex}`}>
            {columnPins.map((pin, itemIndex) => {
              const delay = (colIndex * columns.length + itemIndex) * 100;
              return (
                <MasonryItem
                  key={pin.id}
                  pin={pin}
                  showInf={showInf}
                  delay={delay}
                />
              );
            })}
          </View>
        ))}
      </View>
      <Buttons
        label={loading ? "" : "Load more"}
        loading={loading}
        onPress={onLoadMore}
        variant="disabled"
        containerButtons={styles.containerButtons}
        variantLabel="disabled"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: SIZES.gapSmall / 4,
    alignItems: "flex-start",
  },
  containerButtons: {
    borderRadius: SIZES.padding,
    width: SIZES.width / 3,
    alignSelf: "center",
    marginTop: SIZES.padding,
  },
});

export default React.memo(MasonryList);