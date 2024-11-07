import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import OrderStatus from '../../../components/OrderStatus';
import { Typography } from '../../../../../components/custom';
import { OrderStatusType } from '../../../../../types/Restaurant.type';
import { FONTS } from '../../../../../constants/theme';
// import OrderStatus from '../OrderStatus';

interface OrderHeaderProps {
  orderId: number;
  status: string;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ orderId, status }) => {
  return (
   <>
    <View style={[styles.group, styles.headerGroup]}>
      <Typography variant='H4title' newStyle={styles.orderLabel}>Order: #</Typography>
      <Typography variant='H4title' newStyle={styles.orderId}>{orderId}</Typography>
    </View>
        <OrderStatus status={status as OrderStatusType} />
    </>

  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerGroup: {
    justifyContent: 'flex-start',
  },
  orderLabel: {
    ...FONTS.semi18
  },
  orderId: {
    color: '#FF5500',
    ...FONTS.semi18
  },
});

export default OrderHeader;