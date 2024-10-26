import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlexContainer, LineDivider } from '../../../../../components';
import Hero from '../../../../../components/custom/hero';
import { InfoCard } from '../../../../../components/custom';
import { COLORS, FONTS, SIZES } from '../../../../../constants';
import { Checkbox } from '../../../../../components/custom/Checkbox';
import { BubbleChatQuestionIcon } from '../../../../../constants/IconsPro';

const AgreementsStep = ({ data, onAgreementChange, onNavigate }: any) => {
  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    privacy: false,
    verification: false,
  });

  useEffect(() => {
    const allChecked = Object.values(checkboxes).every(Boolean);
    onAgreementChange(allChecked);
  }, [checkboxes, onAgreementChange]);

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };
  const infoCards = [
    // Step 1: Personal Information
    { label: 'Nombre Completo', value: data.fullname, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>},
    { label: 'Número de Identidad', value: data.identity_card, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>},
    { label: 'Fecha de Nacimiento', value: new Date(data.date_of_birth).toLocaleDateString(), icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>},
    { label: 'Género', value: data.gender, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>},
    // Divider
    { label: '---', value: '---' },
    // Step 2: Professional Information
    { label: 'País', value: data.country_code, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Licencia de Conducir', value: data.driver_license, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Fecha de Expiración', value: new Date(data.expiration_license).toLocaleDateString(), icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Tipo de Vehículo', value: data.vehicle, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Marca de Vehículo', value: data.vehicle_model_brand, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Modelo Vehículo', value: data.vehicle_year, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    // Divider
    { label: '---', value: '---' },
    // Step 3: Financial Information
    { label: 'Nombre del Banco', value: data.bank_details, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Moneda', value: data.account_currency, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Tipo de Cuenta', value: data.account_type, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Número de Cuenta', value: data.account_number, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Nombre del Titular', value: data.account_titular, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    { label: 'Identificación Fiscal', value: data.fiscal_identification, icons: <BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/> },
    // Divider
    { label: '---', value: '---' },
    // Step 4: Media Confidencial
    // Assuming media information is not displayed here
  ];

  return (
    <FlexContainer>
      <Hero
        label='Confirmar tus datos y aceptar los acuerdos'
        sublabel='Por favor, confirma tus datos y acepta los acuerdos para continuar con el proceso de registro.'
      />
      <LineDivider variant='secondary' />

      {infoCards.map((info, index) => (
  info.label === '---' ? (
    <LineDivider variant='secondary' key={`divider-${index}`} />
  ) : (
      <FlexContainer newStyle={styles.infoCard}>
        <InfoCard
          title={info.label}
          description={info.value}
          icon={info.icons}
          showArrow={true}
          onPress={() => {
            onNavigate(index);
          }}
        />
      </FlexContainer>
  )
))}
      <FlexContainer newStyle={styles.checkboxContainer}>
      <Checkbox 
          checked={checkboxes.terms}
          label='Acepto Términos y Condiciones'
          showLabel={true}
          LabelStyle={styles.checkboxLabel}
          onChange={(checked) => handleCheckboxChange('terms', checked)}
        />
        <Checkbox 
          checked={checkboxes.privacy}
          label='Acepto Política de Privacidad'
          showLabel={true}
          LabelStyle={styles.checkboxLabel}
          onChange={(checked) => handleCheckboxChange('privacy', checked)}
        />
        <Checkbox 
          checked={checkboxes.verification}
          label='Autorizo Verificación de Datos'
          showLabel={true}
          LabelStyle={styles.checkboxLabel}
          onChange={(checked) => handleCheckboxChange('verification', checked)}
        />
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    paddingHorizontal: SIZES.gapLarge
  },
  checkboxContainer: {
    gap: SIZES.gapMedium,
    marginTop: SIZES.gapMedium
  },
  checkboxLabel: {
    ...FONTS.semi14
  }
})

export default AgreementsStep;