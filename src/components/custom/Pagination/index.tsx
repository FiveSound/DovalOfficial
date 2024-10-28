import { memo } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';
import { useTheme } from '../../../hooks';
import Typography from '../Typography';

type Props = {
  currentPage: number;
  onChange: (page: number) => void;
  pagination: number[];
};

const Pagination = ({ currentPage, onChange, pagination }: Props) => {
  const { backgroundMaingrey } = useTheme();
  const renderItem = ({ item }: { item: number }) => (
    <Pressable
      role="button"
      onPress={() => onChange(item)}
      style={[
        styles.point,
        currentPage === item ? styles.active : null,
        {
          backgroundColor:
            currentPage === item ? COLORS.primary : backgroundMaingrey,
        },
      ]}
      disabled={currentPage === item}
    >
      <Typography variant="H4title" newStyle={styles.title}>
        {item}
      </Typography>
    </Pressable>
  );

  return (
    <View style={styles.pagination}>
      <FlatList
        data={pagination}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(Pagination);

const styles = StyleSheet.create({
  pagination: {
    margin: SIZES.gapSmall,
  },
  point: {
    marginRight: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapMedium,
    borderRadius: SIZES.gapLarge,
  },
  active: {},
  title: {
    color: COLORS.dark,
  },
  footer: {
    color: COLORS.dark,
  },
});
