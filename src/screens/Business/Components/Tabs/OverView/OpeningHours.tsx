import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES } from '../../../../../constants/theme';
import { Box, FlexContainer, Typography } from '../../../../../components/custom';
import { Clock03Icon, TimeQuarterPassIcon, TimeQuarterPassIconstroke } from '../../../../../constants/IconsPro';
import { useTheme } from '../../../../../hooks';

type Props = {
    openingDays: {
        day: string;
        hour: string;
        hour_end: string;
    }[];
}

const OpeningHours = ({ openingDays }: Props) => {
    const { Title } = useTheme()

    const Label = ({ labelTime }: any) => {
        return (
            <FlexContainer variant='row'
                newStyle={{
                    alignItems: 'center',
                    gap: SIZES.gapSmall
                }}>
                <Clock03Icon
                    width={SIZES.icons / 1.2}
                    height={SIZES.icons / 1.2}
                    color={Title}
                />
                <Typography variant='H4title'>{labelTime}</Typography>
            </FlexContainer>
        )
    }
    return (
        <>
            <Box title='Opening Hours'>
                {openingDays.map((day) => (
                    <View style={styles.hoursContainer} key={day.day}>
                        <Label labelTime={`${day.day}:`} />
                        <Typography variant='H4title'>{day.hour === "Closed" ? "Closed" : `${day.hour} - ${day.hour_end}`}</Typography>
                    </View>
                ))}
            </Box>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: SIZES.gapLarge,
    },
    hoursContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.gapSmall,
    }
});

export default OpeningHours;