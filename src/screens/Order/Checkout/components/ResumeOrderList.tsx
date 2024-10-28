import { View, Text, StyleSheet } from 'react-native';
import {
  Box,
  FlexContainer,
  LineDivider,
  Typography,
} from '../../../../components/custom';
import { SIZES } from '../../../../constants/theme';
import { formatPrice } from '../../../../utils/format';
import i18next from '../../../../Translate';

type Props = {
  details: {
    duration: string;
    delivery: number;
    service: number;
    products: number;
    discount: number;
    total: number;
  };
};

const ResumeOrderList = ({ details }: Props) => {
  const { duration, delivery, service, products, discount, total } = details;
  const productCost = total - delivery - service;

  return (
    <Box title={i18next.t('Resume Order list')}>
      <TypographyOrders
        label={i18next.t('Estimated Time')}
        sublabel={duration}
      />
      <TypographyOrders label={i18next.t('Service')} sublabel={service} />
      <TypographyOrders label={i18next.t('Delivery')} sublabel={delivery} />
      <TypographyOrders label={i18next.t('Products')} sublabel={products} />
      <TypographyOrders label={i18next.t('Discount')} sublabel={discount} />
      <LineDivider />
      <TypographyOrders label={i18next.t('Total')} sublabel={total} />
    </Box>
  );
};

const TypographyOrders = (props: {
  label: string;
  sublabel: string | number;
  current?: boolean;
}) => {
  const { label, sublabel, current = true } = props;
  return (
    <FlexContainer variant="row" newStyle={styles.container}>
      <Typography variant="H4title">{label}</Typography>
      <Typography variant="H4title">{sublabel}</Typography>
    </FlexContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapMedium,
    width: 'auto',
    justifyContent: 'space-between',
  },
});

export default ResumeOrderList;
