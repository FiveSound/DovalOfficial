import React from 'react';
import {
  AuthLayout,
  ButtonIcons,
  FormBottom,
  Typography,
} from '../../../components/custom';
import { Linking, StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/theme';
import { SmartPhone01Icon } from '../../../constants/IconsPro';
import { useNavigation } from '../../../components/native';
import i18next from '../../../Translate';
import { useTheme } from '../../../hooks';
import SignupSocials from './SignupSocials';

const Signup = () => {
  const navigation = useNavigation();
  const { Title } = useTheme();
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

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
          onPress={() => navigation.navigate('UsePhoneEmail')}
          labelStyle={{
            color: Title,
          }}
        />
        <SignupSocials />
        <Typography variant="SubDescription" newStyle={styles.text}>
          {i18next.t(
            'By using the "Doval" platform, you hereby consent to the outlined in our ',
          )}
          <Typography
            variant="H4title"
            onPress={() =>
              handleLinkPress('https://example.com/terms-and-conditions')
            }
          >
            {i18next.t('terms and conditions')}
          </Typography>
          {i18next.t(' and our ')}
          <Typography
            variant="H4title"
            onPress={() =>
              handleLinkPress('https://example.com/privacy-policy')
            }
          >
            {i18next.t('Privacy Policy')}
          </Typography>
          {i18next.t(' and ')}
          <Typography
            variant="H4title"
            onPress={() =>
              handleLinkPress('https://example.com/terms-of-service')
            }
          >
            {i18next.t('Terms of Service')}
          </Typography>
          {i18next.t(
            '. We prioritize the protection of your personal information and adhere to strict data privacy standards.',
          )}
        </Typography>
      </FormBottom>
    </AuthLayout>
  );
};

export const styles = StyleSheet.create({
  container: {
    gap: SIZES.gapLarge,
  },
  text: {
    textAlign: 'center',
  },
});
export default Signup;
