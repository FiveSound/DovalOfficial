import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES } from '../../../../../constants/theme';
import { Rating, Typography } from '../../../../../components/custom';

interface OrderRiderInfoProps {
  rider?: string;
  riderOrders: number;
  riderPhone: string;
  riderScore?: number;
}

const OrderRiderInfo: React.FC<OrderRiderInfoProps> = ({
  rider,
  riderOrders,
  riderPhone,
  riderScore,
}) => {
  return (
    <View style={styles.box}>
      <View>
        <Typography variant='H4title'>Información del repartidor:</Typography>
        <Typography variant='subtitle'>{rider ? rider : 'No disponible'}</Typography>
        <Typography variant='subtitle'>{riderOrders} Ordenes completadas</Typography>
        <Typography variant='subtitle'>{riderPhone}</Typography>
      </View>
      <View>
        <Typography variant='H4title'>Clasificación del repartidor:</Typography>
        <Rating rating={riderScore} setRating={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: SIZES.gapLarge,
  }
});

export default OrderRiderInfo;