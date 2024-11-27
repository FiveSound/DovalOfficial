import React, { useContext, useEffect } from 'react';
import {
  AuthLayout,
  ButtonIcons,
  Buttons,
  FormBottom,
  SignupAlert,
  Typography,
} from '../../../components/custom';
import { Linking, StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/theme';
import { SmartPhone01Icon } from '../../../constants/IconsPro';
import { Button, useNavigation } from '../../../components/native';
import i18next from '../../../Translate';
import { useTheme } from '../../../hooks';
import SignupSocials from './SignupSocials';
import { closeSignupModal, openLocationModal } from '../../../redux/slides/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';

type Props = {};

const Signup = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state: RootState) => state.location);
  const { Title } = useTheme();
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    if (location === null) {
      dispatch(openLocationModal());
    }
  }, [location]);

  return (
    <AuthLayout scrollEnabled={false}>
      <FormBottom
        label={i18next.t('Sign up for Doval')}
        sublabel={i18next.t(
          "Discover a world of culinary creativity, where you can explore, share, and enjoy recipes from around the globe. Let's get cooking!",
        )}
        RNstyles={styles.container}
      >
        <ButtonIcons
          label={i18next.t('Use phone or email')}
          orientationsIcons="Left"
          Icons={
            <SmartPhone01Icon
              width={SIZES.icons}
              height={SIZES.icons}
              color={Title}
            />
          }
          onPress={() => {
            dispatch(closeSignupModal());
            navigation.navigate('UsePhoneEmail');
          }}
          labelStyle={{
            color: Title,
          }}
        />
        <SignupSocials />
        <Typography variant="SubDescription" newStyle={styles.text}>
          {i18next.t(
            'By using the Doval platform, you hereby consent to the outlined in our ',
          )}
          <Typography
            variant="H4title"
            onPress={() => {
              dispatch(closeSignupModal());
              navigation.navigate('SettingStack', { screen: 'TermsAndConditions' })
            }}
          >
            {i18next.t('terms and conditions')}
          </Typography>
          {i18next.t('and our')}
          <Typography
            variant="H4title"
            onPress={() => {
              dispatch(closeSignupModal());
              navigation.navigate('SettingStack', { screen: 'PrivacyPolicy' })
            }}
          >
            {i18next.t('Privacy Policy')}
          </Typography>
  
          {i18next.t(
            '. We prioritize the protection of your personal information and adhere to strict data privacy standards.',
          )}
        </Typography>

        <Buttons 
        label={i18next.t('Support')} 
        variant='disabled'
        variantLabel='disabled'
        onPress={() => {
          dispatch(closeSignupModal());
          navigation.navigate('SettingStack', { screen: 'Support' })
        }} />
      </FormBottom>
    </AuthLayout>
  );
};

export const styles = StyleSheet.create({
  container: {
    gap: SIZES.gapLarge,
    borderBottomLeftRadius: SIZES.gapLarge,
    borderBottomRightRadius: SIZES.gapLarge,
  },
  text: {
    textAlign: 'center',
  },
});
export default Signup;
