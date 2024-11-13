import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { OrderStatusType } from '../../../types/Restaurant.type';
import { COLORS } from '../../../constants/theme';
import { Typography } from '../../../components/custom';
import i18next from '../../../Translate';

const OrderStatus = ({ status }: { status: OrderStatusType }) => (
  <Typography variant='H4title' newStyle={[styles.status, styles[status]]}>
    {status == 'PENDING' && i18next.t('Pending')}
    {status == 'IN_PROGRESS' && i18next.t('In progress')}
    {status == 'DELIVERED' && i18next.t('Delivering')}
    {status == 'COMPLETED' && i18next.t('Completed')}
    {status == 'CANCELED' && i18next.t('Canceled')}
  </Typography>
);

export default memo(OrderStatus);

const styles = StyleSheet.create({
  status: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  PENDING: { backgroundColor: 'rgba(255, 151, 0, 0.38)', color: '#FF9700' },
  IN_PROGRESS: {
    backgroundColor: 'rgba(255, 151, 0, 0.38)',
    color: COLORS.dark,
  },
  DELIVERED: { backgroundColor: 'rgba(74, 222, 128, 0.38)', color: COLORS.dark },
  COMPLETED: { backgroundColor: 'rgba(74, 222, 128, 0.38)', color: COLORS.dark },
  CANCELED: { backgroundColor: 'rgba(244, 31, 82, 0.38)', color: COLORS.error },
});
