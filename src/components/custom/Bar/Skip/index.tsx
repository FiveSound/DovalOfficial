import React, { useState } from "react";
import {TouchableOpacity } from "../../../native";
import { StyleSheet } from "react-native";
import { SIZES } from "../../../../constants/theme";
import Typography from "../../Typography";
import { useTheme } from "../../../../hooks";

type Props = {
  label?: string;
  onPress?: () => void;
};

const Skip = (props: Props) => {
  const { label, onPress } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Typography variant="subtitle">{label}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.BtnHeight,
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Skip;
