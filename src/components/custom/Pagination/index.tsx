import { memo } from 'react';
import {  StyleSheet } from 'react-native';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import { useTheme } from '../../../hooks';
import Typography from '../Typography';
import { Pressable, ScrollView } from '../../native';
import FlexContainer from '../FlexContainer';

type Props = {
  currentPage: number;
  onChange: (page: number) => void;
  pagination: number[];
};

const Pagination = ({ currentPage, onChange, pagination }: Props) => {
  const { backgroundMaingrey , Title, border} = useTheme();
  
  const renderItem = (item: number) => (
    <Pressable
      key={item}
      role="button"
      onPress={() => onChange(item)}
      style={[
        styles.point,
        currentPage === item ? styles.active : null,
        {
          backgroundColor:
            currentPage === item ? COLORS.primary : backgroundMaingrey,
          borderWidth: currentPage === item ? 0 : SIZES.borderWidth,
            borderColor: border
        },
      ]}
      disabled={currentPage === item}
    >
      <Typography variant="H4title" newStyle={{
        color: currentPage === item ? COLORS.dark : Title
      }}>
        {item}
      </Typography>
    </Pressable>
  );

  return (
    <FlexContainer style={styles.pagination}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {pagination.map(renderItem)}
      </ScrollView>
    </FlexContainer>
  );
};

export default memo(Pagination);

const styles = StyleSheet.create({
  pagination: {
    margin: SIZES.gapSmall,
    position: 'absolute',
    bottom: responsiveFontSize(80),
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  point: {
    marginHorizontal: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapMedium,
    borderRadius: SIZES.gapLarge,
    borderWidth: SIZES.borderWidth,
  },
  active: {},
  title: {
    color: COLORS.dark,
  },
  footer: {
    color: COLORS.dark,
  },
});