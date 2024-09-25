import React from "react";
import FlexContainer from "../FlexContainer";
import Typography from "../Typography";
import { StyleSheet, ViewStyle } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

type Props = {
  label: string;
  sublabel?: string;
  style?: ViewStyle
};

const Hero = (props: Props) => {
  const { label, sublabel, style } = props;
  return (
    <FlexContainer newStyle={styles.Container}>
      <Typography variant="title" newStyle={styles.label}>
        {label}
      </Typography>
      <Typography variant="SubDescription" newStyle={styles.sublabel}>
        {sublabel}
      </Typography>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
    marginVertical: SIZES.gapLarge
  },
  label: {
    ...FONTS.heading24,
  },
  sublabel: {
    ...FONTS.text14,
  },
});
export default Hero;
