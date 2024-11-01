import React, { useState, useEffect } from 'react';
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
  signInEmailService,
} from '../../../../services/auth';
import {
  TouchableOpacity,
  useNavigation,
  View,
} from '../../../../components/native';
import { validateEmail } from '../../../../utils/Utils';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { login } from '../../../../redux/slides/authSlice';
import { RootState } from '../../../../redux/store';

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

  // Selecciona los estados relevantes desde el store
  const loginLoading = useAppSelector(state => state.auth.loginLoading);
  const loginError = useAppSelector(state => state.auth.loginError);
  const loginMessage = useAppSelector(state => state.auth.loginMessage);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const handleCheckboxChange = (checked: boolean) => {
    setState(prevState => ({ ...prevState, provided: checked ? 1 : 0 }));
  };

  const handleEmailChange = (email: string) => {
    const isValid = validateEmail(email);
    setState(prevState => ({
      ...prevState,
      email,
      error: !isValid,
      disable: !isValid,
      success: false, // Reset success state cuando se cambia el email
    }));
  };

  const handleSendCode = async () => {
    setState(prevState => ({ ...prevState, loading: true, error: false, success: false }));
    try {
      const response = await signInEmailService(state.email);
      console.log('signInEmailService response:', response);
      
      setState(prevState => ({
        ...prevState,
        loading: false,
        exist: response.exist,
        success: response.success && !response.exist,
      }));

      if (response.exist) {
        // Usuario existe, procede al login
        // Opcional: Puedes navegar a una pantalla de inicio de sesión específica si lo deseas
      } else if (response.success) {
        // Usuario no existe, procede con el registro
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

  const handleLogin = () => {
    // Despacha la thunk de login desde authSlice
    dispatch(login({ email: state.email, password: state.password }));
  };
 
  useEffect(() => {
    if (isAuthenticated) {
      navigation.goBack()
    }
  }, [isAuthenticated, navigation]);

  if (state.screenLoading || loginLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container style={styles.container}>
      <View style={styles.gap} />
      {state.exist && (
        <Hero
          label={i18next.t('Welcome Back!')}
          sublabel={i18next.t(
            "Welcome back to Doval. Please enter your password to continue.",
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
        {loginError && (
          <Perks
            label={loginMessage || i18next.t('Error al iniciar sesión')}
            status="error"
          />
        )}
        {loginMessage && !loginError && (
          <Perks label={loginMessage} status="success" />
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
          label={loginLoading ? i18next.t('Signing in...') : i18next.t('Sign in')}
          loading={loginLoading}
          disabled={!state.password || state.password.length === 0}
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
    padding: SIZES.padding,
    paddingHorizontal: 0
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
