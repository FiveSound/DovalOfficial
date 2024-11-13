import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { getAvailableCouponsService } from "../../../../services/orders";
import { Container, FlexContainer, Hero, LoadingScreen, Typography } from "../../../../components/custom";
import i18next from "../../../../Translate";
import { COLORS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import { useTheme } from "../../../../hooks";


const Coupons = memo(() => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { Title, backgroundMaingrey } = useTheme();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["coupons"],
    queryFn: getAvailableCouponsService,
  });

  const handleApply = async (id: number) => {
    navigation.navigate('OrderStack', { screen: 'Cart', params: { ...route.params, couponID: id } });
  };

  if (isLoading || isFetching) return <LoadingScreen label={i18next.t('Loading...')} />;

  if (data) {
    return (
      <Container
        style={styles.container}
        showHeader={true}
        showTwoIconsLabel={true}
        label={i18next.t('My Coupons')}
      >
        <Hero
          label={i18next.t('My Coupons')}
          sublabel={i18next.t('Available coupons')}
        />
        <ScrollView>
          {data.list.map(item => (
            <FlexContainer key={item.code} newStyle={[styles.coupon, {
              backgroundColor: backgroundMaingrey
            }]}>
              <Typography variant='title'>{item.title}</Typography>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                <Typography variant='H4title'>{i18next.t('Code:')}</Typography>
                <View>
                  <Typography variant='H4title'>{item.code}</Typography>
                  <Typography variant='H4title'>{item.discount}</Typography>
                </View>
              </View>

              <View style={styles.flex}>
                <TouchableOpacity>
                  <Typography variant='H4title' newStyle={{  textDecorationLine: "underline" }}>{i18next.t('Terms and conditions')}</Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleApply(item.id)}
                  style={[styles.button, { opacity: item.redeemed ? 0.5 : 1 }]}
                  disabled={item.redeemed}
                >
                  <Text style={styles.textButton}>{i18next.t('Use coupon')}</Text>
                </TouchableOpacity>
              </View>
            </FlexContainer>
          ))}
        </ScrollView>
      </Container>
    );
  }

  return null; // Handle the case where data is undefined or null
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
    
  },
  coupon: {
    marginBottom: SIZES.gapLarge,
    padding: SIZES.gapLarge,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.gapLarge,
  },
  codeCoupon: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  discount: {
    color: "#DDD",
    fontSize: 13,
    fontWeight: "bold",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.success20,
    paddingHorizontal: SIZES.gapLarge,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.gapSmall
  },
  textButton: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Coupons;