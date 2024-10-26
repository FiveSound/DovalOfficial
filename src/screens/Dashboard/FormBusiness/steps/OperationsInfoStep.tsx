import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlexContainer, Hero, Typography } from '../../../../components/custom';
import { Store01IconStroke } from '../../../../constants/IconsPro';
import { SIZES, COLORS } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { TouchableOpacity } from '../../../../components/native';
import { Input, Select } from '../components';

const OperationsInfoStep = ({ control }: any) => {
  const { Title, backgroundMaingrey } = useTheme();
  const [taxIdentificationNumber, setTaxIdentificationNumber] = useState(false);

  const daysOfWeekList = [
    {
      category: "Days of the Week",
      list: [
        { id: 1, label: "Monday", value: "Monday", interest: "Monday" },
        { id: 2, label: "Tuesday", value: "Tuesday", interest: "Tuesday" },
        { id: 3, label: "Wednesday", value: "Wednesday", interest: "Wednesday" },
        { id: 4, label: "Thursday", value: "Thursday", interest: "Thursday" },
        { id: 5, label: "Friday", value: "Friday", interest: "Friday" },
        { id: 6, label: "Saturday", value: "Saturday", interest: "Saturday" },
        { id: 7, label: "Sunday", value: "Sunday", interest: "Sunday" },
      ],
    }
  ];

  return (
    <FlexContainer style={styles.container}>
      <Hero 
        label='Horario de Atención' 
        sublabel='Por favor, proporcione el horario de atención de su negocio.' 
      />

        <Select
          control={control}
          name="operation_days"
          listTextSelector={daysOfWeekList}
          defaultValue={[]}
          placeholder="Seleccione los días de operación*"
          required
          isDatePicker={false}
          isMultiSelect={true}
        />

      {/* Horario de Apertura */}
      <View style={styles.timeSection}>
        <Typography variant='subtitle' style={styles.sectionTitle}>
          Horario de Apertura
        </Typography>
        <Select
          control={control}
          name="opening_time"
          listTextSelector={[]}
          defaultValue=""
          placeholder="Seleccione la hora de apertura*"
          required
          isDatePicker={true}
          isMultiSelect={false}
        />
      </View>

      {/* Horario de Cierre */}
      <View style={styles.timeSection}>
        <Typography variant='subtitle' style={styles.sectionTitle}>
          Horario de Cierre
        </Typography>
        <Select
          control={control}
          name="closing_time"
          listTextSelector={[]}
          defaultValue=""
          placeholder="Seleccione la hora de cierre*"
          required
          isDatePicker={true}
          isMultiSelect={false}
        />
      </View>

      {/* Opciones Adicionales */}
      <View style={styles.additionalSection}>
        <TouchableOpacity 
          onPress={() => setTaxIdentificationNumber(!taxIdentificationNumber)} 
          style={[styles.toggleButton, {backgroundColor: backgroundMaingrey}]}
        >
          <Typography variant='subtitle'>
            {taxIdentificationNumber ? 'Este negocio no está registrado' : 'Este negocio está registrado'}
          </Typography>
        </TouchableOpacity>
        {taxIdentificationNumber && (
          <Input 
            control={control} 
            name="tax_identification_number" 
            placeholder="Número de identificación fiscal" 
            required={false} 
            keyboardType='numeric' 
            style={styles.input}
          />
        )}
      </View>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    backgroundColor: COLORS.BackgroundMainLight,
  },
  section: {
    marginBottom: SIZES.gapLarge,
  },
  timeSection: {
    marginBottom: SIZES.gapLarge,
  },
  sectionTitle: {
    marginBottom: SIZES.gapMedium,
    color: COLORS.primary,
  },
  additionalSection: {
    marginTop: SIZES.gapLarge,
  },
  toggleButton: {
    paddingVertical: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.gapSmall,
  },
  input: {
    marginTop: SIZES.gapSmall,
    height: SIZES.InputsHeight,
  },
});

export default OperationsInfoStep;