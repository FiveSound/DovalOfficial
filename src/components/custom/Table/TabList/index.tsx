import { memo, useCallback, useRef } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import Typography from '../../Typography';
import FlexContainer from '../../FlexContainer';
import { IsLoading, LoadingScreen } from '../../Loaders';
import { Platform } from '../../../native';

type Item = {
  title: string;
  status: string;
};

type Props = {
  list: Item[];
  isLoading: boolean;
  status: string;
  onChange: (status: string) => void;
};

const TabList = ({ isLoading, list, status, onChange }: Props) => {
  const flatListRef = useRef<FlatList<Item>>(null);

  const handlePress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Item; index: number }) => {
      const isSelected = status === item.status;
      return (
        <Pressable
          style={[styles.tabItem, isSelected && styles.selected]}
          onPress={() => {
            onChange(item.status);
            handlePress(index);
          }}
          disabled={isSelected}
        >
          <Typography variant="H4title">{item.title}</Typography>
        </Pressable>
      );
    },
    [status, onChange],
  );

  if (isLoading) return <IsLoading />;

  return (
    <FlexContainer newStyle={styles.container}>
      <FlatList
        ref={flatListRef}
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        horizontal
        showsHorizontalScrollIndicator={true}
      />
    </FlexContainer>
  );
};

export default memo(TabList);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:
      Platform.OS === 'android' ? SIZES.gapLarge : SIZES.gapLarge,
  },
  tabItem: {
    paddingVertical: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapSmall,
    marginRight: SIZES.gapMedium,
  },
  selected: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.gapMedium,
  },
});
