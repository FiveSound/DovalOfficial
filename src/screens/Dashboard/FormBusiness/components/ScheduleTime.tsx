import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { iconsNative } from "../../../../constants";

type Props = {
  onPress: () => void;
  label: string;
  value: string;
  disabled?: boolean;
};

const ScheduleTime = memo((props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.schedule_time, props.disabled && { backgroundColor: "#F9FAFC" }]}
      disabled={props.disabled}
    >
      {props.disabled ? (
        <>
          <Image style={{ marginRight: 4 }} source={iconsNative.Moon} />
          <Text>Closed</Text>
        </>
      ) : (
        <>
          <Text style={styles.schedule_time_from}>{props.label}</Text>
          <Text style={styles.schedule_time_value}>{props.value}</Text>
        </>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  schedule_time: {
    minWidth: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  schedule_time_from: {
    marginRight: 10,
    fontWeight: "bold",
    color: "rgba(171, 174, 181, 1)",
  },
  schedule_time_value: {
    fontWeight: "bold",
  },
});

export default ScheduleTime;
