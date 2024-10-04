import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveFontSize, SIZES } from '../../../constants/theme';

const SkeletonAssets = () => {
  return (
    <View style={styles.container}>
      <Skeleton 
        width={SIZES.width / 3 - 3}
        height={SIZES.width / 2 - 2}
        colorMode='dark'
      />
    </View>
  );
};

export default SkeletonAssets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: responsiveFontSize(1),

  }
});