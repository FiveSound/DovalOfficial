import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { iconsNative } from "../../../../constants";
import { Home01Icon, Moon02Icon } from "@/src/constants/IconsPro";
import { Typography } from "@/src/components/custom";
import { COLORS, responsiveFontSize, SIZES } from "@/src/constants/theme";
import { useTheme } from "@/src/hooks";

type Props = {
  onPress: () => void;
  label: string;
  value: string;
  disabled?: boolean;
};

const ScheduleTime = memo((props: Props) => {
const { Title, backgroundMaingrey } = useTheme()
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.schedule_time, { backgroundColor: backgroundMaingrey }]}
      disabled={props.disabled}
    >
      {props.disabled ? (
        <>
          <Moon02Icon width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} color={Title} />
          <Typography variant="H4title">Closed</Typography>
        </>
      ) : (
        <>
          <Typography variant="H4title">{props.label}</Typography>
          <Typography variant="H4title">{props.value}</Typography>
        </>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  schedule_time: {
    minWidth: responsiveFontSize(120),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.gapSmall,
    paddingVertical: SIZES.gapMedium,
    borderRadius: SIZES.radius,
  },
  schedule_time_from: {
    marginRight: SIZES.gapSmall,
  },
  schedule_time_value: {
  },
});

export default ScheduleTime;
