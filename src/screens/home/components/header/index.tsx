import React, { useCallback, useEffect } from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, useColorScheme } from 'react-native';
import { useTheme } from '../../../../hooks';
import { useCart } from '../../../../context/CartContext';
import { getDefaultLocationService } from '../../../../services/orders';
import {
  SafeAreaView,
  TouchableOpacity,
  useNavigation,
} from '../../../../components/native';
import {
  FlexContainer,
  Icons,
  IsLoading,
  Typography,
} from '../../../../components/custom';
import {
  ArrowDown,
  ArrowUp,
  Location09Icon,
  Notification03IconStroke,
  ShoppingBag01Icon,
} from '../../../../constants/IconsPro';
import i18next from '../../../../Translate';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import { useAppDispatch } from '../../../../redux';
import { openAddressModal } from '../../../../redux/slides/modalSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useQuery } from '@tanstack/react-query';

interface RootNavigation {
  MyLocations: undefined;
  Carrito: undefined;
}

interface Location {
  details: string;
}

const QUERY_KEY = 'getDefaultLocationService-Datas';
const Header = () => {
  const { color, bgInput, borderInput, backgroundMaingrey } = useTheme();
  const { cart } = useCart();
  const dispatch = useAppDispatch();
  const OpenModal = useSelector((state: RootState) => state.modal.open);
  const theme = useColorScheme();
  const {
    data: LocationDefault,
    isLoading,
    isError,
    refetch: refetchLocationData,
  } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getDefaultLocationService(),
  });

  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      refetchLocationData();
    }, [refetchLocationData]),
  );

  const handleModal = () => {
    dispatch(openAddressModal());
  };

  if (isError) {
    return (
      <SafeAreaView>
        <Typography variant="H4title">Ha ocurrido un error!</Typography>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <SafeAreaView style={[styles.container, {
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
    }]}>
      <Icons
        onPress={() => navigation.navigate('OrderStack')}
        appendIcons={
          <>
            {/* {cart?.list.length > 0 && (
              <FlexContainer newStyle={styles.cartBadge}>
                <Typography variant="H4title" style={styles.cartText}>
                  {cart.list.length}
                </Typography>
              </FlexContainer>
            )} */}

            <ShoppingBag01Icon
              width={SIZES.icons}
              height={SIZES.icons}
              color={color}
            />
          </>
        }
        styles={styles.icons}
      />
      <FlexContainer newStyle={styles.flexContainer}>
        <Typography variant="SubDescription" numberOfLines={1}>
          {i18next.t('Location')}: {LocationDefault?.tag}
        </Typography>
        <TouchableOpacity onPress={handleModal} style={styles.addressContainer}>
          <Location09Icon
            width={SIZES.icons / 1.2}
            height={SIZES.icons / 1.2}
            color={COLORS.primary}
          />

          <Typography numberOfLines={1} variant="H4title">
            {LocationDefault?.details === null
              ? i18next.t('Add my location')
              : LocationDefault?.details}
          </Typography>
          {OpenModal ? (
            <ArrowUp width={SIZES.icons} height={SIZES.icons} color={color} />
          ) : (
            <ArrowDown width={SIZES.icons} height={SIZES.icons} color={color} />
          )}
        </TouchableOpacity>
      </FlexContainer>
      <Icons
        // onPress={() => navigation.navigate("OrderStack")}
        appendIcons={
          <Notification03IconStroke
            width={SIZES.icons}
            height={SIZES.icons}
            color={color}
          />
        }
        styles={styles.icons}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
  },
  flexContainer: {
    width: SIZES.width / 2,
    alignItems: 'center',
  },
  cartButton: {
    position: 'relative',
    width: responsiveFontSize(38),
    height: responsiveFontSize(38),
    padding: SIZES.gapMedium,
    borderRadius: SIZES.padding,
    borderWidth: SIZES.borderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    right: responsiveFontSize(-4),
    top: responsiveFontSize(-6),
    backgroundColor: COLORS.error,
    borderRadius: responsiveFontSize(8),
    width: responsiveFontSize(SIZES.icons),
    height: responsiveFontSize(SIZES.icons),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    color: COLORS.dark,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapSmall,
  },
  icons: {
    width: responsiveFontSize(44),
    height: responsiveFontSize(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
});
export default Header;
