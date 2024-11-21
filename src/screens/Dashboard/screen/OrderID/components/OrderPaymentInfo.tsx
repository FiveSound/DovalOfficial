import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES } from '../../../../../constants/theme';
import { useTheme } from '../../../../../hooks';
import { Typography } from '../../../../../components/custom';

interface Resume {
  items_costs: string;
  variants: string;
  delivery_costs: string;
  service_costs: string;
  discount: number;
  total: string;
}

interface OrderPaymentInfoProps {
  resume: Resume;
}

const OrderPaymentInfo: React.FC<OrderPaymentInfoProps> = ({ resume }) => {
const { backgroundMaingrey } = useTheme()
  return (
    <View style={styles.box}>
      <Typography variant='title'>Información de pago:</Typography>
      <View style={[styles.group, styles.paymentRow]}>
        <Typography variant='H4title'>Items</Typography>
        <Typography variant='H4title'>{resume.items_costs}</Typography>
      </View>

      <View style={[styles.group, styles.paymentRow]}>
        <Typography variant='H4title'>Variants</Typography>
        <Typography variant='H4title'>{resume.variants}</Typography>
      </View>

      {/* <View style={[styles.group, styles.paymentRow]}>
        <Typography variant='H4title'>Delivery</Typography>
        <Typography variant='H4title'>{resume.delivery_costs}</Typography>
      </View> */}

      {/* <View style={[styles.group, styles.paymentRow]}>
        <Typography variant='H4title'>Service</Typography>
        <Typography variant='H4title'>{resume.service_costs}</Typography>
      </View> */}

      <View style={[styles.group, styles.paymentRow]}>
        <Typography variant='H4title'>Discount</Typography>
        <Typography variant='H4title'>{resume.discount}%</Typography>
      </View>

      <View style={[styles.group, styles.totalRow]}>
        <Typography variant='H4title'>Pagado por el cliente</Typography>
        <Typography variant='H4title'>{resume.total}</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: SIZES.gapLarge,
    borderRadius: SIZES.radius
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  paymentRow: {
    // Additional styling if needed
  },
  totalRow: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
  totalLabel: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OrderPaymentInfo;