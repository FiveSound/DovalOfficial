import { memo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Header } from "../components";
import { useNavigation, View, Pressable, Switch, Platform, Modal, Button, ScrollView } from "../../../../components/native";
import { FlexContainer, Hero, Typography } from "../../../../components/custom";
import { COLORS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import { SchedulesInterface } from "./data";
import { formatDateHourUtil } from "../../../../utils/format";
import ScheduleTime from "../components/ScheduleTime";
import i18next from "../../../../Translate";
import { useAppSelector } from "@/src/redux";
import { RootState } from "@/src/redux/store";

const Operations = memo(() => {
  const navigation = useNavigation();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { setValue, getValues, watch } = useFormContext();

  const [picker, setPicker] = useState({
    show: false,
    type: "opening_time",
    dayIndex: 0,
    date: new Date(),
  });

  const values = watch();

  const schedulesLocal: SchedulesInterface[] = values.schedules;

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
      type: type, // Mantener el tipo correcto
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
        showDivider={false}
        disabled={
          schedulesLocal.filter((row: SchedulesInterface) => row.enabled).length < 3
        }
      />
      <View style={styles.container}>
        <Hero
          label={i18next.t("Business Hours")}
          sublabel={i18next.t(
            "Please provide the business hours of your business."
          )}
        />
        <View style={styles.schedule_container}>
          {schedulesLocal.map((row: SchedulesInterface, dayIndex: number) => (
            <View key={row.day} style={styles.schedule}>
              <Pressable
                onPress={() => handleEnabledDay(dayIndex, !row.enabled)}
                style={styles.schedule_day}
              >
                <Switch
                  onValueChange={(value) => handleEnabledDay(dayIndex, value)}
                  value={row.enabled}
                  style={styles.switch}
                />
                <Typography
                  variant="H4title"
                  newStyle={styles.schedule_day_title}
                >
                  {row.frontDay}
                </Typography>
              </Pressable>
              <View style={styles.schedule_times}>
                <ScheduleTime
                  label="From:"
                  value={formatDateHourUtil(row.opening_time, false)}
                  onPress={() =>
                    setPicker({
                      show: true,
                      type: "opening_time",
                      dayIndex,
                      date: row.opening_time,
                    })
                  }
                  disabled={!row.enabled}
                />

                <ScheduleTime
                  label="To:"
                  value={formatDateHourUtil(row.closing_time, false)}
                  onPress={() =>
                    setPicker({
                      show: true,
                      type: "closing_time",
                      dayIndex,
                      date: row.closing_time,
                    })
                  }
                  disabled={!row.enabled}
                />
              </View>
            </View>
          ))}
        </View>
        <View style={styles.container}>
          <Hero
            label={i18next.t("Do you have Riders?")}
            sublabel={i18next.t(
              "Please fill in the following information to complete the process."
            )}
          />

          <FlexContainer variant='row' newStyle={styles.delivery_service}>
            {values.delivery_service ? (
              <Typography variant="H4title">{i18next.t('Yes')}</Typography>
            ) : (
              <Typography variant="H4title">{i18next.t('No')}</Typography>
            )}
            <Switch
              value={values.delivery_service}
              onValueChange={(value) => setValue("delivery_service", value)}
            />
          </FlexContainer>
        </View>
      </View>
      {picker.show && Platform.OS === "ios" && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={picker.show}
          onRequestClose={() => setPicker((prev) => ({ ...prev, show: false }))}
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                value={picker.date} 
                mode="time"
                is24Hour={false}
                display="default"
                textColor={COLORS.primary}
                onChange={({ nativeEvent, type }) => {
                  handleTime(picker.dayIndex, picker.type, new Date(nativeEvent.timestamp), type === "dismissed");
                }}
              />
              <Button
                title="Confirmar"
                onPress={() => setPicker((prev) => ({ ...prev, show: false }))}
                testID="confirm-button"
              />
            </View>
          </View>
        </Modal>
      )}
      {picker.show && Platform.OS !== "ios" && (
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
  container: {
    flex: 1,
  },
  schedule_container: {
    padding: SIZES.gapMedium,
  },
  schedule: {
    marginBottom: SIZES.gapMedium,
    flexDirection: "row",
    gap: SIZES.gapMedium,
    alignItems: "center",
    justifyContent: "space-between",
  },
  schedule_day: {
    maxWidth: responsiveFontSize(100),
    flexDirection: "row",
    gap: SIZES.gapLarge,
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerWrapper: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  delivery_service: {
    gap: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapMedium,
  },
});

export default Operations;