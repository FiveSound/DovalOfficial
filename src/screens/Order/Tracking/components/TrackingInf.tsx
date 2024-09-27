import React, { memo, useEffect, useRef } from "react";
import { Alert, StyleSheet, Animated, Easing } from "react-native";
import { useTheme } from "../../../../hooks";
import { FONTS, SIZES } from "../../../../constants/theme";
import {
  GridViewIcon,
  Location09Icon,
  SafeDelivery01Icon,
  Store01IconStroke,
} from "../../../../constants/IconsPro";
import {
  Avatars,
  FlexContainer,
  InfoCard,
} from "../../../../components/custom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ScrollView } from "../../../../components/native";
import i18next from "../../../../Translate";
import { useQuery } from "@tanstack/react-query";
import { getRiderDetailsService } from "../../../../services/orders";
import { CLOUDFRONT } from "../../../../services";

type Props = {};
const TrackingInf = (props: Props) => {
  const { BackgroundMain, Title } = useTheme();
  const { data } = useSelector((state: RootState) => state.modal);
  const riderID = data?.riderID;
  const { data: row, isLoading } = useQuery({
    queryKey: ["get-rider-details-production", riderID],
    queryFn: getRiderDetailsService,
    enabled: riderID ? true : false,
  });

  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [translateYAnim]);

  if (data) {
    const {
      rider_waiting,
      riderID,
      locationDetails,
      business_name,
      products_length,
      total,
      verification_code
    } = data;

    if (verification_code !== null) {
      Alert.alert(
        i18next.t("Confirm order PIN"),
        i18next.t(`Confirm order PIN: ${verification_code}`),
        [{ text: "OK" }]
      );
    }

    return (
      <FlexContainer
        newStyle={[styles.container, { backgroundColor: BackgroundMain }]}
      >
        <ScrollView>
          <>
            {verification_code !== null && (
              <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
                <InfoCard
                  icon={<GridViewIcon color={Title} width={SIZES.icons * 1.2} height={SIZES.icons * 1.2}/>}
                  title={i18next.t('Confirm order PIN')}
                  description={i18next.t('Confirm your order to avoid fraud')}
                  showArrow={true}
                  showLineDivider={true}
                />
              </Animated.View>
            )}

            {riderID !== null && !isLoading && (
              <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
                <InfoCard
                  icon={<Avatars size="medium" source={`${CLOUDFRONT}${row.avatar}`}/>}
                  title={row.fullname || ''}
                  description={`${i18next.t("149 Orders")} || Vehicle: ${row.vehicle}` || ""}
                  showArrow={true}
                  showLineDivider={true}
                />
              </Animated.View>
            )}

            <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
              <InfoCard
                icon={
                  <Location09Icon
                    width={SIZES.icons * 1.2}
                    height={SIZES.icons * 1.2}
                    color={Title}
                  />
                }
                title={i18next.t('You receive it in')}
                description={locationDetails || ""}
                showArrow={true}
                showLineDivider={true}
              />
            </Animated.View>

            <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
              <InfoCard
                icon={
                  <Store01IconStroke
                    width={SIZES.icons * 1.2}
                    height={SIZES.icons * 1.2}
                    color={Title}
                  />
                }
                title={business_name || ''}
                description={`${products_length || 0} ${i18next.t("Products")} | $${total}` || '0 Products'}
                showArrow={true}
                showLineDivider={true}
              />
            </Animated.View>

            <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
              <InfoCard
                icon={
                  rider_waiting ? (
                    <Store01IconStroke
                      width={SIZES.icons * 1.2}
                      height={SIZES.icons * 1.2}
                      color={Title}
                    />
                  ) : (
                    <SafeDelivery01Icon
                      width={SIZES.icons * 1.2}
                      height={SIZES.icons * 1.2}
                      color={Title}
                    />
                  )
                }
                title={i18next.t('Delivery by')}
                description={rider_waiting && row ? row.fullname || '' : 'Doval Rider'}
                orientation="LEGHT"
                showArrow={true}
                showLineDivider={true}
              />
            </Animated.View>
          </>
        </ScrollView>
      </FlexContainer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    width: SIZES.width,
    gap: SIZES.gapMedium,
  },
  header: {
    ...FONTS.heading24,
    marginBottom: SIZES.gapMedium,
  },
});

export default memo(TrackingInf);