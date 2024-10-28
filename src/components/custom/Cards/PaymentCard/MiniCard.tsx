import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Delete03IconSharp,
  PlusSignIcon,
} from '../../../../constants/IconsPro';
import FlexContainer from '../../FlexContainer';
import { iconsNative } from '../../../../constants';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import Typography from '../../Typography';
const AddPayment = React.lazy(() => import('../../../../screens/Settings/Generals/Payments Methods/components/AddPayment'));import Pressable from '../../../native/Pressable';
import Image from '../../../native/Image';
import { Checkbox } from '../../Checkbox';
import React from 'react';


type Row = {
  id?: string;
  onDelete?: (id: string) => void;
  onSelected?: (id: string) => void;
  display_brand?: string;
  exp_month: string;
  exp_year: string;
  selected?: boolean;
  isAddCard?: boolean;
  brand: string;
  last4: string;
};

type Props = {
  row?: Row;
  index: number;
  scrollX: Animated.Value;
};

const MiniCard = ({ row, index, scrollX }: Props) => {
  const {
    Title,
    Description,
    borderInput,
    backgroundMaingrey,
    BackgroundMain,
  } = useTheme();

  const onDelete = () => {
    if (row?.onDelete && row?.id) {
      row.onDelete(row.id);
    }
  };

  const onSelected = () => {
    if (row?.onSelected && row?.id) {
      row?.onSelected(row?.id);
    }
  };

  const inputRange = [
    ((index - 1) * SIZES.width) / 1.2,
    (index * SIZES.width) / 1.2,
    ((index + 1) * SIZES.width) / 1.2,
  ];

  const scale = scrollX
    ? scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.1, 0.8],
        extrapolate: 'clamp',
      })
    : 1;

  const opacity = scrollX
    ? scrollX.interpolate({
        inputRange,
        outputRange: [0.4, 2, 0.4],
        extrapolate: 'clamp',
      })
    : 1;

  return (
    <Animated.View
      key={row?.id}
      style={[styles.containerManin, { transform: [{ scale }], opacity }]}
    >
      <LinearGradient
        style={[styles.background, { borderColor: borderInput }]}
        start={{ x: 0.1, y: -0.3 }}
        colors={[backgroundMaingrey, borderInput, BackgroundMain]}
      >
        {row?.brand === 'AddCardGeneral' ? (
          <AddPayment />
        ) : (
          <FlexContainer newStyle={styles.container}>
            <FlexContainer>
              {row?.onSelected && (
                <Checkbox
                  checked={row?.selected || false}
                  onChange={onSelected}
                />
              )}
              <Typography variant="title" newStyle={styles.brand}>
                {row?.brand}
              </Typography>
              <Typography variant="subtitle" newStyle={{ color: Description }}>
                #### #### #### {row?.last4}
              </Typography>
              <Typography variant="subtitle" newStyle={{ color: Description }}>
                {row?.exp_month} /{row?.exp_year}
              </Typography>
            </FlexContainer>
            <FlexContainer newStyle={styles.iconsContainer}>
              {row?.onDelete && (
                <Pressable style={{ padding: 10 }} onPress={onDelete}>
                  <Delete03IconSharp />
                </Pressable>
              )}
              <Image
                style={{
                  width: responsiveFontSize(40),
                  height: responsiveFontSize(40),
                }}
                source={iconsNative.cardTouch}
                tintColor={Title}
              />
              {row?.display_brand == 'visa' && (
                <Image
                  style={styles.iconsImage}
                  source={iconsNative.visa}
                  contentFit="contain"
                />
              )}
              {row?.display_brand == 'mastercard' && (
                <Image
                  style={styles.iconsImage}
                  source={iconsNative.masterCard}
                  contentFit="contain"
                />
              )}
              {row?.brand == 'amex' && (
                <Image style={styles.iconsImage} source={iconsNative.amex} />
              )}
            </FlexContainer>
          </FlexContainer>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerManin: {
    width: SIZES.width / 1.3,
    borderRadius: SIZES.gapSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    borderRadius: SIZES.gapSmall,
    borderWidth: SIZES.borderWidth / 2,
  },
  container: {
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapLarge,
    flexDirection: 'row',
    width: SIZES.width / 1.2,
    borderRadius: SIZES.gapSmall,
    height: SIZES.height / 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  brand: {
    ...FONTS.heading24,
  },
  checkbox: {
    borderRadius: 10,
  },
  iconsImage: {
    width: responsiveFontSize(60),
    height: responsiveFontSize(50),
  },
  iconsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.width / 1.2,
    height: SIZES.height / 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    padding: SIZES.gapLarge * 2,
  },
});

export default MiniCard;
