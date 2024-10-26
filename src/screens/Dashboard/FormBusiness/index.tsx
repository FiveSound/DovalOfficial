import React, { useState, useEffect } from 'react';
import { type FieldValues, useForm, SubmitHandler } from "react-hook-form";
import ProgressBar from './components/ProgressBar';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView, useNavigation } from '../../../components/native';
import { Container } from '../../../components/custom';
import { responsiveFontSize } from '../../../constants/theme';
import { BusinessRegistrationForm } from '../../../types/FormType';
import { Header } from './components';
import BasicBusinessInformation from './steps/BasicBusinessInformation';
import Representativeinformation from './steps/Representativeinformation';
import BusinessAddress from './steps/BusinessAddress';
import OperationsInfoStep from './steps/OperationsInfoStep';

const defaultValues: BusinessRegistrationForm = {
  basic_business_information: {
    business_name: '',
    business_description: '',
    business_type: {
      category: '',
      list: [],
    },
    tax_identification_number: '',
  },
  contact_information: {
    full_name: '',
    identification_number: '',
    role: '',
    email: '',
    phone_number: '',
    imgIdentification: '',
  },
  business_address: {
    address: '',
    city: '',
    state: '',
    postal_code: '',
    location_map: '',
    latitude: undefined,
    longitude: undefined,
  },
  operations_information: {
    operation_days: [],
    opening_time: '',
    closing_time: '',
    OurRiders: false,
  },
  financial_info: {
    bank_details: '',
    account_currency: 'DOP',
    account_type: 'Checking',
    account_number: '',
    account_holder_name: '',
    fiscal_identification: '',
  },
  documents: {
    commercial_registry: null,
    tax_certificate: null,
    legal_representative_id: null,
    business_address_proof: null,
  },
  accept_terms: false,
  accept_privacy_policy: false,
  authorize_verification: false,
};

const FormVerified: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<BusinessRegistrationForm>({ defaultValues });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAgreementChecked, setIsAgreementChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const values = watch();
  console.log('currentStep', currentStep);
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7)); 
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit: SubmitHandler<BusinessRegistrationForm> = async (data) => {
    setIsLoading(true);
    try {

      const response = { success: true };
      if (response.success) {
        Alert.alert("Success!", "Your business registration has been submitted successfully.");
      } else {
        Alert.alert("Error", "An error occurred while submitting your registration.");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Validation Error", error.message);
      } else {
        Alert.alert("Network Error", "Please try again later.");
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
      <Header 
        showDivider={false}
        label={
          currentStep === 1 ? 'Basic Business Information' :
          currentStep === 2 ? 'Contact Information' :
          currentStep === 3 ? 'Business Address' :
          currentStep === 4 ? 'Operations Information' :
          currentStep === 5 ? 'Financial Information' :
          currentStep === 6 ? 'Required Documentation' :
          currentStep === 7 ? 'Agreements and Confirmations' : 'Registration'}
        labelButtons={`${currentStep === 7 ? 'Submit' : 'Next'}`} 
        onPress={currentStep === 7 ? handleSubmit(onSubmit) : nextStep}
        showBackPersonal={currentStep !== 1}
        onPressBack={prevStep}
        variant={currentStep === 7 ? !isAgreementChecked ? 'disabled' : 'primary' : 'primary'}
        disabled={currentStep === 7 ? !isAgreementChecked : false}
        loading={isLoading}
      />
      <ProgressBar progress={(currentStep - 1) * 14.28} /> 
      <KeyboardAwareScrollView 
        behavior='padding'
        enabled={true}
        extraHeight={responsiveFontSize(200)}
        contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
      >
        {currentStep === 1 && <BasicBusinessInformation control={control} />}
        {currentStep === 2 && <Representativeinformation control={control} />}
        {currentStep === 3 && <BusinessAddress control={control} />}
        {currentStep === 4 && <OperationsInfoStep control={control} />}
        {/* {currentStep === 5 && <FinancialInfoStep control={control} />} */}
        {/* {currentStep === 6 && <RequiredDocumentationStep control={control} setValue={setValue} />} */}
        {/* {currentStep === 7 && <AgreementsStep control={control} onAgreementChange={setIsAgreementChecked} />} */}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default FormVerified;