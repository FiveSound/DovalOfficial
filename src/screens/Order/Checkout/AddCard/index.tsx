import { useState } from "react";
import {
  BillingDetails,
  CardField,
  CardFieldInput,
  StripeProvider,
  confirmPayment,
} from "@stripe/stripe-react-native";
import { StyleSheet, Text } from "react-native";
import { useAuth } from "../../../../context/AuthContext";
import { useAPI, useTheme } from "../../../../hooks";
import { getPaymentDetailsService, savePaymentDetailsService } from "../../../../services/payments";
import { API_URL } from "../../../../services";
import { ScrollView, useNavigation, View } from "../../../../components/native";
import { Buttons, Container, FlexContainer, InputLabel, Perks, Typography } from "../../../../components/custom";
import PaymentCard from "../../../../components/custom/Cards/PaymentCard/MiniCard";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import i18next from "../../../../Translate";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CardDetails = {
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  complete: boolean;
  brand?: string;
  validExpiryDate?: string;
  validNumber?: string;
  validCVC?: string;
};

const AddCard = () => {
  const [load, setLoad] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details>({
    complete: false,
  });
  const [name, setName] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const { user } = useAuth();
  const { BackSecundary, backgroundMaingrey, borderInput, Title, Description } = useTheme();
  const navigation = useNavigation();


  const { data } = useAPI({
    queryKey: ["screen-details-add-card"],
    queryFn: getPaymentDetailsService,
  });

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");

      const response = await fetch(
        `${API_URL}/api/payments-methods/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          },
          body: JSON.stringify({
            name: name,
            email: user?.email,
            phone: user?.phone,
            customerID:
              data.list.length > 0 ? data.list[0].customer : undefined,
          }),
        }
      );
      const { clientSecret } = await response.json();

      return clientSecret;
    } catch (error) {
      console.log({ error });
      return null;
    }
  };

  const handlePayPress = async () => {
    console.log("Pay button pressed");
    if (!cardDetails) {
      console.log("No card details available");
      alert("No card details available");
      return;
    }

    setLoad(true);
    console.log("Loading set to true");

    let billingDetails: BillingDetails = {
      email: user?.email ? user.email : "",
    };

    const clientSecret = await fetchPaymentIntentClientSecret();
    if (!clientSecret) {
      console.log("Failed to retrieve client secret");
      setLoad(false);
      return;
    }

    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      console.log("Payment confirmed", paymentIntent);
      const response = await savePaymentDetailsService(paymentIntent);
      setLoad(false);
      console.log("Loading set to false");

      if (response.default) {
        console.log("Payment details saved successfully");
        setSuccess(true);
        setTimeout(() => {
          navigation.navigate('Payments', {
            locationID: null,
            paymentIntent: paymentIntent,
          });
        }, 500);
      }
    }
  };

  const getStatusMessage = (details: CardDetails) => {
    if (details.validNumber !== "Valid") {
      return "Card number is incomplete";
    }
    if (details.validExpiryDate !== "Valid") {
      return "Expiry date is incomplete";
    }
    if (details.validCVC !== "Valid") {
      return "CVC is incomplete";
    }
    return "Card details are complete";
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51OxFh5KZ8Lh3NUtkabmS1zNq20p2QuhX8c5OlMT0r7mbfI0BmCnzAN0Aeh8MJRuGlyObIAUPYQk7QMbErJglMQhN00pmLHmjfp"
      urlScheme="com.doval.doval"
      merchantIdentifier="merchant.66SP9GJC6S"
    >
      <Container
        label={i18next.t('Adding card')}
        style={{
          alignItems: 'center',
          flex: 1
        }}
        showFooter
        showHeader={true}
        labels={load ? i18next.t('Loading...') : i18next.t('Add card')}
        disabled={!cardDetails?.complete}
        loading={load}
        onPressButtons={handlePayPress}
      >
        <FlexContainer newStyle={styles.container}>
          <PaymentCard
            brand={cardDetails.brand || "MasterCard"}
            last4={cardDetails.last4 || "4242"}
            expiryMonth={cardDetails.expiryMonth || 5}
            expiryYear={cardDetails.expiryYear || 34}
            validCVC={cardDetails.validCVC || "Invalid"}
          />
          <InputLabel
            label={i18next.t("Name on card")}
            placeholder={i18next.t("Enter your name")}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <View style={styles.separator} />
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: "4242 4242 4242 4242",
              expiration: "MM/YY",
              cvc: "CVC",
            }}
            cardStyle={{
              textColor: Title,
              placeholderColor: Description,
              borderRadius: SIZES.gapMedium,
              backgroundColor: borderInput,
              cursorColor: 'red',
              ...FONTS.semi16
            }}
            style={{
              width: SIZES.BtnWidth,
              height: SIZES.BtnHeight,
              marginBottom: SIZES.gapMedium,
            }}
            onCardChange={(details) => {
              console.log("Card details changed", details);
              setCardDetails(details);
              setStatusMessage(getStatusMessage(details))
            }}
          />
          <FlexContainer newStyle={styles.containerMessage}>
            {success && <Perks label={i18next.t("Card added successfully")} status="success" />}
          </FlexContainer>
        </FlexContainer>
      </Container>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  containerMessage: {
    paddingHorizontal: SIZES.gapLarge,
    width: '100%'
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