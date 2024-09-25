import React, { useState } from "react";
import DarkMode from "../../../hooks/DarkMode";
import useTheme from "../../../hooks/useTheme";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FavouriteIcon, FavouriteIconStroke, Location09Icon, Share08Icon, ShoppingBag01IconStroke, StarIcon } from "../../../constants/IconsPro";
import { FlexContainer, Typography } from "../../../components/custom";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

type Props = {
  business_name: string | undefined;
  Like: boolean | undefined;
  Rating: string | undefined;
  SuccessOrders: string | undefined;
  addressBusiness: string | undefined;
};

const ProfileBusiness = ({
  business_name,
  Like,
  Rating,
  SuccessOrders,
  addressBusiness
}: Props) => {
  const { Bg: Background, color: colorTitle, Description } = useTheme();
  const { SecundaryText } = DarkMode()
  const [extend, setExtend] = useState(false)

  return (
    <FlexContainer newStyle={styles.flexContainer}>
      <FlexContainer newStyle={styles.innerFlexContainer}>
        <FlexContainer>
          <Typography newStyle={styles.businessName} variant="H4title" numberOfLines={1}>
            {business_name}
          </Typography>
          <FlexContainer newStyle={styles.locationContainer} variant='row'>
            <Location09Icon width={SIZES.icons / 1.4} height={SIZES.icons / 1.4} color={COLORS.primary} />
            <Typography newStyle={styles.address} variant='SubDescription' numberOfLines={1}>
              {addressBusiness}
            </Typography>
          </FlexContainer>
          <FlexContainer newStyle={styles.ratingContainer} variant='row'>
            <FlexContainer newStyle={styles.ratingInnerContainer} variant='row'>
              <StarIcon width={SIZES.icons / 1.5} height={SIZES.icons / 1.5} color={COLORS.support4} />
              <Typography newStyle={styles.ratingText} variant='SubDescription' numberOfLines={1}>
                {Rating}
              </Typography>
            </FlexContainer>
            <FlexContainer newStyle={styles.ordersContainer} variant='row'>
              <ShoppingBag01IconStroke width={SIZES.icons / 1.5} height={SIZES.icons / 1.5} color={Description} />
              <Typography newStyle={styles.ordersText} variant='SubDescription' numberOfLines={1}>
                {SuccessOrders}
              </Typography>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer newStyle={styles.containerButtons} variant='row'>
          <TouchableOpacity>
            {!Like ?
              <FavouriteIconStroke width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} /> :
              <FavouriteIcon width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} color={COLORS.error} />
            }
          </TouchableOpacity>
          <TouchableOpacity>
            <Share08Icon width={SIZES.icons} height={SIZES.icons} />
          </TouchableOpacity>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    width: SIZES.BtnWidth,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  innerFlexContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  businessName: {
    ...FONTS.h2,
    maxWidth: SIZES.width / 1.8,
    alignItems: 'flex-start',
    gap: SIZES.gapSmall,
  },
  locationContainer: {
    alignItems: 'center',
    gap: SIZES.gapSmall,
  },
  address: {
    maxWidth: SIZES.width / 1.8,
    alignItems: 'flex-start',
  },
  ratingContainer: {
    alignItems: 'center',
    gap: SIZES.gapSmall,
    justifyContent: 'space-between',
  },
  ratingInnerContainer: {
    alignItems: 'center',
    gap: SIZES.gapSmall,
  },
  ratingText: {
    maxWidth: SIZES.width / 1.8,
    alignItems: 'flex-start',
  },
  ordersContainer: {
    alignItems: 'center',
    gap: SIZES.gapSmall,
  },
  ordersText: {
    maxWidth: SIZES.width / 1.8,
    alignItems: 'flex-start',
  },
  containerButtons: {
    alignItems: 'center',
    gap: SIZES.gapMedium,
  },
});

export default ProfileBusiness;