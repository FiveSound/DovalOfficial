import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, responsiveFontSize, SIZES } from '../../../../../constants/theme';
import { useTheme } from '../../../../../hooks';
import { FlexContainer, Typography } from '../../../../../components/custom';
import { useNavigation } from '../../../../../components/native';
import categories from './data';

const { width } = Dimensions.get('window');


const Categories = () => {
  const { backgroundMaingrey, mode } = useTheme();
  const navigation = useNavigation();
  const isDarkMode = mode === 'dark';

  return (
    <FlexContainer newStyle={styles.container}>
      <FlexContainer style={styles.row}>
        {categories.slice(0, 2).map((item) => (
          <TouchableOpacity 
          key={item.id} 
          disabled={item.id === 2}
          onPress={() => navigation.navigate(item.navigation)}
          style={[styles.largeItem, {
            backgroundColor: isDarkMode ? item.darkBackgroundColor : item.lightBackgroundColor,
            opacity: item.id === 2 ? 0.5 : 1,
          }]}>
            <Image source={item.image} style={styles.largeImage} />
            <Typography variant='subtitle' newStyle={styles.title}>{item.name}</Typography>
          </TouchableOpacity>
        ))}
      </FlexContainer>
      
      <View style={styles.row}>
        {categories.slice(2).map((item) => (
          <View key={item.id} style={[styles.smallItem, {
            backgroundColor: isDarkMode ? item.darkBackgroundColor : item.lightBackgroundColor,
            opacity: item.id === 3 || item.id === 4 || item.id === 5 ? 0.5 : 1,
          }]}>
            <Image source={item.image} style={styles.smallImage} />
              <Typography variant='H4title' newStyle={styles.title}>{item.name}</Typography>
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
    borderRadius: SIZES.gapSmall,
    padding: SIZES.gapLarge,
    alignItems: 'center',
  },
  smallItem: {
    width: (width - SIZES.gapLarge * 3) / 3,
    borderRadius: SIZES.gapSmall,
    padding: SIZES.gapLarge,
    alignItems: 'center',
  },
  largeImage: {
    width: responsiveFontSize(60),
    height: responsiveFontSize(60),
    marginBottom: SIZES.gapSmall,
  },
  smallImage: {
    width: responsiveFontSize(44),
    height: responsiveFontSize(44),
    marginBottom: SIZES.gapSmall,
  },
  title: {
    textAlign: 'center',
    color: COLORS.dark
  },
});

export default Categories;
