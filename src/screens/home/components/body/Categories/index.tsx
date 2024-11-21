import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { iconsNative } from '../../../../../constants';
import { COLORS, responsiveFontSize, SIZES } from '../../../../../constants/theme';
import { useTheme } from '../../../../../hooks';
import { FlexContainer, Typography } from '../../../../../components/custom';
import { useNavigation } from '../../../../../components/native';
import categories from './data';

const { width } = Dimensions.get('window');


const Categories = () => {
  const { backgroundMaingrey } = useTheme();
  const navigation = useNavigation();

  return (
    <FlexContainer newStyle={styles.container}>
      <FlexContainer style={styles.row}>
        {categories.slice(0, 2).map((item) => (
          <TouchableOpacity 
          key={item.id} 
          onPress={() => navigation.navigate(item.navigation)}
          style={[styles.largeItem, {
            backgroundColor: item.backgroundColor,
          }]}>
            <Image source={item.image} style={styles.largeImage} />
            <Typography variant='subtitle'>{item.name}</Typography>
            <Typography variant='SubDescription'>{item.description}</Typography>
          </TouchableOpacity>
        ))}
      </FlexContainer>
      <View style={styles.row}>
        {categories.slice(2).map((item) => (
          <View key={item.id} style={[styles.smallItem, {
            backgroundColor: item.id === 3 ? backgroundMaingrey : item.backgroundColor,
          }]}>
            <Image source={item.image} style={styles.smallImage} />
            <Text style={styles.title}>{item.name}</Text>
          </View>
        ))}
      </View>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.gapMedium,
    gap: SIZES.gapMedium,
  },
  largeItem: {
    width: (width - SIZES.gapLarge * 2.4) / 2,
    borderRadius: SIZES.radius,
    padding: SIZES.gapLarge,
    alignItems: 'center',
  },
  smallItem: {
    width: (width - SIZES.gapLarge * 3) / 3,
    borderRadius: SIZES.radius,
    padding: SIZES.gapLarge,
    alignItems: 'center',
  },
  largeImage: {
    width: responsiveFontSize(100),
    height: responsiveFontSize(100),
    marginBottom: SIZES.gapSmall,
  },
  smallImage: {
    width: responsiveFontSize(50),
    height: responsiveFontSize(50),
    marginBottom: SIZES.gapSmall,
  }
});

export default Categories;
