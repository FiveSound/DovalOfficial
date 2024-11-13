import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ShoppingBag01Icon } from '../../../../constants/IconsPro';
import {
  COLORS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';
import { Hint, IsLoading, Typography } from '../../../../components/custom';
import { useTheme } from '../../../../hooks';
import {
  TouchableOpacity,
  View,
  Text,
  useNavigation,
} from '../../../../components/native';
import * as Haptics from 'expo-haptics';
import { useCart } from '../../../../context/CartContext';
import i18next from '../../../../Translate';
type Props = {};

const Shoppings = (props: Props) => {
  const navigation = useNavigation();
  const { Title } = useTheme();
  const { cart, isLoading } = useCart();
  const [tuto, setTuto] = useState(false);


  const handleCart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate('OrderStack', {
      screen: 'Cart',
    });
    // navigation.navigate('Complete')
  };

  useEffect(() => {
  
  }, [cart]);

  if (isLoading) return <IsLoading />;

  return (
    <>
      <TouchableOpacity onPress={handleCart}>
        <ShoppingBag01Icon
          width={SIZES.icons * 1.1}
          height={SIZES.icons * 1.1}
          color={Title}
        />
        {cart?.length > 0 && (
          <View style={styles.badgeContainer}>
            <Typography newStyle={styles.badgeText} variant="H4title">
              {cart?.length || 0} 
            </Typography>
          </View>
        )}
      </TouchableOpacity>
      <Hint
        label={i18next.t('You have a product available, Check cart now!')}
        showLabel={true}
        position="right"
        orientation="top"
        ShowAlert={tuto}
        container={styles.containerHint}
        styleTriangule={styles.bordertriangue}
        labelstyle={styles.labelHint}
      />
    </>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: responsiveFontSize(-10),
    top: responsiveFontSize(-6),
    backgroundColor: COLORS.error,
    borderRadius: responsiveFontSize(8),
    width: responsiveFontSize(SIZES.icons / 1.2),
    height: responsiveFontSize(SIZES.icons / 1.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.dark,
    fontSize: responsiveFontSize(14),
  },
  containerHint: {
    backgroundColor: COLORS.TranspDark,
    position: 'absolute',
    top: responsiveFontSize(40),
  },
  bordertriangue: {
    borderBottomColor: COLORS.TranspDark,
  },
  labelHint: {
    width: responsiveFontSize(160),
  },
});

export default Shoppings;
