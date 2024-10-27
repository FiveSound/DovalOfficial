import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { FlexContainer, Hero, LineDivider, Typography } from '../../../../components/custom';
import { SIZES, COLORS } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { Button } from '../../../../components/native';
import { Select } from '../components';
import i18next from '../../../../Translate';

interface Schedule {
  id: number;
  days: string[];
  openingTime: Date | null;
  closingTime: Date | null;
}

const OperationsInfoStep = ({ control }: any) => {
  const { Title, backgroundMaingrey } = useTheme();
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      days: [],
      openingTime: null,
      closingTime: null,
    },
  ]);
  const [nextId, setNextId] = useState(2);

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

  const Riders = [
    {
      category: i18next.t('Do you have Riders?'), 
      list: [
        { id: 1, label: i18next.t('Yes'), value: "Yes", interest: "Yes" },
        { id: 2, label: i18next.t('No'), value: "No", interest: "No" }
      ],
    }
  ];

  // Funciones para manejar variantes de horarios
  const addScheduleVariant = () => {
    setSchedules((prev) => [
      ...prev,
      {
        id: nextId,
        days: [],
        openingTime: null,
        closingTime: null,
      },
    ]);
    setNextId((prev) => prev + 1);
  };

  const removeScheduleVariant = (id: number) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
  };

  const updateScheduleDays = (id: number, selectedDays: string[]) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id ? { ...schedule, days: selectedDays } : schedule
      )
    );
  };

  const updateOpeningTime = (id: number, time: Date) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id ? { ...schedule, openingTime: time } : schedule
      )
    );
  };

  const updateClosingTime = (id: number, time: Date) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id ? { ...schedule, closingTime: time } : schedule
      )
    );
  };

  const handleOpeningTimeChange = (id: number, selectedTime: Date | null) => {
    if (selectedTime) {
      const currentSchedule = schedules.find((s) => s.id === id);
      if (currentSchedule && currentSchedule.closingTime && selectedTime >= currentSchedule.closingTime) {
        Alert.alert('Error', 'La hora de apertura debe ser anterior a la hora de cierre.');
        updateOpeningTime(id, null);
      } else {
        updateOpeningTime(id, selectedTime);
      }
    }
  };

  const handleClosingTimeChange = (id: number, selectedTime: Date | null) => {
    if (selectedTime) {
      const currentSchedule = schedules.find((s) => s.id === id);
      if (currentSchedule && currentSchedule.openingTime && selectedTime <= currentSchedule.openingTime) {
        Alert.alert('Error', 'La hora de cierre debe ser posterior a la hora de apertura.');
        updateClosingTime(id, null);
      } else {
        updateClosingTime(id, selectedTime);
      }
    }
  };

  const getAvailableDays = (currentId: number) => {
    const selectedDays = schedules
      .filter((schedule) => schedule.id !== currentId)
      .flatMap((schedule) => schedule.days);
    return daysOfWeekList.map((group) => ({
      ...group,
      list: group.list.filter((day) => !selectedDays.includes(day.value)),
    }));
  };

  return (
    <FlexContainer style={styles.container}>
      <Hero 
        label={i18next.t('Business Hours')} 
        sublabel={i18next.t('Please provide the business hours of your business.')} 
      />
           <Select
            control={control}
            name='OurRiders'
            listTextSelector={Riders}
            defaultValue={i18next.t('Do you have Riders?')}
            placeholder={i18next.t('Do you have Riders?')}
            required
            isDatePicker={false}
            isMultiSelect={true}
            maxSelections={1}
          />

      {schedules.map((schedule, index) => (
        <View key={schedule.id} style={styles.scheduleVariant}>
          <Typography variant='subtitle' style={styles.variantTitle}>
            {i18next.t('Personalized Schedule')} {index + 1}
          </Typography>
          <LineDivider variant='secondary' lineStyle={styles.divider}/>
          {/* Selección de Días */}
          <Select
            control={control}
            name={`schedule_${schedule.id}_days`}
            listTextSelector={getAvailableDays(schedule.id)}
            defaultValue={schedule.days}
            placeholder={i18next.t('Select the operation days*')}
            required
            isDatePicker={false}
            isMultiSelect={true}
            maxSelections={7}
            onChange={(selected: string[]) => updateScheduleDays(schedule.id, selected)}
          />

          {/* Selección de Hora de Apertura */}
          <Select
            control={control}
            name={`schedule_${schedule.id}_openingTime`}
            list={[]} // No se necesita lista para picker de tiempo
            defaultValue={schedule.openingTime}
            placeholder={i18next.t('Select the opening time*')}
            required
            isDatePicker={true}
            isMultiSelect={false}
            onChange={(selected: Date | null) => handleOpeningTimeChange(schedule.id, selected)}
          />

          {/* Selección de Hora de Cierre */}
          <Select
            control={control}
            name={`schedule_${schedule.id}_closingTime`}
            list={[]} // No se necesita lista para picker de tiempo
            defaultValue={schedule.closingTime}
            placeholder={i18next.t('Select the closing time*')}
            required
            isDatePicker={true}
            isMultiSelect={false}
            onChange={(selected: Date | null) => handleClosingTimeChange(schedule.id, selected)}
          />
          <LineDivider variant='secondary' lineStyle={styles.divider}/>

          {schedules.length > 1 && (
            <Button
              onPress={() => removeScheduleVariant(schedule.id)}
              title={i18next.t('Delete Variant')}
              color={COLORS.error}
            />
          )}
        </View>
      ))}

      <Button onPress={addScheduleVariant} title={i18next.t('Add Variant')} />

    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
  },
  scheduleVariant: {
    marginBottom: SIZES.gapLarge,
    padding: SIZES.gapMedium,
  },
  variantTitle: {
    marginBottom: SIZES.gapSmall,
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.primary,
  },
  divider: {
   width: SIZES.width,
   alignSelf: 'center',
  },
});

export default OperationsInfoStep;