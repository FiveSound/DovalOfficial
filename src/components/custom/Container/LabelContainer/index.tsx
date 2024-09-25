import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native';
import FlexContainer from '../../FlexContainer';
import Typography from '../../Typography';
import { useTheme } from '../../../../hooks';
import { responsiveFontSize, SIZES } from '../../../../constants/theme';

type Props = {
    children: ReactNode;
    label: string;
}

const LabelContainer = (props: Props) => {
const { children, label } = props ;
const { borderInput } = useTheme()
  return (
    <FlexContainer newStyle={[styles.container, { borderColor: borderInput}]}>
        <Typography variant='H4title' newStyle={styles.label}>{label}</Typography>
        {children}
    </FlexContainer>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 'auto',
        borderRadius: SIZES.margin,
        borderWidth: SIZES.borderWidth / 2
    },
    label: {
        position: 'relative',
        bottom: responsiveFontSize(10),
        left: responsiveFontSize(20),
    }
})
export default LabelContainer