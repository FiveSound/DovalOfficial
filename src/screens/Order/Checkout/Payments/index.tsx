import { StyleSheet, Text } from "react-native";
import { useNavigation, Image } from "../../../../components/native";
import { getPaymentDetailsService, setPreferredPaymentService } from "../../../../services/payments";
import { Container, FlexContainer, LoadingScreen, Typography } from "../../../../components/custom";
import { Ilustrations } from "../../../../constants";
import { FONTS, SIZES } from "../../../../constants/theme";
import i18next from "../../../../Translate";
import SlideCard from "../../../../components/custom/Cards/PaymentCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  route: any;
};

const Payments = ({ route }: Props) => {
  const { paymentIntent } = route.params;
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["screen-details-payments-useQuery", paymentIntent],
    queryFn: getPaymentDetailsService,
  });

  const onSelected = async (id: string) => {
    const response = await setPreferredPaymentService(id, null);
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ["screen-checkout-orders-useQuery"] });
      navigation.navigate("Checkout");
    }
  };

  const handleAdd = () => {
    navigation.navigate("AddCard");
  };

  if (isLoading || isFetching || isRefetching) return <LoadingScreen />;

  if (isError) return <Text>An ocurred error!</Text>;

  if (data) {
    const { list, selected, resume } = data;

    return (
      <Container
        label={i18next.t("Payment methods")}
        showBack={true}
        showHeader={true}
        showFooter={resume?.length === 0 ? true : false}
        onPressButtons={handleAdd}
        labels={i18next.t("Add card")}
      >
        <FlexContainer newStyle={styles.container}>
          {list?.length === 0 && (
            <>
              <Image placeholderSource={Ilustrations.CharcoPet} style={styles.image} server={false} />
              <FlexContainer newStyle={styles.header}>
                <Typography variant="title" newStyle={styles.title}>
                  {i18next.t("My payment methods")}
                </Typography>

                {list?.length === 0 && (
                  <Typography variant="SubDescription" newStyle={styles.subtitle}>
                    {i18next.t("Add a payment method and order without worries")}
                  </Typography>
                )}
              </FlexContainer>
            </>
          )}
          <SlideCard row={resume} onSelected={onSelected} />
        </FlexContainer>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: SIZES.gapLarge,
    alignItems: "center",
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
    textAlign: "center",
  },
});

export default Payments;
