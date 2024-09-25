import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES } from '../../../../../constants/theme';
import { FlexContainer, Typography } from '../../../../../components/custom';
import { TimeQuarterPassIconstroke } from '../../../../../constants/IconsPro';
import { useTheme } from '../../../../../hooks';

type Props = {
    openingDays: {
        day: string;
        hour: string;
        hour_end: string;
    }[];
}

const OpeningHours = ({ openingDays }: Props) => {
    const { backgroundMaingrey, borderInput, Description } = useTheme()

    const Label = ({ labelTime }: any) => {
        return (
            <FlexContainer variant='row'
                newStyle={{
                    alignItems: 'center',
                    gap: SIZES.gapSmall
                }}>
                <TimeQuarterPassIconstroke
                    width={SIZES.icons / 1.4}
                    height={SIZES.icons / 1.4}
                    color={Description}
                />
                <Typography variant='H4title'>{labelTime}</Typography>
            </FlexContainer>
        )
    }
    return (
        <>
            <FlexContainer
                newStyle={[styles.container, { backgroundColor: 'transparent', borderColor: borderInput }]}>
                {openingDays.map((day) => (
                    <View style={styles.hoursContainer} key={day.day}>
                        <Label labelTime={`${day.day}:`} />
                        <Typography variant='SubDescription'>{day.hour === "Closed" ? "Closed" : `${day.hour} - ${day.hour_end}`}</Typography>
                    </View>
                ))}
            </FlexContainer>
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