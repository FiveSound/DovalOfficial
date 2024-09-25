import React, { CSSProperties } from "react";
import { View, ViewStyle, useColorScheme } from "react-native";
import { useTheme } from "../../../hooks";
import { SIZES } from "../../../constants/theme";

interface LineDividerProps {
  lineStyle?: ViewStyle;
}

const LineDivider: React.FC<LineDividerProps> = ({ lineStyle }) => {
  const { borderInput } = useTheme();
  return (
    <View
      style={{
        height: SIZES.borderWidth,
        width: "100%",
        backgroundColor: borderInput,
        ...lineStyle,
      }}
    />
  );
};

export default LineDivider;