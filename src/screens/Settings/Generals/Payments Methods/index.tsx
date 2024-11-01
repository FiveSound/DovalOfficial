import { StyleSheet } from 'react-native';
import {
  useNavigation,
  Image,
} from '../../../../components/native';
import {  useTheme } from '../../../../hooks';
import {
  deletePaymentDetailsService,
  getPaymentDetailsService,
  setPreferredPaymentService,
} from '../../../../services/payments';
import {
  Buttons,
  Container,
  FlexContainer,
  LoadingScreen,
  MiniCard,
  Typography,
} from '../../../../components/custom';
import { iconsNative, Ilustrations } from '../../../../constants';
import { FONTS, SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';
import SlideCard from '../../../../components/custom/Cards/PaymentCard';
import { AddPayment } from './components';
import { useQueries, useQuery } from '@tanstack/react-query';

type Props = {};

const PaymentsGeneral = (props: Props) => {
  const navigation = useNavigation();
  const { BackSecundary } = useTheme();

  const { data, isError, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ['screen-details-payments-settings-useQuery'],
    queryFn: getPaymentDetailsService,
  });

  const onDelete = async (id: string) => {
    await deletePaymentDetailsService(id);
    navigation.navigate('Checkout', {
      locationID: null,
      paymentIntent: null,
    });
  };

  const onSelected = async (id: string) => {
    await setPreferredPaymentService(id, null);
    navigation.navigate('PaymentsGeneral', {
      locationID: null,
      paymentIntent: id,
    });
  };

  const handleAdd = () => {
    navigation.navigate('AddCardGeneral');
  };

  if (isLoading || isFetching || isRefetching) return <LoadingScreen />;

  if (data) {
    const { list, selected, resume } = data;
    resume.push({
      id: 'AddCardGeneral',
      brand: 'AddCardGeneral',
      checks: {},
      country: '',
      display_brand: 'Add Card',
      exp_month: null,
      exp_year: null,
      fingerprint: '',
      funding: '',
      generated_from: null,
      last4: '',
      networks: { available: [], preferred: null },
      three_d_secure_usage: { supported: false },
      wallet: null,
    });

    return (
      <Container
        label={i18next.t('Payment methods')}
        showBack={true}
        showHeader={true}
        showFooter={resume.length === 0 ? true : false}
        onPressButtons={handleAdd}
        labels={i18next.t('Add card')}
      >
        <FlexContainer newStyle={styles.container}>
          {list?.length === 0 && (
            <>
              <Image placeholderSource={Ilustrations.CharcoPet} style={styles.image} server={false}/>
              <FlexContainer newStyle={styles.header}>
                <Typography variant="title" newStyle={styles.title}>
                  {i18next.t('My payment methods')}
                </Typography>

                {list?.length === 0 && (
                  <Typography
                    variant="SubDescription"
                    newStyle={styles.subtitle}
                  >
                    {i18next.t(
                      'Add a payment method and order without worries',
                    )}
                  </Typography>
                )}
              </FlexContainer>
            </>
          )}
          {list.length === 0 && <AddPayment />}
          {list.length > 0 && (
            <SlideCard row={resume} onSelected={onSelected} />
          )}
        </FlexContainer>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: SIZES.gapLarge,
    alignItems: 'center',
  },
  subcontainer: {
    marginVertical: SIZES.gapMedium,
  },
  image: {
    marginBottom: SIZES.gapMedium,
    width: SIZES.width / 1.4,
    height: SIZES.height / 3,
  },
  title: {
    marginBottom: SIZES.gapMedium,
    ...FONTS.heading32,
  },
  subtitle: {
    marginBottom: SIZES.gapMedium,
    ...FONTS.text16,
    textAlign: 'center',
  },
});

export default PaymentsGeneral;
