import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
  FlexContainer,
  TextButton,
  Typography,
} from '../../../../../components/custom';
import { SIZES } from '../../../../../constants/theme';

type Review = {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
};

type Props = {
  reviews: Review[];
};

const Reviews = ({ reviews }: Props) => {
  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewContainer}>
      <Typography variant="H4title">{item.name}</Typography>
      <Typography variant="SubDescription">{item.date}</Typography>
      <Typography variant="SubDescription">
        {'⭐'.repeat(item.rating)}
      </Typography>
      <Typography variant="SubDescription">{item.comment}</Typography>
    </View>
  );

  return (
    <>
      <FlexContainer newStyle={{ alignItems: 'center' }}>
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TextButton
          label="Add a review"
          sizeVariant="full"
          colorVariant="default"
          onPress={() => console.log('Add a review')}
          buttonContainerStyle={{
            marginBottom: SIZES.gapMedium,
          }}
        />
      </FlexContainer>
    </>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    padding: SIZES.gapMedium,
  },
});

export default Reviews;
