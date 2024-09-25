import React, { useState, useEffect } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { TouchableOpacity, View } from "../../native";
import Typography from "../Typography";
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from "../../../constants/theme";
import { useTheme } from "../../../hooks";
import { CheckmarkCircle01Icon } from "../../../constants/IconsPro";
import FlexContainer from "../FlexContainer";

type Props = {
  label?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  showLabel?: boolean;
  containerStyle?: ViewStyle;
  LabelStyle?: TextStyle
};

const BaseCheckbox = ({
  label,
  checked,
  onChange,
  showLabel,
  isTouchable = true,
  containerStyle,
  LabelStyle
}: Props & { isTouchable?: boolean }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const { borderInput } = useTheme();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handlePress = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  const content = (
    <>
      {!isChecked ? (
        <View
          style={[
            styles.checkbox,
            isChecked && styles.checked,
            {
              borderColor: isChecked ? "transparent" : borderInput,
            },
          ]}
        ></View>
      ) : (
        <CheckmarkCircle01Icon
          width={SIZES.icons / 1.1}
          height={SIZES.icons / 1.1}
          color={COLORS.success}
        />
      )}
      {showLabel ? (
        <Typography newStyle={[styles.label, LabelStyle]} variant="SubDescription">
          {label}
        </Typography>
      ) : null}
    </>
  );

  return isTouchable ? (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {content}
    </TouchableOpacity>
  ) : (
    <FlexContainer newStyle={containerStyle}>{content}</FlexContainer>
  );
};

const Checkbox = (props: Props) => (
  <BaseCheckbox {...props} isTouchable={true} />
);
const StaticCheckbox = (props: Props) => (
  <BaseCheckbox {...props} isTouchable={false} />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapMedium,
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
  },
  checkbox: {
    width: SIZES.icons / 1.1,
    height: SIZES.icons / 1.1,
    borderWidth: SIZES.borderWidth,
    borderRadius: responsiveFontSize(40),
  },
  checked: {},
  label: {
    textAlign: "center",
    width: SIZES.width / 1.3,
  },
});

export { Checkbox, StaticCheckbox };
