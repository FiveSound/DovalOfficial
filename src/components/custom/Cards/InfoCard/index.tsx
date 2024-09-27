import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { SIZES } from '../../../../constants/theme';
import { FlexContainer, LineDivider, Typography } from '../../../../components/custom';
import { ArrowRight01Icon } from '../../../../constants/IconsPro';
import { useTheme } from '../../../../hooks';
import { TouchableOpacity } from '../../../native';

interface InfoCardProps {
    icon?: any;
    title: string;
    description?: string;
    orientation?: 'LEGHT' | 'RIGHT'
    showArrow?: boolean;
    showLineDivider?: boolean;
    onPress?: () => void;
    labelStyle?: TextStyle
    lineStyle?: ViewStyle   
    containerStyle?: ViewStyle
}

const InfoCard: React.FC<InfoCardProps> = (
{
     icon, 
     title, 
     description, 
     orientation = 'LEGHT', 
     showArrow, 
     showLineDivider=false, 
     onPress, 
     labelStyle, 
     lineStyle,
     containerStyle
    }) => {
const {Title, Description } = useTheme()
    return (
        <TouchableOpacity onPress={onPress}>
        <FlexContainer newStyle={[styles.card, containerStyle]}>
            {orientation === 'LEGHT' && icon}
            <FlexContainer newStyle={styles.textContainer}>
                <Typography variant='subtitle' newStyle={labelStyle}>{title}</Typography>
                <Typography variant='SubDescription' newStyle={{
                    color: Description
                }}>{description}</Typography>
            </FlexContainer>
            {orientation === 'RIGHT' && icon}
            {showArrow && <ArrowRight01Icon 
            width={SIZES.icons * 1.2}
            height={SIZES.icons * 1.2}
            color={Title}/>}
        </FlexContainer>
        {showLineDivider && <LineDivider lineStyle={lineStyle}/>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.gapMedium,
        borderRadius: SIZES.radius,
        marginVertical: SIZES.gapSmall,
        gap: SIZES.gapLarge
    },

    textContainer: {
        flex: 1,
    },

});

export default InfoCard;