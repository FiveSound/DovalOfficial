import { ReactNode } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SIZES } from "../../../constants/theme";
import FlexContainer from "../FlexContainer";
import Typography from "../Typography";
import { useTheme } from "../../../hooks";
import LineDivider from "../LineDivider";

interface BoxProps {
  children?: ReactNode;
  title?: string;
  variant?: boolean;
}

const Box = ({ children, title, variant }: BoxProps) => {
  const styles = createStyles(variant ? variant : false);
  const { backgroundMaingrey, border } = useTheme()

  return (
   <>
    <FlexContainer newStyle={styles.container}>
      {title && <Typography variant='subtitle'>{title}</Typography>}
      {children && <FlexContainer newStyle={[styles.box,{
        borderColor: border,
        backgroundColor: backgroundMaingrey
      }]}>{children}</FlexContainer>}
    </FlexContainer>
    <LineDivider lineStyle={styles.line}/>
   </>
  );
};

const createStyles = (variant: boolean) => {
  return StyleSheet.create({
    container: {
      marginVertical: SIZES.gapMedium,
      paddingHorizontal: SIZES.gapLarge,
      gap: SIZES.gapMedium,
      
    },

    box: {
      padding: SIZES.gapMedium,
      borderRadius: SIZES.radius,
    },
    line: {
      height: SIZES.gapSmall,
    }
  });
};

export default Box;