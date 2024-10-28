import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import Typography from '../../Typography';
import i18next from '../../../../Translate';
import { useTheme } from '../../../../hooks';
type Props = {
  onPressStores: () => void;
  onPressFreeShipping: () => void;
  filterStores?: boolean;
  freeShipping?: boolean;
  rating?: number;
};

const ToggleFilter = (props: Props) => {
  const {
    onPressStores,
    onPressFreeShipping,
    filterStores,
    freeShipping,
    rating,
  } = props;
  const {
    bgInput,
    borderInput,
    color,
    backgroundMaingrey,
    Description,
    border,
  } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: filterStores ? COLORS.primary : backgroundMaingrey,
            borderWidth: filterStores ? 0 : SIZES.borderWidth,
            borderColor: borderInput,
          },
        ]}
        onPress={onPressStores}
      >
        <Typography
          variant="H4title"
          newStyle={{
            color: filterStores ? COLORS.dark : Description,
          }}
        >
          {filterStores ? i18next.t('Show all') : i18next.t('See open stores')}
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: freeShipping ? COLORS.primary : backgroundMaingrey,
            borderWidth: filterStores ? 0 : SIZES.borderWidth,
            borderColor: borderInput,
          },
        ]}
        onPress={onPressFreeShipping}
      >
        <Typography
          variant="H4title"
          newStyle={{
            color: freeShipping ? COLORS.dark : Description,
          }}
        >
          {freeShipping
            ? i18next.t('All shipments')
            : i18next.t('Free shipping only')}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SIZES.gapSmall,
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
  },
  button: {
    paddingHorizontal: SIZES.gapMedium,
    paddingVertical: SIZES.gapSmall,
    borderRadius: SIZES.radius,
    maxWidth: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ToggleFilter;
