import React, { memo, useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  useNavigation,
} from '../../../components/native';
import {
  Accordion,
  Container,
  LoadingScreen,
  ScreenEmpty,
  SignupAlert,
} from '../../../components/custom';
import { SIZES } from '../../../constants/theme';
import { Ilustrations } from '../../../constants';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useQuery } from '@tanstack/react-query';
import { getCartService } from '../../../services/cart';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch } from '../../../redux';
import { setCartID } from '../../../redux/slides/navigations';
const QUERY_KEY = ["cart-screen-useQuerys"];

type CartItemType = {
  cartItemID: number;
  recipeID: number;
  recipe: string;
  price: string;
  total: string;
  cover: string;
  quantity: number;
  businessID: string;
  variants: null | string;
  business_name: string;
};


const Cart = memo(() => {
  const route = useRoute();
  const navigation = useNavigation();
  const { data, isLoading, isFetching, refetch , isError} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCartService,
  });

  const [refreshing, setRefreshing] = useState(false);
  const { isLoadingApp, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useAppDispatch();
  const [cartID, setCartIDLocal] = useState<null | number>(null);
  const [selectedPrice, setSelectedPrice] = useState<string>('0');
  console.log(data);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleBusiness = () => {
    navigation.navigate('SearchBusiness');
  };

  const handleNavigate = () => {
    navigation.navigate('Checkout', 
      { cartID, ...route.params }
    );
    dispatch(setCartID(cartID))
   
  };


  useEffect(() => {
    const fetchData = async () => {
      if (
        data.list.length === 0 &&
        !isLoading &&
        !isLoadingApp &&
        isAuthenticated
      ) {
        await refetch();
      }
    };
    fetchData();
  }, [data, isLoading, isLoadingApp, isAuthenticated]);

  useEffect(() => {
    if (cartID !== null) {
      const selectedItem = data?.flat().find((item: CartItemType) => item.cartID === cartID);
      if (selectedItem) {
        setSelectedPrice(selectedItem.total);
      }
    } else {
      setSelectedPrice('0');
    }
  }, [cartID, data]);

  if (!isAuthenticated) return <Container showBack={true} showHeader={true} label={i18next.t('Cart')}>
    <SignupAlert />
  </Container>;

  if (isLoading || isFetching) return <LoadingScreen />;

  if (isError) return <ScreenEmpty source={Ilustrations.CharcoPet} labelPart1={i18next.t('Oops! Error getting cart')} />;

  if (data?.length === 0 && isAuthenticated) {
    return (
      <Container showBack={true} showHeader={true} label={i18next.t('Cart')}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ScreenEmpty
            source={Ilustrations.CharcoPet}
            labelPart1={i18next.t('Oops! Your cart is empty 🍽️')}
            ImgWidth={SIZES.width}
            ImgHeigth={SIZES.height / 2}
            labelButton={i18next.t('View restaurants')}
            onPress={handleBusiness}
          />
        </ScrollView>
      </Container>
    );
  }

  if (data?.length > 0 && isAuthenticated) {
    return (
      <Container
        showBack={true}
        showHeader={true}
        label={i18next.t('Cart')}
        showFooter={true}
        onPressButtons={handleNavigate}
        labels={i18next.t('Checkout')}
        TotalPrice={selectedPrice || '0'}
        showAdd={false}
        disabled={!cartID}
        variant={!cartID ? "disabled" : "primary"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {data.map((row: any) => (
            <Accordion 
            key={row.businessID + row.cartID + row.recipeID} 
            row={row} refetch={refetch} 
            value={cartID === row.cartID}
            onValueChange={(checked: boolean) => setCartIDLocal(checked ? row[0].cartID : null)}
            />
          ))}
        </ScrollView>
      </Container>
    );
  }

  return null;
});

export default Cart;
