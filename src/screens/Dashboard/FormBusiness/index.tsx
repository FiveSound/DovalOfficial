import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert } from 'react-native';
import {
  KeyboardAwareScrollView,
  useNavigation,
} from '../../../components/native';
import { Container, LineDivider } from '../../../components/custom';
import { responsiveFontSize } from '../../../constants/theme';
import { BusinessRegistrationForm } from '../../../types/FormType';
import { Header } from './components';
import BasicBusinessInformation from './steps/BasicBusinessInformation';
import BusinessAddress from './steps/BusinessAddress';
import OperationsInfoStep from './steps/OperationsInfoStep';
import FinancialInfoStep from './steps/FinancialInfoStep';
import AgreementsStep from './steps/AgreementsStep';
import ProgressBar from './components/ProgressBar';
import { registerBusinessService } from '../../../services/business';
import Representativeinformation from './steps/Representativeinformation';

const defaultValues = {
  business_name: '',
  business_description: '',
  business_types: [],
  tax_identification_number: '',
  full_name: '',
  identification_number: '',
  role: '',
  email: '',
  phone_number: '',
  imgIdentification: '',
  address: '',
  city: '',
  state: '',
  postal_code: '',
  location_map: '',
  latitude: undefined,
  longitude: undefined,
  country: '',
  schedules: [
    {
      id: 1,
      days: [],
      opening_time: '',
      closing_time: '',
    },
  ],
  OurRiders: false,
  bank_details: '',
  account_currency: 'DOP',
  account_type: 'Checking',
  account_number: '',
  account_holder_name: '',
  fiscal_identification: '',
  commercial_registry: null,
  tax_certificate: null,
  legal_representative_id: null,
  business_address_proof: null,
  accept_terms: false,
  accept_privacy_policy: false,
  authorize_verification: false,
};

const stepFields = [
  [
    'business_types',
    'business_name',
    'business_description',
    'tax_identification_number',
  ],

  ['full_name', 'identification_number', 'role', 'email', 'phone_number', 'imgIdentification'],

  ['address', 'city', 'state',],

  ['OurRiders', 'schedules'],

  [
    'bank_details',
    'account_currency',
    'account_type',
    'account_number',
    'account_holder_name',
    'fiscal_identification',
  ],

  ['accept_terms', 'accept_privacy_policy', 'authorize_verification'],
];

const FormVerified: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BusinessRegistrationForm>({ defaultValues });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAgreementChecked, setIsAgreementChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const values = watch();
  console.log('currentStep', currentStep);

  const nextStep = async () => {
    const currentStepFieldsList = stepFields[currentStep - 1];
    const isValid = await trigger(currentStepFieldsList);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    } else {
      Alert.alert(
        'Error',
        'Por favor, completa todos los campos requeridos antes de continuar.',
      );
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit: SubmitHandler<BusinessRegistrationForm> = async data => {
    setIsLoading(true);
    try {
      const response = await registerBusinessService(data);
      if (response.success) {
        Alert.alert(
          '¡Éxito!',
          'Tu registro de negocio ha sido enviado exitosamente.',
        );
        navigation.navigate('TabNavigation');
      } else {
        Alert.alert('Error', 'Ocurrió un error al enviar tu registro.');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error de Validación', error.message);
      } else {
        Alert.alert('Error de Red', 'Por favor, intenta de nuevo más tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Form Values:', values);
  }, [values]);

  return (
    <Container>
      <ProgressBar progress={(currentStep - 1) * 20} />
      <Header
        showDivider={false}
        label={
          currentStep === 1
            ? ''
            : currentStep === 2
              ? ''
              : currentStep === 3
                ? ''
                : currentStep === 4
                  ? ''
                  : currentStep === 5
                    ? ''
                    : currentStep === 6
                      ? ''
                      : 'Registration'
        }
        labelButtons={`${currentStep === 6 ? 'Submit' : 'Next'}`}
        onPress={currentStep === 6 ? handleSubmit(onSubmit) : nextStep}
        showBackPersonal={false}
        onPressBack={currentStep === 1 ? handleBack : prevStep}
        variant={
          currentStep === 6
            ? !isAgreementChecked
              ? 'disabled'
              : 'primary'
            : 'primary'
        }
        disabled={currentStep === 6 ? !isAgreementChecked : false}
        loading={isLoading}
      />
      <KeyboardAwareScrollView
        behavior="padding"
        enabled={true}
        extraHeight={responsiveFontSize(200)}
        contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
      >
        {currentStep === 1 && <BasicBusinessInformation control={control} />}
        {currentStep === 2 && <Representativeinformation control={control} setValue={setValue} />}
        {currentStep === 3 && (
          <BusinessAddress control={control} setValue={setValue} />
        )}
        {currentStep === 4 && <OperationsInfoStep setValue={setValue} />}
        {currentStep === 5 && <FinancialInfoStep control={control} />}
        {currentStep === 6 && (
          <AgreementsStep
            data={values}
            onAgreementChange={setIsAgreementChecked}
            onNavigate={nextStep}
          />
        )}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default FormVerified;
