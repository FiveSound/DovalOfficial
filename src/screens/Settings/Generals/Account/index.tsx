import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CardsPreview,
  Container,
  FlexContainer,
  LoadingScreen,
  PersonalInf,
  Typography,
} from '../../../../components/custom';
import { useAppSelector } from '../../../../redux';
import Signup from '../../../auth/Signup';
import { infoAccount } from './data';
import {
  EditUser02Icon,
} from '../../../../constants/IconsPro';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import ClosedAccount from '../../../auth/ClosedAccount';
import i18next from '../../../../Translate';

const Account = () => {
  const { Description, border, Title } = useTheme();
  const { isAuthenticated, isLoadingApp, user } = useAppSelector(
    state => state.auth,
  );

  if (isLoadingApp) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Signup />;
  }

  const footerCustom = (
      <ClosedAccount />
  );

  const appent = (
    <FlexContainer
      newStyle={[
        styles.container,
        {
          backgroundColor: border,
        },
      ]}
    >
      <EditUser02Icon width={SIZES.icons} height={SIZES.icons} color={Title} />
    </FlexContainer>
  );

  const AccountData = [
    {
      id: 'Account',
      label: i18next.t('Account'),
      content: [
        {
          id: 'Username',
          label: i18next.t('Username'),
          navigation: 'Username',
          // icon: <AddCircleHalfDotIcon />,
          subLabel: user?.username || i18next.t('Add username'),
          showAppend: false,
          isNavigation: false,
        },
        {
          id: 'Full name',
          label: i18next.t('Full name'),
          navigation: 'Full name',
          // icon: <AddCircleHalfDotIcon />,
          subLabel: user?.name || i18next.t('Add full name'),
          showAppend: false,
          isNavigation: false,
        },
        {
          id: 'Email',
          label: i18next.t('Email'),
          navigation: 'Email',
          // icon: <AddCircleHalfDotIcon />,
          subLabel: user?.email || i18next.t('Add email'),
          showAppend: false,
        },
        {
          id: 'Gender',
          label: i18next.t('Gender'),
          navigation: 'Gender',
          // icon: <AddCircleHalfDotIcon />,
          subLabel: user?.gender || i18next.t('Add gender'),
          showAppend: false,
          isNavigation: false,
        },
        {
          id: 'Reset password',
          label: i18next.t('Reset password'),
          navigation: 'Resetpassword',
          // icon: <AddCircleHalfDotIcon />,
          subLabel: i18next.t('Reset password'),
          showAppend: false,
          isNavigation: false,
        },
        {
          id: 'Phone number',
          label: i18next.t('Phone number'),
          navigation: 'Phone-number',
          // icon: <AddCircleHalfDotIcon />,
          subLabel: user?.phone || i18next.t('Add phone number'),
          showAppend: false,
          isNavigation: false,
        },
        {
          id: 'Country',
          label: i18next.t('Country'),
          navigation: 'Country',
          // icon: <AddCircleHalfDotIcon />,
          subLabel: user?.country || i18next.t('Add country'),
          showAppend: false,
          isNavigation: false,
        },
        {
          id: 'Date',
          label: i18next.t('Date'),
          navigation: 'Date',
          // icon: <AddCircleHalfDotIcon />,
          subLabel: user?.date_birthday || i18next.t('Add Date'),
          showAppend: false,
          isNavigation: false,
        },
      ],
    },
  ];

  return (
    <Container showBack={true} showHeader={true} label={i18next.t('Account')}>
      <CardsPreview row={infoAccount} showAvatar={false} custom={appent} />
      <PersonalInf
        row={AccountData}
        showAvatar={false}
        footerCustom={footerCustom}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    borderRadius: SIZES.gapLarge * 3,
  },
});

export default Account;
