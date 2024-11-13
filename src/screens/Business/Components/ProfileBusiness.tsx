import React, { useEffect, useRef, useState } from 'react';
import DarkMode from '../../../hooks/DarkMode';
import useTheme from '../../../hooks/useTheme';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import {
  FavouriteIcon,
  FavouriteIconStroke,
  Location09Icon,
  Share08Icon,
  ShoppingBag01IconStroke,
  StarIcon,
  Store01Icon,
} from '../../../constants/IconsPro';
import { FlexContainer, Icons, Typography } from '../../../components/custom';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../constants/theme';
import i18next from '../../../Translate';

type Propsdata = {
  business_name: string;
  bio: string;
  details: string;
  open: boolean;
};

type Props = {
  data: Propsdata;
};

const ProfileBusiness = ({ data }: Props) => {
  const { backgroundMaingrey, Description } = useTheme();
  const { business_name, bio, details, open } = data;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  return (
    <FlexContainer newStyle={styles.flexContainer}>
      <FlexContainer newStyle={styles.innerFlexContainer}>
        <FlexContainer>
          <Typography
            newStyle={styles.businessName}
            variant="H4title"
            numberOfLines={2}
          >
            {business_name}
          </Typography>
          <Typography
            newStyle={styles.address}
            variant="SubDescription"
            numberOfLines={2}
          >
            {bio}
          </Typography>

        </FlexContainer>
        <FlexContainer
          newStyle={[
            styles.containerButtons,
            {
              backgroundColor: backgroundMaingrey,
            },
          ]}
          variant="row"
        >
          <Animated.View
            style={[
              styles.pulsingCircle,
              open ? styles.pulsingCircleGreen : styles.pulsingCircleRed,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />
          <Typography variant="H4title">
            {open ? i18next.t('Open') : i18next.t('Closed')}
          </Typography>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  storeContainer: {
    alignItems: 'center',
    gap: SIZES.gapSmall,
  },
  storeText: {
    color: COLORS.dark,
  },
  flexContainer: {
    width: SIZES.width,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: SIZES.gapLarge,
  },
  innerFlexContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  businessName: {
    ...FONTS.heading21,
    maxWidth: SIZES.width / 1.4,
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
    ...FONTS.semi14,
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
    height: SIZES.InputsHeight,
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.radius,
  },
  pulsingCircle: {
    width: responsiveFontSize(14),
    height: responsiveFontSize(14),
    borderRadius: responsiveFontSize(14),
  },
  pulsingCircleGreen: {
    backgroundColor: COLORS.success,
  },
  pulsingCircleRed: {
    backgroundColor: COLORS.error,
  },
});

export default ProfileBusiness;
