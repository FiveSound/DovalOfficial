import React, { useState, useCallback } from 'react';
import {
  Container,
  Buttons,
  InputPhone,
  Perks,
  Checkbox,
} from '../../../../components/custom';
import { StyleSheet } from 'react-native';
import { FONTS, SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';
import { signInPhoneService } from '../../../../services/auth';
import { Platform, useNavigation, View } from '../../../../components/native';
import ListNumber from './ListNumber';
import { useAppDispatch } from '../../../../redux/hooks';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../../../redux/slides/authSlice';

const Phone = () => {
  const [phoneData, setPhoneData] = useState({
    countryCode: '+1',
    codigoISO: 'DO',
    phoneNumber: '',
  });
  const [uiState, setUiState] = useState({
    loading: false,
    visible: false,
    error: false,
    success: false,
  });
  const [provided, setProvided] = useState(0);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (checked: boolean) => {
    setProvided(checked ? 1 : 0);
  };

  const handleSelectItem = useCallback(
    (item: { CodePostal: string; codigoISO: string }) => {
      setPhoneData(prev => ({
        ...prev,
        countryCode: `+${item.CodePostal}`,
        codigoISO: item.codigoISO,
      }));
      setUiState(prev => ({ ...prev, visible: false }));
    },
    [],
  );

  const handleSendCode = useCallback(async () => {
    console.log(
      'Sending code to:',
      `${phoneData.countryCode}${phoneData.phoneNumber}`,
    );
    setUiState(prev => ({ ...prev, loading: true, error: false }));
    dispatch(signInStart());
    try {
      const response = await signInPhoneService(
        `${phoneData.countryCode}${phoneData.phoneNumber}`,
      );
      if (response.success) {
        const phoneValue = `${phoneData.countryCode}${phoneData.phoneNumber}`;
        setUiState(prev => ({ ...prev, success: true }));
        setTimeout(() => {
          navigation.navigate('Verified', {
            user: response.user,
            phone: phoneValue,
            Form: !response.exist,
            method: 0,
            provided: provided,
          });
        }, 1000);
      } else {
        console.error('signInPhoneService failure:', response.error);
        dispatch(signInFailure());
        setUiState(prev => ({ ...prev, error: true }));
      }
    } catch (error) {
      console.error('signInPhoneService error:', error);
      dispatch(signInFailure());
      setUiState(prev => ({ ...prev, error: true }));
    } finally {
      setUiState(prev => ({ ...prev, loading: false }));
      setTimeout(() => setUiState(prev => ({ ...prev, success: false })), 2000);
    }
  }, [phoneData, navigation, dispatch]);

  return (
    <Container style={styles.container}>
      <View style={styles.gap} />
      <InputPhone
        countryCode={phoneData.countryCode}
        codigoISO={phoneData.codigoISO}
        onCountryCodeChange={code =>
          setPhoneData(prev => ({ ...prev, countryCode: code }))
        }
        phoneNumber={phoneData.phoneNumber}
        onPhoneNumberChange={number =>
          setPhoneData(prev => ({ ...prev, phoneNumber: number }))
        }
        onPress={() => setUiState(prev => ({ ...prev, visible: true }))}
      />
      {uiState.error && (
        <Perks label={i18next.t('Enter a valid phone number')} status="error" />
      )}
      {uiState.success && (
        <Perks label={i18next.t('Code sent correctly')} status="success" />
      )}
      <Checkbox
        label={i18next.t(
          'By providing your phone number, you authorize Doval to utilize this information to optimize your user experience through tailored recommendations and relevant updates.',
        )}
        showLabel={true}
        checked={provided === 1}
        onChange={handleCheckboxChange}
      />
      <Buttons
        label={uiState.loading ? i18next.t('') : i18next.t('Send code')}
        loading={uiState.loading}
        color={uiState.loading ? 'dark' : 'primary'}
        disabled={phoneData.phoneNumber.length <= 6}
        onPress={handleSendCode}
      />
      {uiState.visible && (
        <ListNumber
          visible={uiState.visible}
          onRequestClose={() =>
            setUiState(prev => ({ ...prev, visible: false }))
          }
          onSelectItem={handleSelectItem}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SIZES.gapLarge,
    alignItems: 'center',
    paddingHorizontal: SIZES.gapLarge * 2,
  },
  label: {
    textAlign: 'center',
    ...FONTS.text12,
  },
  gap: {
    marginTop: SIZES.gapLarge,
  },
});

export default Phone;
