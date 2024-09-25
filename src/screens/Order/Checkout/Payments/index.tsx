import { StyleSheet } from "react-native";
import { useNavigation, Text, ScrollView, View, Image } from "../../../../components/native";
import { useAPI, useTheme } from "../../../../hooks";
import { deletePaymentDetailsService, getPaymentDetailsService, setPreferredPaymentService } from "../../../../services/payments";
import { Buttons, Container, FlexContainer, LoadingScreen, MiniCard, Typography } from "../../../../components/custom";
import { iconsNative, Ilustrations } from "../../../../constants";
import { FONTS, SIZES } from "../../../../constants/theme";
import i18next from "../../../../Translate";
import SlideCard from "../../../../components/custom/Cards/PaymentCard";

type Props = {
  route: any;
};

const Payments = ({ route }: Props) => {
  const { paymentIntent } = route.params;
  const navigation = useNavigation();

  const { data, isError, isLoading, isFetching, isRefetching } = useAPI({
    queryKey: ["screen-details-payments", paymentIntent],
    queryFn: getPaymentDetailsService,
  });

  const onDelete = async (id: string) => {
    await deletePaymentDetailsService(id);
    navigation.navigate("Checkout", {
      locationID: null,
      paymentIntent: null,
    });
  };

  const onSelected = async (id: string) => {
    console.log('id', id);
    await setPreferredPaymentService(id, null);
    navigation.navigate("Checkout", {
      locationID: null,
      paymentIntent: id,
    });
  };

  const handleAdd = () => {
    navigation.navigate('AddCard')
  }

  if (isLoading || isFetching || isRefetching) return <LoadingScreen />;

  if (data) {
    const { list, selected, resume } = data;
    console.log('resume', list);


    return (
      <Container
        label={i18next.t('Payment methods')}
        showBack={true}
        showHeader={true}
        showFooter={resume?.length === 0 ? true : false}
        onPressButtons={handleAdd}
        labels={i18next.t('Add card')}
      >
        <FlexContainer newStyle={styles.container}>
          {list?.length === 0 && <>
            <Image source={Ilustrations.CharcoPet}
              style={styles.image} />
            <FlexContainer newStyle={styles.header}>
              <Typography
                variant='title'
                newStyle={styles.title}>{i18next.t('My payment methods')}</Typography>

              {list?.length === 0 && (
                <Typography
                  variant='SubDescription'
                  newStyle={styles.subtitle}>
                  {i18next.t('Add a payment method and order without worries')}
                </Typography>
              )}
            </FlexContainer>
          </>}

          <SlideCard
            row={resume}
            onSelected={onSelected}
          />

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
    height: SIZES.height / 3
  },
  title: {
    marginBottom: SIZES.gapMedium,
    ...FONTS.heading32
  },
  subtitle: {
    marginBottom: SIZES.gapMedium,
    ...FONTS.text16,
    textAlign: 'center'
  },
});

export default Payments;