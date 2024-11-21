import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES } from '../../../../../constants/theme';
import { Typography } from '../../../../../components/custom';

interface OrderCustomerInfoProps {
  client: string;
  clientEmail: string;
  clientPhone: string;
  clientDetailsLocation: string;
}

const OrderCustomerInfo: React.FC<OrderCustomerInfoProps> = ({
  client,
  clientEmail,
  clientPhone,
  clientDetailsLocation,
}) => {
  return (
    <View style={styles.box}>
      <View style={{ marginBottom: 15 }}>
        <Typography variant='H4title'>Información cliente:</Typography>
        <Typography variant='subtitle'>{client}</Typography>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Typography variant='H4title'>Información del contacto:</Typography>
        <Typography variant='subtitle'>{clientEmail}</Typography>
        <Typography variant='subtitle'>{clientPhone}</Typography>
      </View>

      <View>
        <Typography variant='H4title'>Dirección de envío:</Typography>
        <Typography variant='subtitle'>{clientDetailsLocation}</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: SIZES.gapLarge,
  },
  title: {

  },
  text: {

  },
});

export default OrderCustomerInfo;