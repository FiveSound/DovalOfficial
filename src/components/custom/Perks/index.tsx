import React from "react";
import FlexContainer from "../FlexContainer";
import { HelpCircleIcon, CheckmarkCircle02Icon } from "../../../constants/IconsPro"; 
import Typography from "../Typography";
import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

type Props = {
  label: string;
  status: 'error' | 'success';
};

const Perks = (props: Props) => {
  const { label, status } = props;
  const isError = status === 'error';
  return (
    <FlexContainer variant='row' newStyle={styles.container}>
      {isError ? (
        <HelpCircleIcon color={COLORS.error} width={SIZES.icons / 1.2} height={SIZES.icons / 1.2}/>
      ) : (
        <CheckmarkCircle02Icon color={COLORS.success} width={SIZES.icons / 1.2} height={SIZES.icons / 1.2}/>
      )}
          <Typography variant="SubDescription"
      newStyle={StyleSheet.flatten([styles.label, { color: isError ? COLORS.error : COLORS.success }])}>{label}</Typography>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
    container: {
    // paddingHorizontal: SIZES.gapLarge,
    // width: SIZES.width,
    alignItems: 'center',
    gap: SIZES.gapMedium
    },
    label: {
        ...FONTS.semi14
    }
})
export default Perks;