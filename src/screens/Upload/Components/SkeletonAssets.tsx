
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveFontSize, SIZES } from '../../../constants/theme';

const SkeletonAssets = () => {
  return (
    <View style={styles.container}>

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
  },
});
