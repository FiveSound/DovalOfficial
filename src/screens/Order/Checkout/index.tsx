import React from 'react';
import { useCart } from '../../../context/CartContext';
import { verificateOrderService } from '../../../services/orders';
import { useAPI } from '../../../hooks';
import { Container, LoadingScreen } from '../../../components/custom';
import { ScrollView, useNavigation } from '../../../components/native';
import {
  AddressList,
  OrderList,
  PaymentMethodList,
  ResumeOrderList,
} from './components';
import i18next from '../../../Translate';

interface Props {
  route: {
    params: {
      locationID: string;
      paymentIntent: string;
    };
  };
}

const Checkout = ({ route }: Props) => {
  const { createNewOrder, submitting } = useCart();
  const { locationID, paymentIntent } = route.params;
  const navigation = useNavigation();

  const { data, isError, isLoading, isFetching, isRefetching } = useAPI({
    queryKey: ['screen-verificar-orders', paymentIntent, locationID],
    queryFn: verificateOrderService,
  });

  if (isLoading || isFetching || isRefetching) return <LoadingScreen />;

  if (data) {
    const { location, card, cart, available, details } = data;

    return (
      <Container
        label={i18next.t('Checkout')}
        showBack={true}
        showHeader={true}
        showFooter={true}
        labels={submitting ? i18next.t('Loading...') : i18next.t('Order Now')}
        onPressButtons={createNewOrder}
        loading={submitting}
        disabled={!available || submitting}
      >
        <ScrollView>
          <AddressList location={location} details={details} />
          <PaymentMethodList card={card} />
          <ResumeOrderList details={details} />
          <OrderList data={cart} />
        </ScrollView>
      </Container>
    );
  }
};

export default Checkout;
