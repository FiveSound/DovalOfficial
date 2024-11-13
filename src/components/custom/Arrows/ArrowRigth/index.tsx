import React from "react";
import { StyleSheet } from "react-native";
import { ArrowRight01Icon } from "../../../../constants/IconsPro";
import { useTheme } from "../../../../hooks";
import { TouchableOpacity } from "../../../native";
import { COLORS, responsiveFontSize, SIZES } from "../../../../constants/theme";

const ArrowRight = ({onPress}: {onPress: () => void}) => {
  const { Title , backgroundMaingrey} = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor: backgroundMaingrey}]}>
    <ArrowRight01Icon color={Title} width={SIZES.icons} height={SIZES.icons}/>
  </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
    container: {
      zIndex: 1000,
      borderRadius: responsiveFontSize(40),
      alignItems: 'center',
      justifyContent: 'center',
      padding: responsiveFontSize(10),
    }
  });

export default ArrowRight;
