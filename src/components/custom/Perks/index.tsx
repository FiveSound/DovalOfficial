import React from "react";
import FlexContainer from "../FlexContainer";
import { HelpCircleIcon, CheckmarkCircle02Icon } from "../../../constants/IconsPro";
import Typography from "../Typography";
import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

type Props = {
  label: string;
  status: 'error' | 'success';
  Reverse?: boolean;
};

const Perks = (props: Props) => {
  const { label, status, Reverse = true } = props;
  const isError = status === 'error';

  return (
    <FlexContainer  newStyle={[styles.container, {
          flexDirection: Reverse ? 'row' : 'row-reverse'
    }]}>
      {isError ? (
        <HelpCircleIcon color={COLORS.error} width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} />
      ) : (
        <CheckmarkCircle02Icon color={COLORS.success} width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} />
      )}
      <Typography variant='H4title'newStyle={styles.label}>{label}</Typography>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.radius,
    alignItems: 'center',
    gap: SIZES.gapSmall
  },
  label: {
    ...FONTS.text14,
  }
})
export default Perks;