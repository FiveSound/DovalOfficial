import { memo, useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import Typography from '../../Typography';
import FlexContainer from '../../FlexContainer';
import { IsLoading } from '../../Loaders';
import { Platform, Pressable, TouchableOpacity } from '../../../native';
import { useTheme } from '../../../../hooks';

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
  const { backgroundMaingrey , Title} = useTheme()

  const handlePress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Item; index: number }) => {
      const isSelected = status === item.status;
      return (
        <TouchableOpacity
          style={[styles.tabItem, { backgroundColor: backgroundMaingrey }, isSelected && styles.selected]}
          onPress={() => {
            onChange(item.status);
            handlePress(index);
          }}
          disabled={isSelected}
        >
          <Typography variant="H4title" newStyle={{
            color: isSelected ? COLORS.dark : Title
          }}>{item.title}</Typography>
        </TouchableOpacity>
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
    padding:
      Platform.OS === 'android' ? SIZES.gapLarge : SIZES.gapLarge,
  },
  tabItem: {
    paddingVertical: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapSmall,
    marginRight: SIZES.gapMedium,
  },
  title: {
    color: COLORS.dark,
  },
  selected: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.gapMedium,
  },
});
