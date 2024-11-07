// OperationsInfoStep Component
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { FlexContainer, Hero, Typography, LineDivider } from '../../../../components/custom';
import CustomPicker from '../../../../components/custom/CustomPicker';
import { COLORS, SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';
import { Home01Icon, Moon02Icon } from '../../../../constants/IconsPro';
import { useTheme } from '../../../../hooks';
import { Select } from '../components';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';
import { timezoneItems } from './data';

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

const OperationsInfoStep = ({ setValue, control }: any) => {
  const { backgroundMaingrey } = useTheme();
  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log('user', user);
  const Riders = [
    {
      category: i18next.t('Do you have Riders?'),
      list: [
        { id: 1, label: i18next.t('Yes'), value: 'Yes', interest: 'Yes' },
        { id: 2, label: i18next.t('No'), value: 'No', interest: 'No' },
      ],
    },
  ];

  const setTime = (date: Date, hours: number, minutes: number): Date => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };

  const [schedule, setSchedule] = useState<Schedule>({
    timezone: timezoneItems(user?.country),
    monday: {
      enabled: true,
      startTime: setTime(new Date(), 8, 0),
      endTime: setTime(new Date(), 22, 0),
    },
    tuesday: {
      enabled: true,
      startTime: setTime(new Date(), 8, 0),
      endTime: setTime(new Date(), 22, 0),
    },
    wednesday: {
      enabled: true,
      startTime: setTime(new Date(), 8, 0),
      endTime: setTime(new Date(), 22, 0),
    },
    thursday: {
      enabled: true,
      startTime: setTime(new Date(), 8, 0),
      endTime: setTime(new Date(), 22, 0),
    },
    friday: {
      enabled: true,
      startTime: setTime(new Date(), 8, 0),
      endTime: setTime(new Date(), 22, 0),
    },
    saturday: {
      enabled: true,
      startTime: setTime(new Date(), 9, 0),
      endTime: setTime(new Date(), 0, 0), // 12:00 AM
    },
    sunday: {
      enabled: true,
      startTime: setTime(new Date(), 9, 0),
      endTime: setTime(new Date(), 0, 0), // 12:00 AM
    },
  });


  const handleToggleDay = (day: keyof Schedule) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const handleTimeChange = (day: keyof Schedule, type: 'start' | 'end', value: string | Date) => {
    if (value instanceof Date) {
      setSchedule(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [type === 'start' ? 'startTime' : 'endTime']: value,
        },
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
        sublabel={i18next.t('Please provide the business hours of your business.')}
      />
      <FlexContainer newStyle={styles.container}>
        {Object.keys(schedule)
          .filter(day => day !== 'timezone')
          .map((day) => (
            <View key={day} style={styles.dayRow}>
              <FlexContainer variant="row" newStyle={styles.dayRow}>
                <Switch
                  value={schedule[day as keyof Schedule].enabled}
                  onValueChange={() => handleToggleDay(day as keyof Schedule)}
                  style={styles.switch}
                />
                <Typography variant="H4title">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Typography>
              </FlexContainer>
              {schedule[day as keyof Schedule].enabled ? (
                <View style={styles.timeRow}>
                  <FlexContainer
                    newStyle={{
                      backgroundColor: backgroundMaingrey,
                      padding: SIZES.gapSmall,
                      borderRadius: SIZES.radius,
                      width: '50%',
                    }}
                  >
                    <CustomPicker
                      selectedValue={schedule[day as keyof Schedule].startTime}
                      onValueChange={(value) =>
                        handleTimeChange(day as keyof Schedule, 'start', value)
                      }
                      placeholder="Select Start Time"
                      isDatePicker
                      mode="time"
                      style={styles.timePicker}
                    />
                  </FlexContainer>
                  <FlexContainer
                    newStyle={{
                      backgroundColor: backgroundMaingrey,
                      padding: SIZES.gapSmall,
                      borderRadius: SIZES.radius,
                      width: '50%',
                    }}
                  >
                    <CustomPicker
                      selectedValue={schedule[day as keyof Schedule].endTime}
                      onValueChange={(value) =>
                        handleTimeChange(day as keyof Schedule, 'end', value)
                      }
                      placeholder="Select End Time"
                      isDatePicker
                      mode="time"
                      style={styles.timePicker}
                    />
                  </FlexContainer>
                </View>
              ) : (
                <FlexContainer
                  variant="row"
                  newStyle={[
                    styles.closed,
                    {
                      backgroundColor: backgroundMaingrey,
                    },
                  ]}
                >
                  <Moon02Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.primary} />
                  <Typography variant="H4title">Closed</Typography>
                </FlexContainer>
              )}
            </View>
          ))}
      </FlexContainer>
      <LineDivider variant="secondary" lineStyle={styles.divider} />
      <Select
        control={control}
        name="OurRiders"
        listTextSelector={Riders}
        defaultValue={i18next.t('Do you have Riders?')}
        placeholder={i18next.t('Do you have Riders?')}
        required
        isDatePicker={false}
        isMultiSelect={true}
        maxSelections={1}
      />
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
  divider: {
    marginTop: SIZES.gapLarge,
  },
});

export default OperationsInfoStep;