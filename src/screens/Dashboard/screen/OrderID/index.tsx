import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
import { Container, LineDivider, LoadingScreen } from '../../../../components/custom';
import { getOrderIDService } from '../../../../services/business';
import { OrderCustomerInfo, OrderHeader, OrderItems, OrderPaymentInfo, OrderRiderInfo } from './components';
import OrderActions from './components/OrderActions';
import { ScrollView, View } from '../../../../components/native';
import { SIZES } from '../../../../constants/theme';


type Props = {
  route: any;
};

const OrderID: React.FC<Props> = (props: Props) => {
  const order = useQuery({
    queryKey: ['business-order-id'],
    queryFn: async () => getOrderIDService(props.route.params.orderID),
  });

  const handleAccept = () => {
    // Lógica para aceptar la orden
  };

  const handleReject = () => {
    // Lógica para rechazar la orden
  };

  if (order.isLoading || order.isFetching) return <LoadingScreen />;

  if (order.data) {
    const {
      id,
      status,
      items,
      client,
      clientEmail,
      clientPhone,
      clientDetailsLocation,
      rider,
      riderOrders,
      riderPhone,
      resume,
    } = order.data;

    return (
      <Container style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <OrderItems items={items} />
            <OrderHeader orderId={id} status={status} />
            <OrderActions onAccept={handleAccept} onReject={handleReject} />
            <LineDivider lineStyle={styles.lineDivider} variant='secondary' />
            <OrderPaymentInfo resume={resume} />
            <LineDivider lineStyle={styles.lineDivider} variant='secondary' />

            <OrderCustomerInfo
              client={client}
              clientEmail={clientEmail}
              clientPhone={clientPhone}
              clientDetailsLocation={clientDetailsLocation}
            />
            <LineDivider lineStyle={styles.lineDivider} variant='secondary' />

            <OrderRiderInfo
              rider={rider}
              riderOrders={riderOrders}
              riderPhone={riderPhone}
            // riderScore={order.data.riderScore} // Descomentar si existe
            />

            {/* <Text selectable>{JSON.stringify(order.data, null, 2)}</Text> */}
          </View>
        </ScrollView>
      </Container>
    );
  }

  return null;
};

export default OrderID;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
  },
  lineDivider: {
    width: SIZES.width,
    alignSelf: 'center',
  },
});
