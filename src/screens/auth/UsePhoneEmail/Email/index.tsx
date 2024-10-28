import React, { useState } from 'react';
import {
  Container,
  Buttons,
  Typography,
  Perks,
  InputLabel,
  Checkbox,
  Hero,
  FlexContainer,
  LoadingScreen,
} from '../../../../components/custom';
import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';
import {
  signInEmailAndPasswordService,
  signInEmailService,
} from '../../../../services/auth';
import {
  TouchableOpacity,
  useNavigation,
  View,
} from '../../../../components/native';
import { validateEmail } from '../../../../utils/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInSuccess } from '../../../../redux/slides/authSlice';
import { useAppDispatch } from '../../../../redux';

const SignUpEmail = () => {
  const [state, setState] = useState({
    loading: false,
    error: false,
    success: false,
    email: '',
    password: '',
    disable: true,
    provided: 0,
    exist: false,
    showPassword: false,
    screenLoading: false,
  });

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (checked: boolean) => {
    setState(prevState => ({ ...prevState, provided: checked ? 1 : 0 }));
  };

  const handleEmailChange = (email: string) => {
    setState(prevState => ({
      ...prevState,
      email,
      error: !validateEmail(email),
      disable: !validateEmail(email),
    }));
  };

  const handleSendCode = async () => {
    setState(prevState => ({ ...prevState, loading: true }));
    try {
      const response = await signInEmailService(state.email);
      console.log('signInEmailService response:', response);
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: false,
        exist: response.exist,
        success: !response.exist,
      }));
      if (!response.exist) {
        setTimeout(() => {
          navigation.navigate('Verified', {
            user: response.user,
            phone: null,
            Form: response.exist,
            method: 1,
          });
        }, 1000);
      }
    } catch (error) {
      console.error('signInEmailService error:', error);
      setState(prevState => ({ ...prevState, loading: false, error: true }));
      setTimeout(() => {
        setState(prevState => ({ ...prevState, success: false }));
      }, 2000);
    }
  };

  const handleLogin = async () => {
    setState(prevState => ({ ...prevState, loading: true }));
    try {
      const response = await signInEmailAndPasswordService(
        state.email,
        state.password,
      );
      console.log('signInEmailAndPasswordService response:', response);
      await AsyncStorage.setItem('userToken', response.token);
      dispatch(signInSuccess(response.userDetails));
      setState(prevState => ({ ...prevState, screenLoading: true }));
      if (response.success) {
        setTimeout(() => {
          setState(prevState => ({ ...prevState, screenLoading: false }));
          navigation.navigate('TabsNavigation', {
            user: response.userDetails,
          });
        }, 1000);
      } else {
        setState(prevState => ({ ...prevState, error: true }));
        setTimeout(() => {
          setState(prevState => ({ ...prevState, success: false }));
        }, 2000);
      }
    } catch (error) {
      console.error('signInEmailAndPasswordService error:', error);
      setState(prevState => ({ ...prevState, loading: false, error: true }));
      setTimeout(() => {
        setState(prevState => ({ ...prevState, success: false }));
      }, 2000);
    }
  };

  if (state.screenLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container style={styles.container}>
      <View style={styles.gap} />
      {state.exist && (
        <Hero
          label={i18next.t('Welcome to Doval')}
          sublabel={i18next.t(
            "Discover a world of culinary creativity, where you can explore, share, and enjoy recipes from around the globe. Let's get cooking!",
          )}
        />
      )}
      <InputLabel
        placeholder={i18next.t('Add your email')}
        label={i18next.t('Add your email')}
        value={state.email}
        onChangeText={handleEmailChange}
      />
      {state.exist && (
        <InputLabel
          placeholder={i18next.t('Add your password')}
          label={i18next.t('Add your password')}
          secureTextEntry={!state.showPassword}
          value={state.password}
          onChangeText={value =>
            setState(prevState => ({ ...prevState, password: value }))
          }
          endComponent={
            <TouchableOpacity
              onPress={() =>
                setState(prevState => ({
                  ...prevState,
                  showPassword: !prevState.showPassword,
                }))
              }
            >
              <Typography variant="H4title">
                {state.showPassword ? i18next.t('Hide') : i18next.t('Show')}
              </Typography>
            </TouchableOpacity>
          }
        />
      )}
      <FlexContainer newStyle={styles.flexContainer}>
        {state.error && (
          <Perks
            label={i18next.t('Enter a valid email address')}
            status="error"
          />
        )}
        {state.success && (
          <Perks label={i18next.t('Code sent correctly')} status="success" />
        )}
      </FlexContainer>
      {!state.exist && (
        <Checkbox
          label={i18next.t(
            'By providing your email, you authorize Doval to utilize this information to optimize your user experience through tailored recommendations and relevant updates.',
          )}
          showLabel={true}
          checked={state.provided === 1}
          onChange={handleCheckboxChange}
        />
      )}
      {!state.exist && (
        <Buttons
          label={state.loading ? i18next.t('Sending...') : i18next.t('Next')}
          loading={state.loading}
          disabled={state.disable}
          onPress={handleSendCode}
          color='dark'
        />
      )}
      {state.exist && (
        <Buttons
          label={state.loading ? i18next.t('Signing in...') : i18next.t('Sign in')}
          loading={state.loading}
          disabled={state.disable}
          onPress={handleLogin}
          color='dark'
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SIZES.gapLarge,
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    ...FONTS.text12,
  },
  gap: {
    marginTop: SIZES.gapSmall,
  },
  flexContainer: {
    width: '100%',
  },
});

export default SignUpEmail;
