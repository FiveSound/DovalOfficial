import { memo, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ShoppingBagAddIcon } from '../../../../constants/IconsPro';
import i18next from '../../../../Translate';
import { useCart } from '../../../../context/CartContext';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import styles from './styles';
import { Typography } from '../../../../components/custom';
import { useNavigation } from '../../../../components/native';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { setRecipeID } from '../../../../redux/slides/navigations';
import { RootState } from '../../../../redux/store';


const CartButton = memo(() => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleProduct = () => {
    navigation.navigate('AddProducts');
    dispatch(setRecipeID(CurrentFeed.recipeID));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleProduct}
      disabled={load}
    >
      <ShoppingBagAddIcon
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={COLORS.TranspLight}
      />
      <Typography variant="H4title" newStyle={styles.label}>
        {i18next.t('Add')}
      </Typography>
    </TouchableOpacity>
  );
});

export default CartButton;
