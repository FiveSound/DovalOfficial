import { useEffect, useState } from 'react';
import {
  BillingDetails,
  CardField,
  StripeProvider,
  confirmPayment,
} from '@stripe/stripe-react-native';
import { StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../../../context/AuthContext';
import { useNavigation, View } from '../../../../../components/native';
import { useAPI, useTheme } from '../../../../../hooks';
import {
  getPaymentDetailsService,
  savePaymentDetailsService,
} from '../../../../../services/payments';
import { API_URL } from '../../../../../services';
import {
  Container,
  FlexContainer,
  InputLabel,
  Perks,
} from '../../../../../components/custom';
import i18next from '../../../../../Translate';
import PaymentCard from '../../../../../components/custom/Cards/PaymentCard';
import { FONTS, SIZES } from '../../../../../constants/theme';
import Front from '../../../../../components/custom/Cards/PaymentCard/Front';

type CardDetails = {
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  complete: boolean;
  brand: string;
  validExpiryDate: string;
  validNumber: string;
  validCVC: string;
};

const AddCard = () => {
  const [load, setLoad] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);
  const [name, setName] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const { user } = useAuth();
  const { BackSecundary, backgroundMaingrey, borderInput, Title, Description } =
    useTheme();
  const navigation = useNavigation();

  const { data } = useAPI({
    queryKey: ['screen-details-add-card'],
    queryFn: getPaymentDetailsService,
  });

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const response = await fetch(
        `${API_URL}/api/payments-methods/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            name: name,
            email: user?.email,
            phone: user?.phone,
            customerID:
              data.list.length > 0 ? data.list[0].customer : undefined,
          }),
        },
      );
      const { clientSecret } = await response.json();

      return clientSecret;
    } catch (error) {
      console.log({ error });
      return null;
    }
  };

  const handlePayPress = async () => {
    console.log('Pay button pressed');
    if (!cardDetails) {
      console.log('No card details available');
      Alert.alert('Error', 'No card details available');
      return;
    }

    setLoad(true);
    console.log('Loading set to true');

    let billingDetails: BillingDetails = {
      email: user?.email ? user.email : '',
    };

    const clientSecret = await fetchPaymentIntentClientSecret();
    if (!clientSecret) {
      console.log('Failed to retrieve client secret');
      setLoad(false);
      Alert.alert('Error', 'Failed to retrieve client secret');
      return;
    }

    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
      Alert.alert('Error', error.localizedMessage || error.message);
      setLoad(false);
    } else if (paymentIntent) {
      console.log('Payment confirmed', paymentIntent);
      const response = await savePaymentDetailsService(paymentIntent);
      setLoad(false);
      setSuccess(true);
      console.log('Loading set to false');
      if (response.default) {
        console.log('Payment details saved successfully');
        setSuccess(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    }
  };

  const getStatusMessage = (details: CardDetails) => {
    if (details.validNumber !== 'Valid') {
      return 'Card number is incomplete';
    }
    if (details.validExpiryDate !== 'Valid') {
      return 'Expiry date is incomplete';
    }
    if (details.validCVC !== 'Valid') {
      return 'CVC is incomplete';
    }
    return 'Card details are complete';
  };

  useEffect(() => {}, [name]);
  return (
    <StripeProvider
      publishableKey="pk_live_51OxFh5KZ8Lh3NUtkRts0GSJq52voi8jM6tgKtjuGN511oIZj5FZi7flBUXmWD9a0c4QikGwPufuVpbMZxpriA0hU00sWUo684u"
      urlScheme="com.doval.doval"
      merchantIdentifier="merchant.66SP9GJC6S"
    >
      <Container
        label={i18next.t('Add card')}
        showFooter
        showHeader={true}
        labels={load ? i18next.t('Loading...') : i18next.t('Add card')}
        disabled={!cardDetails?.complete}
        loading={load}
        onPressButtons={handlePayPress}
        style={styles.container}
        useSafeArea={true}
      >
        <FlexContainer newStyle={styles.container}>
          <Front
            namecard={name}
            brand={cardDetails?.brand ? cardDetails.brand : 'MasterCard'}
            last4={cardDetails?.last4 ? cardDetails.last4 : '4242'}
            expiryMonth={cardDetails?.expiryMonth ? cardDetails.expiryMonth : 5}
            expiryYear={cardDetails?.expiryYear ? cardDetails.expiryYear : 34}
            // validCVC={cardDetails?.validCVC ? cardDetails.validCVC : "Invalid"}
          />
          <InputLabel
            label={i18next.t('Name on card')}
            placeholder={i18next.t('Enter your name')}
            value={name}
            onChangeText={text => setName(text)}
          />
          <View style={styles.separator} />
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
              expiration: 'MM/YY',
              cvc: 'CVC',
            }}
            cardStyle={{
              textColor: Title,
              placeholderColor: Description,
              borderRadius: SIZES.gapMedium,
              backgroundColor: borderInput,
              cursorColor: 'red',
              ...FONTS.semi16,
            }}
            style={{
              width: SIZES.BtnWidth,
              height: SIZES.BtnHeight,
              marginBottom: SIZES.gapMedium,
            }}
            onCardChange={details => {
              console.log('Card details changed', details);
              setCardDetails(details);
              setStatusMessage(getStatusMessage(details));
            }}
          />
          <FlexContainer newStyle={styles.containerMessage}>
            {success && (
              <Perks
                label={i18next.t('Card added successfully')}
                status="success"
              />
            )}
          </FlexContainer>
        </FlexContainer>
      </Container>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: SIZES.gapLarge,
  },
  containerMessage: {
    paddingHorizontal: SIZES.gapLarge,
    width: '100%',
  },
  separator: {
    width: '100%',
    marginVertical: SIZES.gapMedium,
  },
  statusMessage: {
    marginVertical: SIZES.gapMedium,
  },
});
export default AddCard;
