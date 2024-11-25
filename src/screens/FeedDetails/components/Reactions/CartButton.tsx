import { memo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ShoppingBagAddIcon, ShoppingBasket03Icon, ShoppingBasketAdd03Icon, ShoppingCartCheckIn01Icon } from '../../../../constants/IconsPro';
import i18next from '../../../../Translate';
import { useCart } from '../../../../context/CartContext';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import styles from './styles';
import { FlexContainer, Typography } from '../../../../components/custom';
import { useNavigation } from '../../../../components/native';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { setRecipeID } from '../../../../redux/slides/navigations';
import { RootState } from '../../../../redux/store';
import { openSignupModal } from '../../../../redux/slides/modalSlice';
import { useTheme } from '@/src/hooks';


const CartButton = memo(() => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { Title } = useTheme()

  const handleProduct = () => {
    if (isAuthenticated) {
      navigation.navigate('AddProducts');
      dispatch(setRecipeID(CurrentFeed.recipeID));
    } else {
      dispatch(openSignupModal());
    }
  };

  if (!CurrentFeed.recipeID || !CurrentFeed.ordenable) return null;

  return (
    <TouchableOpacity style={styles.containerAll} onPress={handleProduct}>
      <TouchableOpacity
        style={styles.container}
        onPress={handleProduct}
      >
        <ShoppingCartCheckIn01Icon
          width={SIZES.icons}
          height={SIZES.icons}
          color={COLORS.dark}
        />
      </TouchableOpacity>
      <Typography variant="H4title" newStyle={styless.typographyAdd}>
          {' '}
          {i18next.t('Add')}
        </Typography>
    </TouchableOpacity>
  );
});

const styless = StyleSheet.create({
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.gapLarge * 3,
    paddingVertical: SIZES.gapSmall,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapMedium,
    justifyContent: 'space-between',
    borderRadius: SIZES.radius,
  },
  typographyAdd: {
    ...FONTS.semi14,
  },
})
export default CartButton;
