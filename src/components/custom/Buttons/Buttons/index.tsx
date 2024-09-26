import React, { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacity } from "../../../native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import Typography from "../../Typography";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import { useTheme } from "../../../../hooks";
import IsLoading from "../../Loaders/IsLoading";
import * as Haptics from "expo-haptics";

type Props = {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  containerButtons?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  Icons?: ReactNode;
  orientationsIcons?: "Left" | "Right";
  variant?: "primary" | "secondary" | "disabled";
};

const Buttons = (props: Props) => {
  const { onPress, disabled, label, loading, containerButtons, labelStyle, Icons, orientationsIcons, variant } = props;
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress && onPress();
  };
  const { backgroundMaingrey, Description, Title } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return COLORS.primary;
      case "secondary":
        return COLORS.primary;
      case "disabled":
        return backgroundMaingrey;
      default:
        return COLORS.primary;
    }
  };

  const getLabelColor = () => {
    switch (variant) {
      case "primary":
        return COLORS.dark;
      case "secondary":
        return COLORS.dark;
      case "disabled":
        return COLORS.Description;
      default:
        return COLORS.dark;
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        containerButtons, 
        { backgroundColor: getBackgroundColor() }, 
      ]}
      disabled={disabled}
    >
      {loading && <IsLoading style={{ borderColor: COLORS.dark }} />}
      {orientationsIcons === "Left" && Icons}
      <Typography
        variant="SubDescription"
        newStyle={[
          styles.label,
          {
            ...labelStyle,
            color: getLabelColor(),
          },
        ]}
      >
        {label}
      </Typography>
      {orientationsIcons === "Right" && Icons}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.BtnWidth,
    height: SIZES.BtnHeight / 1.2,
    borderRadius: SIZES.smallRadius,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row-reverse",
  },
  label: {
    ...FONTS.semi14,
    marginHorizontal: SIZES.gapLarge,
  },
});

export default Buttons;