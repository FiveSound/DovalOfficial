import { ReactNode } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';
import FlexContainer from '../FlexContainer';
import Typography from '../Typography';
import { useTheme } from '../../../hooks';
import LineDivider from '../LineDivider';
import { CheckmarkCircle02Icon } from '../../../constants/IconsPro';

interface BoxProps {
  children?: ReactNode;
  title?: string;
  variant?: boolean;
  showLineDivider?: boolean;
  containerStyle?: ViewStyle;
  sucess?: boolean;
}

const Box = ({ children, title, variant, showLineDivider = true, containerStyle, sucess = false }: BoxProps) => {
  const styles = createStyles(variant ? variant : false);
  const { backgroundMaingrey, border } = useTheme();

  return (
    <>
      <FlexContainer newStyle={[styles.container, containerStyle]}>
        {title && 
        <FlexContainer newStyle={styles.title} variant='row'>
          <Typography variant="subtitle">{title}
      
            </Typography>
           {sucess &&  <CheckmarkCircle02Icon width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} color={COLORS.success}/>}
            </FlexContainer>}
        {children && (
          <FlexContainer
            newStyle={[
              styles.box,
              {
                borderColor: border,
                backgroundColor: backgroundMaingrey,
              },
            ]}
          >
            {children}
          </FlexContainer>
        )}
      </FlexContainer>
      {showLineDivider && <LineDivider variant='secondary' />}
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
    title: {
      gap: SIZES.gapSmall,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  });
};

export default Box;
