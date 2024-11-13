import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
  Container,
  FlexContainer,
  InputStep,
  IsLoading,
  Perks,
  TwoIconsLabel,
  Typography,
  Buttons,
  LoadingScreen,
} from '../../../../components/custom';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '../../../../components/native';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { verifyCode, resendCode } from '../../../../redux/slides/authSlice';
import { RootState } from '../../../../redux/store';
import i18next from '../../../../Translate';
import { reloadApp } from '../../../../redux/slides/appSlice';
import { ActiveTabContext } from '../../../../context/ActiveTabContext';

type Props = {};
type RouteParams = {
  params: {
    user: string;
    phone: string;
    Form: boolean;
    method: number;
    provided: number;
  };
};

const Verified = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { user, phone, Form, method, provided } = route.params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { setActiveTab, activeTab } = useContext(ActiveTabContext);
  const {
    isLoadingApp,
    isVerifying,
    isVerified,
    codeError,
    codeSuccess,
    message,
    canResend,
    resendTimer,
    isResending,
    screenLoading,
    token,
  } = useAppSelector((state: RootState) => state.auth);

  const [localTimer, setLocalTimer] = useState<number>(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (localTimer > 0) {
      timer = setTimeout(() => setLocalTimer(prev => prev - 1), 1000);
    } else {
    }
    return () => clearTimeout(timer);
  }, [localTimer]);

  const handleCodeFilled = useCallback(
    async (code: string) => {
      if (isVerifying || isVerified) return;

      const codePattern = /^\d{6}$/;
      if (!codePattern.test(code)) {
        return;
      }

      dispatch(verifyCode({ user, code }));
    },
    [isVerifying, isVerified, user, dispatch],
  );

  const handleResendCode = useCallback(async () => {
    dispatch(resendCode({ method, phone, user }));
    setLocalTimer(10);
  }, [dispatch, method, phone, user]);

  useEffect(() => {
    if (isVerified && !isLoadingApp) {
      setTimeout(() => {
        if (method === 0 ? Form : !Form) {
          navigation.navigate('SignupForm', { method, provided });
        } else {
          dispatch(reloadApp());
        }
      }, 500);
    }
  }, [isVerified, isLoadingApp, method, Form, navigation, provided]);

  if (screenLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container style={styles.container} useSafeArea={true}>
      <TwoIconsLabel label={i18next.t('Verified Code')} />
      <InputStep
        isVerified={codeSuccess}
        hasError={codeError}
        onCodeFilled={handleCodeFilled}
        label={i18next.t('Enter 6-digit code')}
        sublabel={
          method === 0
            ? `${i18next.t('Your code was sent to')} ${phone}`
            : `${i18next.t('Your code was sent to')} ${user}`
        }
      />
      {(isVerifying || isResending) && (
        <IsLoading
          label={
            isVerifying
              ? i18next.t('Verifying code')
              : i18next.t('Resending code')
          }
          style={styles.IsLoading}
          showLabel={false}
        />
      )}
      {codeError && (
        <Perks
          label={message || i18next.t('Incorrect code, please try again')}
          status="error"
        />
      )}
      {codeSuccess && (
        <Perks label={i18next.t('Code verified correctly')} status="success" />
      )}

      <FlexContainer style={styles.buttons}>
        {canResend || localTimer === 0 ? (
          <>
            {message && (
              <Perks
                label={i18next.t("Didn't receive a code?")}
                status="error"
              />
            )}
            {!isResending && (
              <Buttons
                label={i18next.t('Resend code')}
                onPress={handleResendCode}
                loading={isResending}
              />
            )}
          </>
        ) : (
          !codeSuccess && (
            <Typography variant="SubDescription">
              {i18next.t('Resend code in')}
              <Typography variant="SubDescription" newStyle={styles.text}>
                {localTimer}
              </Typography>{' '}
              {i18next.t('seconds')}
            </Typography>
          )
        )}
      </FlexContainer>
    </Container>
  );
};

export default Verified;
