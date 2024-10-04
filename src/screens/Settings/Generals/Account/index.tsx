import React from 'react'
import { StyleSheet } from 'react-native'
import { CardsPreview, Container, FlexContainer, LoadingScreen, PersonalInf, Typography } from '../../../../components/custom'
import { useAppSelector } from '../../../../redux';
import Signup from '../../../auth/Signup';
import { infoAccount } from './data';
import { AddCircleHalfDotIcon, EditUser02Icon} from '../../../../constants/IconsPro';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import SignOut from '../../../auth/SignOut';

const Account = () => {
  const { Description, border, Title } = useTheme();
  const { isAuthenticated, isLoadingApp, user } = useAppSelector((state) => state.auth);

  if (isLoadingApp) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Signup />
  }

  console.log('user', user);
  

  const footerCustom = (
    <FlexContainer>
      <Typography variant='H4title' newStyle={{
        color: Description,
        marginBottom: SIZES.gapLarge
      }}>Close or delete my account</Typography>
      <SignOut />
    </FlexContainer>
  )

  const appent = (
    <FlexContainer newStyle={[styles.container, {
      backgroundColor: border
    }]}>
      <EditUser02Icon 
      width={SIZES.icons}
      height={SIZES.icons}
      color={Title}
      />
    </FlexContainer>
  )

  const AccountData = [
    {
        id: 'Account',
        label: 'Account',
        content: [
            {
                id: 'Username',
                label: 'Username',
                navigation: 'Username',
                icon: <AddCircleHalfDotIcon />,
                subLabel: user?.username || 'Add username',
                showAppend: false
            },
            {
                id: 'Full name',
                label: 'Full name',
                navigation: 'Full name',
                icon: <AddCircleHalfDotIcon />,
                subLabel: user?.name || 'Add full name',
                showAppend: false
            },
            {
                id: 'Email',
                label: 'Email',
                navigation: 'Email',
                icon: <AddCircleHalfDotIcon />,
                subLabel: user?.email || 'Add email',
                showAppend: false
            },
            {
                id: 'Gender',
                label: 'Gender',
                navigation: 'Gender',
                icon: <AddCircleHalfDotIcon />,
                subLabel: user?.gender || 'Add gender',
                showAppend: false
            },
            {
                id: 'Reset password',
                label: 'Reset password',
                navigation: 'Resetpassword',
                icon: <AddCircleHalfDotIcon />,
                subLabel: 'Reset password',
                showAppend: false
            },
            {
                id: 'Phone number',
                label: 'Phone number',
                navigation: 'Phone-number',
                icon: <AddCircleHalfDotIcon />,
                subLabel: user?.phone || 'Add phone number',
                showAppend: false
            }, {
                id: 'Country',
                label: 'Country',
                navigation: 'Country',
                icon: <AddCircleHalfDotIcon />,
                subLabel: 'Add country',
                showAppend: false
            }, {
                id: 'Date',
                label: 'Date',
                navigation: 'Date',
                icon: <AddCircleHalfDotIcon />,
                subLabel: user?.date_birthday || 'Add date',
                showAppend: false
            }
        ]
    }
];

  return (
    <Container
      showBack={true}
      showHeader={true}
      label='Account'>
      <CardsPreview
        row={infoAccount}
        showAvatar={false}
        custom={appent}
      />
      <PersonalInf
        row={AccountData}
        showAvatar={false}
        footerCustom={footerCustom}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    borderRadius: SIZES.gapLarge * 3
  }
})

export default Account 