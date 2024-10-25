import React, { ReactNode } from "react";
import { useTheme } from "../../../../hooks";
import { TouchableOpacity, Text } from "../../../native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import FlexContainer from "../../FlexContainer";
import Typography from "../../Typography";
import { ArrowRight01Icon } from "../../../../constants/IconsPro";
import LineDivider from "../../LineDivider";
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type ButtonsAccessProps = {
  label: string;
  subLabel?: string;
  labelPreview?: string | null | undefined;
  onPress: () => void;
  ShowLineDivider?: boolean;
  labelStyle?: TextStyle;
  ArrowColor?: boolean;
  container?: ViewStyle;
  append?: ReactNode;
  showAppend?: boolean;
  showAppendBottom?: 'UP' | 'DOWN';
  AppendPreview?: ReactNode;
  ShowAppendPreview?: boolean;
};

const ButtonAcces = ({
  label,
  subLabel,
  labelPreview,
  onPress,
  ShowLineDivider = true,
  labelStyle,
  ArrowColor = true,
  container,
  append,
  showAppend = true,
  showAppendBottom = 'UP',
  AppendPreview,
  ShowAppendPreview
}: ButtonsAccessProps) => {
  const { color, greyText, Description, Title } = useTheme();

  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.touchableOpacity, container]}>
        <FlexContainer newStyle={styles.flexContainer} variant="row">
          {showAppendBottom === 'UP' && append}
          <Typography variant='H4title' newStyle={{...labelStyle, width: SIZES.width / 2.4}}>
            {label}
          </Typography>
         <FlexContainer>
          <Typography 
          numberOfLines={1}
          variant='SubDescription'
           newStyle={styles.subDescription}>
            {subLabel}
          </Typography>
         </FlexContainer>
        </FlexContainer>
        <FlexContainer variant="row" newStyle={styles.flexContainerRow}>
          {
            ShowAppendPreview ? <>
            <Text numberOfLines={1} style={{ color: Description, ...FONTS.semi14, width: SIZES.width / 3, textAlign: 'right' }}>
            {labelPreview}
          </Text>
          <ArrowRight01Icon
            width={SIZES.icons * 1.2}
            height={SIZES.icons * 1.2}
            color={Description}
          />
          </> : AppendPreview
          }
        </FlexContainer>
      </TouchableOpacity>
      {showAppendBottom === 'DOWN' &&  
      <FlexContainer newStyle={styles.flexContainerAppend}>
       {append}
      </FlexContainer> }
      {ShowLineDivider && <LineDivider variant="secondary"/>}
    </>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZES.gapSmall,
    marginLeft: SIZES.gapSmall,
    width: SIZES.width
  },
  flexContainer: {
    backgroundColor: "transparent",
    gap: SIZES.gapLarge,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: SIZES.width / 2,
  },
  subDescription: {
   width: responsiveFontSize(10),
  },
  flexContainerRow: {
    alignItems: "center",
    backgroundColor: "transparent",
    maxWidth: SIZES.width / 2,
  },
  flexContainerAppend: {
    width: SIZES.width,
  },
});

export default React.memo(ButtonAcces);