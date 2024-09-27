import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ShoppingBag01Icon } from "../../../../../constants/IconsPro";
import {
  COLORS,
  responsiveFontSize,
  SIZES,
} from "../../../../../constants/theme";
import { Hint, IsLoading, Typography } from "../../../../../components/custom";
import { getTutorialStatus, setTutorialStatus } from "../../../../../hooks";
import { TouchableOpacity, View , Text, useNavigation} from "../../../../../components/native";
import * as Haptics from "expo-haptics";
import { useCart } from "../../../../../context/CartContext";
import i18next from "../../../../../Translate";
type Props = {
  cartItems: any[];
  isFocused: boolean;
};

const Shoppings = (props: Props) => {
  const navigation = useNavigation()
  const { cartItems, isFocused } = props;
  const {cart , isLoading } = useCart()
  const [tuto, setTuto] = useState(false);

  useEffect(() => {
    const checkShoppingTutorialStatus = async () => {
      const status = await getTutorialStatus('shopping');
      if (status !== 'shown' && cartItems?.length > 0 && isFocused) {
        setTuto(true);
        await setTutorialStatus('shopping', 'shown');
        const timer = setTimeout(() => {
          setTuto(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    };
    checkShoppingTutorialStatus();
  }, [isFocused, cartItems]);

  const handleCart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate('OrderStack', {
      screen: 'Cart'
    }) 
    // navigation.navigate('Complete') 
  }
  if(isLoading) return <IsLoading />
  
  return (
    <>
      <TouchableOpacity onPress={handleCart}>
        <ShoppingBag01Icon
          width={SIZES.icons * 1.1}
          height={SIZES.icons * 1.1}
          color={COLORS.light}
        />
        {cart?.list?.length > 0 && (
          <View style={styles.badgeContainer}>
            <Typography newStyle={styles.badgeText} variant='H4title'>
              {cart.list.length}
            </Typography>
          </View>
        )}
      </TouchableOpacity>
      <Hint 
        label={i18next.t('You have a product available, Check cart now!')}
        showLabel={true}
        position='right'
        orientation='top'
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
    position: "absolute",
    right: responsiveFontSize(-4),
    top: responsiveFontSize(-6),
    backgroundColor: COLORS.error,
    borderRadius: responsiveFontSize(8),
    width: responsiveFontSize(SIZES.icons),
    height: responsiveFontSize(SIZES.icons),
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: COLORS.dark,
    fontSize: responsiveFontSize(14),
  },
  containerHint: {
    backgroundColor: COLORS.TranspDark,
    position: 'absolute',
    top: responsiveFontSize(40)
  },
  bordertriangue: {
    borderBottomColor: COLORS.TranspDark
  },
  labelHint: {
    width: responsiveFontSize(160)
  }
});

export default Shoppings;