import { memo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Header } from "../components";
import { KeyboardAwareScrollView, useNavigation } from "../../../../components/native";
import { FlexContainer, Hero } from "../../../../components/custom";
import { responsiveFontSize } from "../../../../constants/theme";
import { SchedulesInterface } from "./data";
import { formatDateHourUtil } from "../../../../utils/format";
import ScheduleTime from "../components/ScheduleTime";
import i18next from "../../../../Translate";

const Operations = memo(() => {
  const navigation = useNavigation();
  const { setValue, getValues, watch } = useFormContext();

  const [picker, setPicker] = useState({
    show: false,
    type: "opening_time",
    dayIndex: 0,
    date: new Date(),
  });

  const values = watch();

  const handleEnabledDay = (dayIndex: number, value: boolean) => {
    const currentSchedules: SchedulesInterface[] = getValues("schedules");

    const updatedSchedules = currentSchedules.map((schedule, index) => {
      if (index === dayIndex) {
        return { ...schedule, enabled: value };
      }
      return schedule;
    });

    setValue("schedules", updatedSchedules);
  };

  const handleTime = (dayIndex: number, type: string, date: Date, dismissed: boolean) => {
    setPicker({
      show: false,
      type: "opening_time",
      dayIndex: -1,
      date: date,
    });

    if (dismissed) return;

    const currentSchedules: SchedulesInterface[] = getValues("schedules");

    const updatedSchedules = currentSchedules.map((schedule, index) => {
      if (index === dayIndex) {
        return { ...schedule, [type]: date };
      }
      return schedule;
    });

    setValue("schedules", updatedSchedules);
  };

  return (
    <>
      <Header
        currentStep={4}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => navigation.navigate("FormBusiness/Financial")}
        showDivider
        disabled={values.schedules.filter((row: SchedulesInterface) => row.enabled).length < 3}
      />
      <KeyboardAwareScrollView
        behavior="padding"
        enabled={true}
        extraHeight={responsiveFontSize(200)}
        contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
      >
        <FlexContainer>
          <Hero
            label={i18next.t("Business Hours")}
            sublabel={i18next.t("Please provide the business hours of your business.")}
          />
          <View style={styles.schedule_container}>
            {values.schedules.map((row: SchedulesInterface, dayIndex: number) => (
              <View key={row.day} style={styles.schedule}>
                <Pressable onPress={() => handleEnabledDay(dayIndex, !row.enabled)} style={styles.schedule_day}>
                  <Switch
                    onValueChange={(value) => handleEnabledDay(dayIndex, value)}
                    value={row.enabled}
                    style={styles.switch}
                  />
                  <Text style={styles.schedule_day_title}>{row.day}</Text>
                </Pressable>
                <View style={styles.schedule_times}>
                  <ScheduleTime
                    label="From:"
                    value={formatDateHourUtil(row.opening_time)}
                    onPress={() => setPicker({ show: true, type: "opening_time", dayIndex, date: row.opening_time })}
                    disabled={!row.enabled}
                  />

                  <ScheduleTime
                    label="To:"
                    value={formatDateHourUtil(row.closing_time)}
                    onPress={() => setPicker({ show: true, type: "closing_time", dayIndex, date: row.closing_time })}
                    disabled={!row.enabled}
                  />
                </View>
              </View>
            ))}
          </View>

          <Hero
            label={i18next.t("Do you have Riders?")}
            sublabel={i18next.t("Please fill in the following information to complete the process.")}
          />

          <View
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            {values.delivery_service ? <Text>Yes</Text> : <Text>No</Text>}
            <Switch
              value={values.delivery_service}
              onValueChange={(value) => setValue("delivery_service", value)}
              style={styles.switch}
            />
          </View>
        </FlexContainer>
      </KeyboardAwareScrollView>

      {picker.show && (
        <DateTimePicker
          value={picker.date}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={({ nativeEvent, type }) => {
            handleTime(picker.dayIndex, picker.type, new Date(nativeEvent.timestamp), type === "dismissed");
          }}
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  schedule_container: {
    padding: 15,
  },
  schedule: {
    marginBottom: 10,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  schedule_day: {
    maxWidth: 100,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  schedule_day_title: {
    fontWeight: "bold",
  },
  schedule_times: {
    flexDirection: "row",
    gap: 10,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default Operations;
