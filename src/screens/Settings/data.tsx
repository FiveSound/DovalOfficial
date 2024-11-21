import React from 'react';
import {
  AddCircleHalfDotIcon,
  Coupon01Icon,
  HelpSquareIcon,
  LanguageSkillIcon,
  Legal01Icon,
  Location09Icon,
  Notification03Icon,
  Notification03IconStroke,
  Store01IconStroke,
  UserStatusIcon,
  Wallet02Icon,
} from '../../constants/IconsPro';
import { COLORS, SIZES } from '../../constants/theme';
import i18next from '../../Translate';

const SettingsData = {
  id: 'Settings',
  label: i18next.t('Account Settings'),
  description: i18next.t(
    'Manage your Doval profile, preferencesprivacy settings, and notifications.',
  ),
};

const Settings = [
  {
    id: 'General',
    label: i18next.t('General'),
    content: [
      {
        id: 'Account',
        label: i18next.t('Account'),
        navigation: 'Account',
        icon: (
          <UserStatusIcon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      // {
      //     id: 'Privacy',
      //     label: 'Privacy',
      //     navigation: 'Privacy',
      //     icon: <AddCircleHalfDotIcon />
      // },
      // {
      //     id: 'Security',
      //     label: 'Security',
      //     navigation: 'Security',
      //     icon: <AddCircleHalfDotIcon />
      // },
      {
        id: 'Paymentmethods',
        label: i18next.t('Payment methods'),
        navigation: 'PaymentsGeneral',
        icon: (
          <Wallet02Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      {
        id: 'MyLocations',
        label: i18next.t('My Locations'),
        navigation: 'MyLocationsGeneral',
        icon: (
          <Location09Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      {
        id: 'MyCoupons',
        label: i18next.t('My Coupons'),
        navigation: 'Coupons',
        icon: (
          <Coupon01Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
    ],
  },
  {
    id: 'Display',
    label: i18next.t('Display'),
    content: [
      {
        id: 'Notifications',
        label: i18next.t('Notifications'),
        navigation: 'Notifications',
        icon: (
          <Notification03IconStroke
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      {
        id: 'Languages & Currency',
        label: i18next.t('Languages & Currency'),
        navigation: 'Languages',
        icon: (
          <LanguageSkillIcon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      // {
      //     id: 'Dark Mode',
      //     label: 'Dark Mode',
      //     navigation: 'Dark Mode',
      //     icon: <AddCircleHalfDotIcon />
      // }
    ],
  },
  {
    id: 'Support and about',
    label: i18next.t('Support and about'),
    content: [
      {
        id: 'Legal',
        label: i18next.t('Legal'),
        navigation: 'Legal',
        icon: (
          <Legal01Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      {
        id: 'Support',
        label: i18next.t('Support'),
        navigation: 'Support',
        icon: (
          <HelpSquareIcon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      {
        id: 'Report a problem',
        label: i18next.t('Report a problem'),
        navigation: 'Report',
        icon: (
          <HelpSquareIcon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      {
        id: 'Register business',
        label: i18next.t('Register business'),
        navigation: 'FormBusiness',
        icon: (
          <Store01IconStroke
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
      {
        id: 'Register delivery',
        label: i18next.t('Register delivery'),
        navigation: 'RegisterDelivery',
        icon: (
          <AddCircleHalfDotIcon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.light}
          />
        ),
      },
    ],
  },
];

export { SettingsData, Settings };
