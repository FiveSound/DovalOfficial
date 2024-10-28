import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { FlexContainer, Hero, Typography } from '../../../../components/custom';
import CustomPicker from '../../../../components/custom/CustomPicker';
import { COLORS, SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';
import { Home01Icon, Moon02Icon } from '../../../../constants/IconsPro';
import { useTheme } from '../../../../hooks';

type DaySchedule = {
  enabled: boolean;
  startTime: Date;
  endTime: Date;
};

type Schedule = {
  timezone: string;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

const OperationsInfoStep = ({setValue}: any) => {
  const { backgroundMaingrey } = useTheme();
  const [schedule, setSchedule] = useState<Schedule>({
    timezone: 'UTC-08:00',
    monday: { enabled: true, startTime: new Date(), endTime: new Date() },
    tuesday: { enabled: true, startTime: new Date(), endTime: new Date() },
    wednesday: { enabled: true, startTime: new Date(), endTime: new Date() },
    thursday: { enabled: true, startTime: new Date(), endTime: new Date() },
    friday: { enabled: true, startTime: new Date(), endTime: new Date() },
    saturday: { enabled: false, startTime: new Date(), endTime: new Date() },
    sunday: { enabled: false, startTime: new Date(), endTime: new Date() },
  });

  const timezoneItems = [
    { label: 'Pacific Time (UTC-08:00)', value: 'UTC-08:00' },
    { label: 'Eastern Time (UTC-05:00)', value: 'UTC-05:00' },
  ];

  const handleToggleDay = (day: keyof Schedule) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  const handleTimeChange = (day: keyof Schedule, type: 'start' | 'end', value: string | Date) => {
    if (value instanceof Date) {
      setSchedule(prev => ({
        ...prev,
        [day]: { ...prev[day], [type === 'start' ? 'startTime' : 'endTime']: value }
      }));
    }
  };

  useEffect(() => {
    console.log('Horario actualizado:', schedule);
    setValue('schedule', schedule, { shouldDirty: true });
  }, [schedule]);


  return (
    <FlexContainer> 
      <Hero
    label={i18next.t('Business Hours')}
    sublabel={i18next.t(
      'Please provide the business hours of your business.',
    )}
  />
     <FlexContainer newStyle={styles.container}>


      {Object.keys(schedule).filter(day => day !== 'timezone').map((day) => (
        <View key={day} style={styles.dayRow}>
          <FlexContainer variant='row' newStyle={styles.dayRow}>
          <Switch
            value={schedule[day as keyof Schedule].enabled}
            onValueChange={() => handleToggleDay(day as keyof Schedule)}
            style={styles.switch}
             
          />
          <Typography variant='H4title'>{day.charAt(0).toUpperCase() + day.slice(1)}</Typography>
          </FlexContainer>
          {schedule[day as keyof Schedule].enabled ? (
            <View style={styles.timeRow}>
              <FlexContainer newStyle={{
                backgroundColor: backgroundMaingrey,
                padding: SIZES.gapSmall,
                borderRadius: SIZES.radius,
                width: '50%',
              }}>
              <CustomPicker
                selectedValue={schedule[day as keyof Schedule].startTime}
                onValueChange={(value) => handleTimeChange(day as keyof Schedule, 'start', value)}
                placeholder="Select Start Time"
                isDatePicker
                mode='time'
                style={styles.timePicker}
              />
              </FlexContainer>
              <FlexContainer newStyle={{
                backgroundColor: backgroundMaingrey,
                padding: SIZES.gapSmall,
                borderRadius: SIZES.radius,
                width: '50%',
              }}>
              <CustomPicker
                selectedValue={schedule[day as keyof Schedule].endTime}
                onValueChange={(value) => handleTimeChange(day as keyof Schedule, 'end', value)}
                placeholder="Select End Time"
                isDatePicker
                mode="time"
                style={styles.timePicker}
              />
              </FlexContainer>
            </View>
          ) : <FlexContainer variant='row' newStyle={[styles.closed, {
            backgroundColor: backgroundMaingrey
          }]}>
            <Moon02Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.primary} />
            <Typography variant='H4title'>Closed</Typography>
            </FlexContainer>}
        </View>
      ))}

     </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
  },
  customPicker: {
    marginVertical: 20,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapLarge,
    justifyContent: 'space-between',
  },
  dayLabel: {
    color: COLORS.primary,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: SIZES.gapSmall,
    gap: SIZES.gapSmall,
  },
  timePicker: {
    flex: 1,
    marginHorizontal: 5,
  },
  closed: {
    marginTop: SIZES.gapSmall,
    width: '50%',
    padding: SIZES.gapLarge,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    gap: SIZES.gapLarge,
  },
  switch: {
    marginLeft: SIZES.gapSmall,
    
  },
});

export default OperationsInfoStep;
