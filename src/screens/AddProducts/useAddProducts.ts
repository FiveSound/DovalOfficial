import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from '@tanstack/react-query';
import {
  addToCartService,
  getRecipeVariantsService,
  getTotalVariantsService,
} from '../../services/cart';
import { useRefreshData } from '../../hooks';
import i18next from '../../Translate';
import { useNavigation } from '../../components/native';

type TypeVariant = {
  id: number;
  recipeID: number;
  title: string;
  limit_qty: number;
  required: boolean;
};

type TypeSubVariant = {
  id: number;
  variantID: number;
  name: string;
  price: string;
};

const QueryKey = 'total-variants';
const QueryKeyData = 'data-variants';

export const useAddProducts = () => {
  const navigation = useNavigation();
  const { isAuthenticated, isLoadingApp } = useSelector(
    (state: RootState) => state.auth,
  );
  const [load, setLoad] = useState(false);
  const [qty, setQty] = useState(1);
  const [required, setRequired] = useState<null | number>(null);
  const [subVariants, setSubVariants] = useState<number[]>([]);
  const [limites, setLimites] = useState<{ [key: number]: boolean }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { recipeID } = useSelector((state: RootState) => state.navigation);

  const total = useQuery({
    queryKey: [QueryKey, recipeID, JSON.stringify(subVariants), qty],
    queryFn: getTotalVariantsService,
    enabled: !!recipeID,
  });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [QueryKeyData, recipeID],
    queryFn: getRecipeVariantsService,
    enabled: !!recipeID,
  });

  const { isRefreshing, onRefresh } = useRefreshData([refetch]);

  const resetState = useCallback(() => {
    setLoad(false);
    setQty(1);
    setRequired(null);
    setSubVariants([]);
    setLimites({});
    setIsFormValid(false);
  }, []);

  const handlePress = useCallback(
    (id: number, variantID: number) => {
      setSubVariants(prevSubVariants => {
        const isIdPresent = prevSubVariants.includes(id);
        const variantSubVariants =
          data?.subvariants.filter(
            (sub: TypeSubVariant) => sub.variantID === variantID,
          ) || [];
        const selectedVariantSubVariants = prevSubVariants.filter(subId =>
          variantSubVariants
            .map((sub: TypeSubVariant) => sub.id)
            .includes(subId),
        );
        const limitQty =
          data?.variants.find(
            (variant: TypeVariant) => variant.id === variantID,
          )?.limit_qty || 0;
        const limitReached = selectedVariantSubVariants.length >= limitQty;

        setLimites(prevLimites => ({
          ...prevLimites,
          [variantID]: limitReached,
        }));

        if (!isIdPresent && limitReached) {
          console.warn(`Limit reached for variant ID: ${variantID}`);
          Alert.alert(
            i18next.t('Limit reached'),
            i18next.t('You cannot select more variants for this option.'),
          );
          setLoad(false);
          return prevSubVariants;
        }

        const newSubVariants = isIdPresent
          ? prevSubVariants.filter(subId => subId !== id)
          : [...prevSubVariants, id];

        const newSelectedVariantSubVariants = newSubVariants.filter(subId =>
          variantSubVariants
            .map((sub: TypeSubVariant) => sub.id)
            .includes(subId),
        );
        const newLimitReached =
          newSelectedVariantSubVariants.length >= limitQty;

        setLimites(prevLimites => ({
          ...prevLimites,
          [variantID]: newLimitReached,
        }));

        return newSubVariants;
      });
      setLoad(true);
    },
    [data],
  );

  useEffect(() => {
    if (total) {
      setLoad(false);
    }
  }, [total]);

  useEffect(() => {
    if (!data) {
      setIsFormValid(false);
      return;
    }

    const requiredVariants = data.variants.filter(
      (variant: TypeVariant) => variant.required,
    );

    const allRequiredSelected = requiredVariants.every(
      (variant: TypeVariant) => {
        const selected = subVariants.filter(subId => {
          const sub = data.subvariants.find(
            (s: TypeSubVariant) => s.id === subId,
          );
          return sub?.variantID === variant.id;
        });
        return selected.length >= variant.limit_qty;
      },
    );

    setIsFormValid(allRequiredSelected);
  }, [data, subVariants]);

  const handleSubmit = useCallback(async () => {
    setLoad(true);
    if (!data) return;

    let success = false;

    for (const element of data.variants.filter(
      (row: TypeVariant) => row.required,
    )) {
      const limit = element.limit_qty;
      const id = element.id;

      const comparison = data.subvariants
        .filter((row: TypeSubVariant) => row.variantID === id)
        .map((row: TypeSubVariant) => row.id);

      const selecteds = subVariants.filter(row => comparison.includes(row));

      if (selecteds.length !== limit) {
        console.warn(
          `Variant ID ${id} requires exactly ${limit} selections, but got ${selecteds.length}.`,
        );
        setRequired(id);
        Alert.alert(
          i18next.t('You are missing some variants'),
          `${i18next.t('Select exactly')} ${limit} ${i18next.t('variants')}`,
        );
        return;
      }

      success = true;
    }

    if (success && recipeID) {
      setLoad(false);
      try {
        const response = await addToCartService(recipeID, subVariants, qty);
        if (response.success) {
          console.log('Product successfully added to cart:', response);
          Alert.alert(
            i18next.t('Added to cart!'),
            i18next.t('You have added a new product to your cart!'),
            [
              {
                text: i18next.t('Go back'),
                onPress: () => navigation.goBack(),
                style: 'cancel',
              },
              {
                text: i18next.t('Add more variants'),
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: i18next.t('Go to cart'),
                onPress: () => navigation.navigate('OrderStack'),
              },
            ],
            { cancelable: false },
          );
          resetState();
        } else {
          console.error('Failed to add product to cart:', response);
          Alert.alert(i18next.t('Error'), i18next.t('Failed to add to cart.'));
          setLoad(false);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        Alert.alert(
          i18next.t('Error'),
          i18next.t('There was a problem adding the product to the cart.'),
        );
        setLoad(false);
      } finally {
        setLoad(false);
      }
    }
  }, [data, recipeID, subVariants, qty, resetState, navigation]);

  const handleQuantityChange = useCallback((newQty: number) => {
    if (newQty < 1) {
      console.warn(`Attempted to set invalid quantity: ${newQty}`);
      return;
    }
    setQty(newQty);
  }, []);

  return {
    isAuthenticated,
    isLoadingApp,
    data,
    isLoading,
    isFetching,
    load,
    isFormValid,
    total,
    qty,
    handleQuantityChange,
    handleSubmit,
    handleOptionPress: handlePress,
    isRefreshing,
    onRefresh,
    limites,
    subVariants,
  };
};
