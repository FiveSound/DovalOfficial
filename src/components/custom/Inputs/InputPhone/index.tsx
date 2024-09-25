import React, { useState, useCallback, memo } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowDown01Icon, CancelCircleIcon } from "../../../../constants/IconsPro";
import FlexContainer from "../../FlexContainer";
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from "../../../../constants/theme";
import LineDivider from "../../LineDivider";
import { useTheme } from "../../../../hooks";
import Typography from "../../Typography";

type Props = {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
  codigoISO: string;
  onPress: () => void;
};

const InputPhone = ({
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  codigoISO,
  onPress
}: Props) => {
  const { Title } = useTheme();

  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <>
      <FlexContainer newStyle={styles.container}>
        <TouchableOpacity 
          onPress={handlePress}
          style={styles.countryCodeInput}>
          <Typography
            variant="subtitle"
            newStyle={StyleSheet.flatten([styles.label, { color: Title }])}>
            {codigoISO} {countryCode}
          </Typography>
          <ArrowDown01Icon width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} color={Title} />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.phoneNumberInput,
            {
              color: Title,
            },
          ]}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
        />
        {phoneNumber.length > 0 && (
          <TouchableOpacity onPress={() => onPhoneNumberChange("")}>
            <CancelCircleIcon
              width={SIZES.icons}
              height={SIZES.icons}
              color={COLORS.Description}
            />
          </TouchableOpacity>
        )}
      </FlexContainer>
      <LineDivider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.gapMedium,
    height: SIZES.BtnHeight,
    justifyContent: "center",
  },
  countryCodeInput: {
    width: responsiveFontSize(90),
    paddingHorizontal: SIZES.gapSmall,
    borderRightWidth: SIZES.borderWidth,
    borderRightColor: COLORS.Description,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  phoneNumberInput: {
    flex: 1,
    ...FONTS.medium14,
    paddingHorizontal: SIZES.gapMedium,
    height: SIZES.BtnHeight,
  },
  label: {
    ...FONTS.medium14,
  },
});

export default memo(InputPhone);