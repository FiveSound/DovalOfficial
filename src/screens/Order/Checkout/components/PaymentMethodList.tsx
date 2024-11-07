import { StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '../../../../components/native';
import {
  Box,
  ButtonAcces,
  FlexContainer,
  Icons,
  LineDivider,
  MiniCard,
  Typography,
} from '../../../../components/custom';
import { SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';

interface Props {
  card: {
    brand: string;
    last4: string;
  };
}

const PaymentMethodList = (props: Props) => {
  const navigation = useNavigation();
  const hat = '#### #### #### ####';
  const handleChange = () => {
    navigation.navigate('Payments', { paymentIntent: null });
  };

  return (
    <Box
      title={i18next.t('Payment Method')}
      variant={props.card ? true : false}
    >
      {props.card && (
        <Pressable
          onPress={() =>
            navigation.navigate('Payments', { paymentIntent: null })
          }
        ></Pressable>
      )}

      {true && (
        <FlexContainer newStyle={styles.container}>
          <FlexContainer newStyle={styles.header}>
            <Typography variant="H4title">
              {!props.card
                ? i18next.t('Select Payment Method')
                : `${hat} ${props.card.last4}`}
            </Typography>
            <Icons
              onPress={handleChange}
              styles={{
                borderRadius: SIZES.radius,
              }}
              appendIcons={
                <Typography variant="H4title">{i18next.t('Change')}</Typography>
              }
            />
          </FlexContainer>
          <LineDivider />
          {/* <ButtonAcces
            label={i18next.t('Add Coupons')}
            ShowLineDivider={false}
            onPress={() => navigation.navigate('Coupons')}
          /> */}
        </FlexContainer>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SIZES.gapMedium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PaymentMethodList;
