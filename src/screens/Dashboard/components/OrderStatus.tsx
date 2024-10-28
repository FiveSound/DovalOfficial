import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { OrderStatusType } from '../../../types/Restaurant.type';

const OrderStatus = ({ status }: { status: OrderStatusType }) => (
  <Text style={[styles.status, styles[status]]}>
    {status == 'PENDING' && 'Pendiente'}
    {status == 'IN_PROGRESS' && 'En progreso'}
    {status == 'DELIVERED' && 'Repartiendo'}
    {status == 'COMPLETED' && 'Completado'}
    {status == 'CANCELED' && 'Cancelado'}
  </Text>
);

export default memo(OrderStatus);

const styles = StyleSheet.create({
  status: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 0,
    fontWeight: 'bold',
  },
  PENDING: { backgroundColor: 'rgba(255, 151, 0, 0.38)', color: '#FF9700' },
  IN_PROGRESS: {
    backgroundColor: 'rgba(255, 194, 37, 0.38)',
    color: '#FFC225',
  },
  DELIVERED: { backgroundColor: 'rgba(74, 222, 128, 0.38)', color: '#4ADE80' },
  COMPLETED: { backgroundColor: 'rgba(74, 222, 128, 0.38)', color: '#4ADE80' },
  CANCELED: { backgroundColor: 'rgba(244, 31, 82, 0.38)', color: '#F41F52' },
});
